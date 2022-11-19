
const Role = require('../models/role');

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



async( rol = '') => {
    const existeRol = await Role.findOne({ rol });
     if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la Base de Datos`)
     }
}



const esRolValido = async( rol = '') => {
    const existeRol = await Role.findOne({ rol });
     if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la Base de Datos`)
     }
}

module.exports = {
    esRolValido
}