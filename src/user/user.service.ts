import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { ClientProxy } from '@nestjs/microservices';
import { NotFoundException } from '@nestjs/common/exceptions';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
    @Inject('SUBSCRIBERS_SERVICE') private client: ClientProxy,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();

    this.mailerService.sendMail({
      to: 'saeedkargosha@gmail.com',
      subject: 'New user created',
      template: 'new-user',
      context: {
        name: savedUser.name,
      },
    });

    this.client.send({ cmd: 'add-subscriber' }, 'savedUser');

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
