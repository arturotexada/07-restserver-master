
const { Router } = require('express');
const { check } = require('express-validator');
//const Role = require('../models/role');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );


router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRoleValido ),
        validarCampos
], usuariosPut );

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



router.post('/', [ 
    check('nombre', 'El NOMBRE es obligatorio').not().isEmpty(),
    check('password', 'El PASSWORD debe ser mayo a 6 letras').isLength({min:6}), 
    check('correo', 'El CORREO no es válido').isEmail(), 
    check('correo').custom( emailExiste ),
  //check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),     // Validar esto mejor contra la Base de Datos
//  check('rol').custom( async(rol= '') => {
//         const existeRol = await Role.findOne({ rol });
//     if ( !existeRol ) {
//         throw new Error(`El error ${ rol } no está registrado en la BD`)
//     }
// }),
    check('rol').custom( esRoleValido ),
    
    validarCampos
], usuariosPost );

router.delete('/:id', [ 
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosDelete); 
router.patch('/', usuariosPatch );

module.exports = router;