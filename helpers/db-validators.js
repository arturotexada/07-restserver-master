const Role = require('../models/role');
const Usuario = require('../models/usuario');

// router.post('/', [ 
//     check('nombre', 'El NOMBRE es obligatorio').not().isEmpty(),
//     check('password', 'El PASSWORD debe ser mayo a 6 letras').isLength({min:6}), 
//     check('correo', 'El CORREO no es válido').isEmail(), 
//     //check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),     // Validar esto mejor contra la Base de Datos
//     check('rol').custom( async( rol = '') => {
//         const existeRol = await Role.findOne({ rol });
//          if ( !existeRol ) {
//             throw new Error(`El rol ${ rol } no está registrado en la Base de Datos`)
//          }
//     }),         
//     validarCampos
// ], usuariosPost );



// async( rol = '') => {
//     const existeRol = await Role.findOne({ rol });
//      if ( !existeRol ) {
//         throw new Error(`El rol ${ rol } no está registrado en la Base de Datos`)
//      }
// }


const esRoleValido = async( rol = '') => {
    const existeRol = await Role.findOne({ rol });
     if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la Base de Datos`)
     }
}

//   // Verificar si el correo existe
//   const existeEmail = await Usuario.findOne({ correo });
//   if (existeEmail) {
//     return res.status(400).json({
//       msg: "Ese correo ya está registrado",
//     });
//   }

const emailExiste = async( correo = '') => {
    // Verificar si el correo existe
    const existenteEmail = await Usuario.findOne({ correo });
    if ( existenteEmail ) {
        throw new Error(`El email ${ correo } ya existe en registro`)
    }
}


const existeUsuarioPorId = async( id ) => {
    // 
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe: ${ id } `);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}