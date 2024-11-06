import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MoviesModule } from './movies/movies.module';
import { PermissionsGuard } from './common/auth/permissions.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/auth/jwt.guard';
import { AdministratorsModule } from './administrators/administrators.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
    UsersModule,
    MoviesModule,
    AdministratorsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
