import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';

import { UserAvatar, UserAvatarSchema } from './schemas/user-avatar.schema';

import { UserAvatarController } from './user-avatar.controller';
import { UserAvatarService } from './user-avatar.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAvatar.name, schema: UserAvatarSchema },
    ]),
  ],
  controllers: [UserAvatarController],
  providers: [UserAvatarService],
})
export class UserAvatarModule {}
