import { RequestHandler } from 'express';
import fs from 'fs';

import { Sauce } from '../models/Sauce';
import safe from '../services/safe';

async function removeImage(sauce: any) {
  const [_, filename] = sauce.imageUrl.split`/images/`;
  const result = await fs.unlink(`public/images/${filename}`, () => null);
}

/* GET /api/sauces - 
Array of sauces Renvoie un tableau de toutes les sauces de la base de données.
*/
const findAll: RequestHandler = async (req, res) => {
  const result = await Sauce.find();
  return res.status(200).json(result);
};

/* GET /api/sauces/:id - 
Single sauce Renvoie la sauce avec l’_id fourni.
*/
const findOneById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await Sauce.findOne({ _id: id });
  return res.status(200).json(result);
};

/* POST /api/sauces { sauce: String, image: File }
{ message: String }
Verb Capture et enregistre l'image, analyse la sauce transformée en chaîne de caractères et l'enregistre
dans la base de données en définissant correctement son imageUrl. 
Initialise les likes et dislikes de la sauce à 0 et les usersLiked et usersDisliked avec des tableaux vides. 
Remarquez que le corps de la demande initiale est vide ; 
lorsque multer est ajouté, il renvoie une chaîne pour le corps de la demande en fonction des
données soumises avec le fichier.
*/
const create: RequestHandler = async (req, res) => {
  const { userId } = req.auth;
  const rawSauce = req.body;

  const sauce = new Sauce({
    ...rawSauce,
    userId,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  await sauce.save();
  return res.status(201).json({ message: 'Sauce created' });
};

/* PUT /api/sauces/:id EITHER Sauce as JSON OR { sauce: String, image: File }
{ message: String } 
Met à jour la sauce avec l'_id fourni. Si une image est téléchargée, 
elle est capturée et l’imageUrl de la sauce est mise à jour. 
Si aucun fichier n'est fourni, les informations sur la sauce se trouvent directement 
dans le corps de la requête (req.body.name, req.body.heat, etc.). 
Si un fichier est fourni, la sauce transformée en chaîne de caractères se trouve dans req.body.sauce. 
Notez que le corps de la demande initiale est vide ; 
lorsque multer est ajouté, il renvoie une chaîne du corps de la demande basée sur les
données soumises avec le fichier.
*/
const update: RequestHandler = async (req, res) => {
  const { userId } = req.auth;
  const { id: _id } = req.params;
  const rawSauce = req.body;

  const sauce = (await Sauce.findOne({ _id })) as any;

  if (sauce.userId !== userId) {
    return res.status(401).json({ message: "you can't update this sauce" });
  }

  if (rawSauce.imageUrl) {
    await removeImage(sauce);
  }

  await Sauce.updateOne({ _id, userId }, { ...rawSauce, _id });
  res.status(200).json({ message: 'Sauce modified' });
};

/* DELETE /api/sauces/:id - { message: String } 
Supprime la sauce avec l'_id fourni.
*/
const remove: RequestHandler = async (req, res) => {
  const { userId } = req.auth;
  const { id: _id } = req.params;

  const sauce = (await Sauce.findOne({ _id })) as any;

  if (sauce.userId !== userId) {
    return res.status(401).json({ message: "you can't delete this sauce" });
  }

  const { acknowledged, deletedCount } = await Sauce.deleteOne({ _id, userId });
  if (!acknowledged || deletedCount === 0) {
    throw new Error('Problem while deleting the sauce');
  }
  await removeImage(sauce);
  res.status(200).json({ message: 'Sauce deleted' });
};

/* POST /api/sauces/:id/like { userId: String, like: Number }
{ message: String } 
Définit le statut « Like » pour l' userId fourni. 
Si like = 1,  l'utilisateur aime (= like) la sauce. 
Si like = 0, l'utilisateur annule son like ou son dislike. 
Si like = -1, l'utilisateur n'aime pas (=dislike) la sauce. 
L'ID de l'utilisateur doit être ajouté ou retiré du tableau approprié. 
Cela permet de garder une trace de leurs préférences et les empêche de liker 
ou de ne pas disliker la même sauce plusieurs fois : 
un utilisateur ne peut avoir qu'une seule valeur pour chaque sauce. 
Le nombre total de « Like » et de « Dislike » est mis à jour à chaque nouvelle notation.
*/
const like: RequestHandler = async (req, res) => {
  const { userId } = req.auth;
  const { id: _id } = req.params;
  const { like } = req.body;

  const sauce = (await Sauce.findOne({ _id })) as any;

  const usersLiked = sauce.usersLiked.filter((a: string) => a !== userId);
  const usersDisliked = sauce.usersDisliked.filter((a: string) => a !== userId);
  if (like === 1) {
    usersLiked.push(userId);
    usersLiked.sort((a: string, b: string) => (a > b ? 1 : -1));
  }
  if (like === -1) {
    usersDisliked.push(userId);
    usersDisliked.sort((a: string, b: string) => (a > b ? 1 : -1));
  }

  sauce.likes = usersLiked.length;
  sauce.dislikes = usersDisliked.length;
  sauce.usersLiked = usersLiked;
  sauce.usersDisliked = usersDisliked;

  await Sauce.updateOne({ _id }, sauce);
  res.status(200).json({ message: 'Likes updated' });
};
export const sauceController = {
  findAll: safe(findAll),
  findOneById: safe(findOneById),
  create: safe(create),
  update: safe(update),
  remove: safe(remove),
  like: safe(like),
};
