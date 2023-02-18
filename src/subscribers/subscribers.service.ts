import { Injectable } from '@nestjs/common';
@Injectable()
export class SubscribersService {
  constructor() {}

  async addSubscriber(subscriber: any) {
    console.log(subscriber, 'subscriber');
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return 'done';
  }

  async getAllSubscribers() {
    console.log('getAllSubscribers');
  }
}
