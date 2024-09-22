import mongoose from 'mongoose';

import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from '../configuration';

export const dbService = {
  connect: async () => {
    try {
      const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
      await mongoose.connect(uri);

      console.log('connected to mongodb');
    } catch (error) {
      console.error('failed to connect to mongodb !');
    }
  },
};
