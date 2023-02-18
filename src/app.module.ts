import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { configFactory } from './configs/configs';
import { UserModule } from './user/user.module';
import { UserAvatarModule } from './user-avatar/user-avatar.module';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFactory],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    SubscribersModule,
    UserModule,
    UserAvatarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
