const express = require("express");
const router = express.Router();
const {
  createBook,
  allBooks,
  updateBook,
  findBook,
  ordenAlfabetico,
} = require("../controllers/libroController");
const {verifyToken,isAdmin} =require('../middleware')


router.post("/", createBook);
router.get("/", allBooks);
router.get("/:id", findBook); //ruta no testeada
router.put("/:id", updateBook); //ruta no testeada

router.get("/orden/az",ordenAlfabetico)


module.exports = router;
