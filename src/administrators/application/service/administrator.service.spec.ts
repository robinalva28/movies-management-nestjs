import { Test } from '@nestjs/testing';
import { AdministratorService } from './administrator.service';
import { AdministratorPort } from '../port/out/administrator.port';
import { CreateAdministratorCommand } from '../port/in/create-administrator.usecase';
import { BusinessException } from '../../../common/exceptions/business.exception';

describe('AdministratorService', () => {
  let administratorService: AdministratorService;
  let administratorPort: AdministratorPort;

  const mockCommand: CreateAdministratorCommand =
    new CreateAdministratorCommand(
      'name',
      'lastname',
      'email@dominio.com',
      'pass1234',
    );

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: 'CreateAdministratorUseCase',
          useClass: AdministratorService,
        },
        {
          provide: 'AdministratorPort',
          useValue: {
            isEmailUsed: jest.fn(),
            createAdministrator: jest.fn(),
          },
        },
      ],
    }).compile();

    administratorService = moduleRef.get<AdministratorService>(
      'CreateAdministratorUseCase',
    );
    administratorPort = moduleRef.get<AdministratorPort>('AdministratorPort');
  });

  describe('create administrator', () => {
    it("call the create administrator service and the email isn't used", async () => {
      jest.spyOn(administratorPort, 'isEmailUsed').mockResolvedValue(false);

      await expect(
        administratorService.createAdministrator(mockCommand),
      ).resolves.not.toThrow();
    });
  });

  describe('create administrator email used', () => {
    it('call the create administrator service and the email is used', async () => {
      jest.spyOn(administratorPort, 'isEmailUsed').mockResolvedValue(true);

      await expect(
        administratorService.createAdministrator(mockCommand),
      ).rejects.toThrow(BusinessException);
    });
  });
});
