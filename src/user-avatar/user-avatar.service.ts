import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAvatar, UserAvatarDocument } from './schemas/user-avatar.schema';
import * as fs from 'fs';
import * as request from 'request';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class UserAvatarService {
  constructor(
    @InjectModel(UserAvatar.name)
    private useAvatarrModel: Model<UserAvatarDocument>,
  ) {}

  async getAvatar(userId: string) {
    const user = await this.useAvatarrModel.findOne({ userId });

    if (user && user.hash) {
      // User has avatar image saved in database, return it
      return user.hash;
    } else {
      // User does not have avatar image saved in database, download and save it
      const { data } = await axios.get(`https://reqres.in/api/users/${userId}`);
      const avatarUrl = data.data.avatar;
      const filePath = `avatars/${userId}.png`;

      // Download avatar image from URL and save as file
      const file = fs.createWriteStream(filePath);
      const hash = crypto.createHash('sha256');

      request(avatarUrl).on('response', function (response) {
        response.pipe(file);
        response.pipe(hash);
      });

      await new Promise((resolve, reject) => {
        file.on('finish', resolve);
        file.on('error', reject);
      });

      // Store file path and hash in database
      const base64Image = fs.readFileSync(filePath, { encoding: 'base64' });
      const createdUserAvatar = new this.useAvatarrModel({
        userId,
        hash: base64Image,
      });

      const savedUserAvatar = await createdUserAvatar.save();

      // Return base64-encoded representation of saved image
      return savedUserAvatar.hash;
    }
  }

  async deleteUserAvatar(userId: string): Promise<any> {
    const user = await this.useAvatarrModel.findOne({ userId });
    console.log(user, 'user');

    if (!user) {
      return { message: 'User not found' };
    }

    if (!user.hash) {
      return { message: 'User has no avatar' };
    }

    // Delete the avatar file from the filesystem
    try {
      fs.unlinkSync(`avatars/${userId}.png`);
    } catch (error) {
      console.error('Error deleting avatar file:', error);
      return { message: 'Error deleting avatar file' };
    }

    // Remove the avatar file path from the user record in the database
    await this.useAvatarrModel.remove({ userId });

    return { message: 'Avatar removed successfully' };
  }
}
