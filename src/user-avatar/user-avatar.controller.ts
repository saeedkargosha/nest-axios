import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserAvatarService } from './user-avatar.service';

@Controller('api/user')
export class UserAvatarController {
  constructor(private readonly userAvatarService: UserAvatarService) {}

  @Get(':userId/avatar')
  async getAvatar(@Param('userId') userId: string) {
    return await this.userAvatarService.getAvatar(userId);
  }

  @Delete(':userId/avatar')
  async deleteUserAvatar(@Param('userId') userId: string) {
    return this.userAvatarService.deleteUserAvatar(userId);
  }
}
