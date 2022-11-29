const { response, request } = require("express");
const bcryptjs = require("bcryptjs");


const Usuario = require("../models/usuario");

const usuariosGet = async(req = request, res = response) => {
 // const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0  } = req.query;

  const query = {estado: true}

  // // Promesa 1 // 163 ms
  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // // Promesa 2 // 165 ms
  // const total = await Usuario.countDocuments(query);

// Ambas promesas prcesadas paralelamente y hasta que se ejecutan y resuelvan las dos espera el Await  // 84ms
//const resp = await Promise.all([
  const [ total, usuarios ] = await Promise.all([  
    Usuario.count(query),
    Usuario.find(query)
      .skip( Number( desde ))
      .limit( Number( limite ))
]);

  res.json({
    //resp
    total,
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

const usuariosDelete = async(req, res = response) => {

  const { id } = req.params;

  // // Borrado Físicamente
  // const usuario = await Usuario.findByIdAndDelete( id );

 // Borrado por Estado Actualizado
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

  res.json(usuario);
    // msg: "delete API - usuariosDelete",
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
