import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { IUserEntity } from '@piiquante/shared';

const userSchema = new Schema<IUserEntity>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
}).plugin(uniqueValidator);

export const User = model<IUserEntity>('User', userSchema);
