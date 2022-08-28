const express = require("express");
const UserController = require("../controllers/UserController.js");

const router = express.Router();

function defaultAction(req, res, next) {
  res.json({ result: "INPROGESS" });
}

/* POST /api/auth/signup { email: string, password: string }
{ message: string }
Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données.
*/
router.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserController.signup(email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

/* POST /api/auth/login { email: string, password: string }
{ userId: string, token: string }
Vérification des informations d'identification de l'utilisateur, 
renvoie l _id de l'utilisateur depuis la base de données et un token web JSON signé
(contenant également l'_id de l'utilisateur).
*/
router.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserController.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

/* GET /api/sauces - 
Array of sauces Renvoie un tableau de toutes les sauces de la base de données.
*/
router.get("/api/sauces", async (req, res) => {
  const Sauce = require("../models/Sauce");
  try {
    const result = await Sauce.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

/* GET /api/sauces/:id - 
Single sauce Renvoie la sauce avec l’_id fourni.
*/
router.get("/api/sauces/:id", async (req, res) => {
  const Sauce = require("../models/Sauce");

  try {
    const result = await Sauce.findOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

/* POST /api/sauces { sauce: String, image: File }
{ message: String }
Verb Capture et enregistre l'image, analyse la sauce transformée en chaîne de caractères et l'enregistre
dans la base de données en définissant correctement son imageUrl. 
Initialise les likes et dislikes de la sauce à 0 et les usersLiked et usersDisliked avec des tableaux vides. 
Remarquez que le corps de la demande initiale est vide ; 
lorsque multer est ajouté, il renvoie une chaîne pour le corps de la demande en fonction des
données soumises avec le fichier.
*/
router.post("/api/sauces", async (req, res) => {
  const Sauce = require("../models/Sauce");
  const sauce = new Sauce(req.body);

  try {
    const result = await sauce.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

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
router.put("/api/sauces/:id", async (req, res) => {
  const Sauce = require("../models/Sauce");

  try {
    const _id = req.params.id;
    const result = await Sauce.updateOne({ _id }, { ...req.body, _id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

/* DELETE /api/sauces/:id - { message: String } 
Supprime la sauce avec l'_id fourni.
*/
router.delete("/api/sauces/:id", async (req, res) => {
  const Sauce = require("../models/Sauce");

  try {
    const _id = req.params.id;
    const result = await Sauce.deleteOne({ _id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

/* POST /api/sauces/:id/like { userId: String, like: Number }
{ message: String } 
Définit le statut « Like » pour l' userId fourni. Si like = 1,  l'utilisateur aime (= like) la sauce. 
Si like = 0, l'utilisateur annule son like ou son dislike. 
Si like = -1, l'utilisateur n'aime pas (=dislike) la sauce. 
L'ID de l'utilisateur doit être ajouté ou retiré du tableau approprié. 
Cela permet de garder une trace de leurs préférences et les empêche de liker 
ou de ne pas disliker la même sauce plusieurs fois : 
un utilisateur ne peut avoir qu'une seule valeur pour chaque sauce. 
Le nombre total de « Like » et de « Dislike » est mis à jour à chaque nouvelle notation.
*/
router.post("/api/sauces/:id/like", defaultAction);

module.exports = router;
