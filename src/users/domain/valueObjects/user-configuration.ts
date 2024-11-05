import { ScreenMode } from './screen-mode';

export class UserConfiguration {
  private readonly _screenMode: ScreenMode;

  private constructor(screenMode: ScreenMode) {
    this._screenMode = screenMode;
  }

  public static createDefault(): UserConfiguration {
    return new UserConfiguration(ScreenMode.LIGHT);
  }

  public static create(screenMode: ScreenMode): UserConfiguration {
    return new UserConfiguration(screenMode);
  }

  get screenMode(): ScreenMode {
    return this._screenMode;
  }
}
