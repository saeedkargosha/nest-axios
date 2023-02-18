import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';

@Module({
  providers: [SubscribersService],
  exports: [],
  controllers: [SubscribersController],
})
export class SubscribersModule {}
