const { Usuario } = require("../db");
const { uploadImageUser } = require("../libraries/cloudinary");
const fs = require("fs-extra");

//traer usuarios
async function getUsuarios(req, res, next) {
  try {
    let usuarios = await Usuario.findAll();
    if (usuarios.length > 0) {
      return res.json({ status: "succes", usuarios });
    } else {
      return res.status(404).json({ status: "error", msj: "no data found!" });
    }
  } catch (e) {
    res.status(404).json(e);
  }
}

//traer usuarios por id
async function getUsuarioById(req, res, next) {
  const { id } = req.params;
  try {
    let usuario = await Usuario.findByPk(id);
    if (usuario == null) {
      return res.status(404).json({ msj: `èl usuario con id ${id} no existe` });
    }
    res.status(202).json({ usuario });
  } catch (e) {
    res.status(404).json(e);
  }
}

//editar usuario
async function editUsuario(req, res, next) {
  const { id } = req.params;
  const { nombre, email, passworx, rol, estado, direccion, pais, ciudad } =
    req.body;
  let datos = req.body;
  if (req.files) {
    let { img } = req.files;
    const url = await uploadImageUser(img.tempFilePath);
    await fs.remove(req.files.img.tempFilePath);
    let imagen = url.secure_url;
    datos.img = imagen;
  } // const {img}=req.files;
  try {
    let usuario = await Usuario.findByPk(id);
    if (usuario == null) {
      return res.status(404).json({ msj: `èl usuario con id ${id} no existe` });
    }
    let actualizado = await Usuario.update(req.body, { where: { id } });
    usuario = await Usuario.findByPk(id);
    console.log(usuario);
    // let updated = await Usuario.update({nombre,email,passworx,rol,estado,direccion,pais,ciudad,img})
    res.status(200).json(usuario);
  } catch (e) {
    res.status(404).json(e);
  }
}

//

module.exports = {
  getUsuarios,
  getUsuarioById,
  editUsuario,
};
