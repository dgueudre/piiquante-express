import { model, Schema } from 'mongoose';

import { ISauceEntity } from '@piiquante/shared';

const sauceSchema = new Schema({
  userId: { type: String, require: true },
  name: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String, require: true },
  mainPepper: { type: String, require: true },
  imageUrl: { type: String, require: true },
  heat: { type: Number, require: true },
  likes: { type: Number, require: true },
  dislikes: { type: Number, require: true },
  usersLiked: { type: [String], require: false },
  usersDisliked: { type: [String], require: false },
});

export const Sauce = model<ISauceEntity>('Sauce', sauceSchema);
