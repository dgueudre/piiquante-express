const express = require("express");
const fs = require("fs");
const auth = require("./auth.js");
const multer = require("./multer.js");
const UserController = require("../controllers/UserController.js");
const SauceController = require("../controllers/SauceController.js");
const safe = require("./safe.js");

const router = express.Router();

function defaultAction(req, res, next) {
  res.json({ result: "INPROGESS" });
}

async function executeAction(action, res) {
  try {
    const [status, result] = await action;
    res.status(status).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
}

router.post("/api/auth/signup", safe(UserController.signup));
router.post("/api/auth/login", safe(UserController.login));

/* GET /api/sauces - 
Array of sauces Renvoie un tableau de toutes les sauces de la base de données.
*/
router.get("/api/sauces", auth.verifyToken, async (req, res) => {
  const action = SauceController.findAll();
  await executeAction(action, res);
});

/* GET /api/sauces/:id - 
Single sauce Renvoie la sauce avec l’_id fourni.
*/
router.get("/api/sauces/:id", auth.verifyToken, async (req, res) => {
  const { id } = req.params;
  const action = SauceController.findOneById(id);
  await executeAction(action, res);
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
router.post("/api/sauces", auth.verifyToken, multer, async (req, res) => {
  let sauce;
  try {
    sauce = JSON.parse(req.body.sauce);
  } catch (error) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  const { userId } = req.auth;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  const action = SauceController.create({ ...sauce, userId, imageUrl });
  executeAction(action, res);
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
router.put("/api/sauces/:id", auth.verifyToken, multer, async (req, res) => {
  const Sauce = require("../models/Sauce");

  const { id } = req.params;

  const rawSauce = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete rawSauce._id;

  try {
    const _id = id;
    const result = await Sauce.updateOne(
      { _id, userId: req.auth.userId },
      { ...rawSauce, _id }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

/* DELETE /api/sauces/:id - { message: String } 
Supprime la sauce avec l'_id fourni.
*/
router.delete("/api/sauces/:id", auth.verifyToken, async (req, res) => {
  const Sauce = require("../models/Sauce");

  try {
    const { userId } = req.auth;
    const _id = req.params.id;
    const sauce = await Sauce.findOne({ _id });
    const { acknowledged, deletedCount } = await Sauce.deleteOne({
      _id,
      userId,
    });
    if (!acknowledged || deletedCount === 0) {
      res.status(401).json({ message: "Not authorized" });
      return;
    } else {
      const [_, filename] = sauce.imageUrl.split`/images/`;
      const result = await fs.unlink(`public/images/${filename}`, () => null);
      res.status(200).json(result);
    }
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
router.post("/api/sauces/:id/like", auth.verifyToken, defaultAction);

module.exports = router;
