import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';

import { User } from '../models/User';
import { jwtService } from '../services/jwtService';
import safe from '../services/safe';

/* POST /api/auth/signup { email: string, password: string }
{ message: string }
Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données.
*/
const signup: RequestHandler = async (req, res) => {
  const { email, password: rawPassword } = req.body;
  const password = await bcrypt.hash(rawPassword, 10);
  try {
    const user = new User({ email, password });
    await user.save();
    return res.status(201).json({ message: 'User created' });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: `Email ${email} already use` });
    }
    throw error;
  }
};

/* POST /api/auth/login { email: string, password: string }
{ userId: string, token: string }
Vérification des informations d'identification de l'utilisateur, 
renvoie l _id de l'utilisateur depuis la base de données et un token web JSON signé
(contenant également l'_id de l'utilisateur).
*/
const login: RequestHandler = async (req, res) => {
  const { email, password: rawPassword } = req.body;
  const user = (await User.findOne({ email })) as any;
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(rawPassword, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const userId = user._id;
  const token = jwtService.sign({ userId });
  return res.status(200).json({ userId, token });
};

export default { signup: safe(signup), login: safe(login) };
