import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserAvatarDocument = HydratedDocument<UserAvatar>;

@Schema()
export class UserAvatar {
  @Prop()
  userId: number;

  @Prop()
  hash: string;
}

export const UserAvatarSchema = SchemaFactory.createForClass(UserAvatar);
