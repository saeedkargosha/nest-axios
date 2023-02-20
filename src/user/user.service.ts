import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { ClientProxy } from '@nestjs/microservices';
import { NotFoundException } from '@nestjs/common/exceptions';
import axios from 'axios';
import { SendgridService } from '../sendgrid.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('SUBSCRIBERS_SERVICE') private client: ClientProxy,
    private readonly sendgridService: SendgridService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();

    const mail = {
      to: savedUser.email,
      subject: 'Hello from sendgrid',
      from: 'saeedkargosha@gmail.com',
      text: 'Hello',
      html: '<h1>Hello</h1>',
    };
    await this.sendgridService.send(mail);

    // this.client.emit({ cmd: 'add-subscriber' }, 'savedUser');
    this.client
      .send({ cmd: 'add-subscriber' }, 'savedUser')
      .subscribe((data) => {
        console.log('response: ', data);
      });

    return savedUser;
  }

  async getUser(userId: string): Promise<User> {
    const { data } = await axios.get(`https://reqres.in/api/users/${userId}`);

    if (!data) {
      throw new NotFoundException();
    }

    return data.data;
  }
}
