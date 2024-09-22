import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

User.plugin(uniqueValidator);

export default mongoose.model('User', User);
