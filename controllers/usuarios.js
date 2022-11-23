const { response, request } = require("express");
const bcryptjs = require("bcryptjs");


const Usuario = require("../models/usuario");

const usuariosGet = async(req = request, res = response) => {
 // const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0  } = req.query;
  const usuarios = await Usuario.find()
  .skip(Number(desde))
  .limit(Number(limite));

  res.json({
    usuarios 
    // msg: "get API - controlador",
    // q,
    // nombre,
    // apikey,
    // page,
    // limit,
  });
};

const usuariosPost = async (req, res = response) => {

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors);
  // }

  const { nombre, correo, password, rol } = req.body;
  //const body = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // // Verificar si el correo existe
  // const existeEmail = await Usuario.findOne({ correo });
  // if (existeEmail) {
  //   return res.status(400).json({
  //     msg: "Ese correo ya está registrado",
  //   });
  // }

  // Encriptar la contraseña  // el hash
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = async(req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto} = req.body;

  // Todo validar contra BD
  if ( password ) {
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);    
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto );

  res.json(usuario);
};


const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - usuariosDelete",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
