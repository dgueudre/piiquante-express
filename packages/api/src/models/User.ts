import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { IUser } from '@piiquante/shared';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}).plugin(uniqueValidator);

export const User = model<IUser>('User', userSchema);
