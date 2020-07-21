'use strict'

// =======================================
// MODELO DE USUARIOS USANDO MONGOOSE
// ========================================

const mongoose = require('mongoose');

//Se importa la librería encargada de realizar la validación
//para campos únicos.
const uniqueValidator = require('mongoose-unique-validator');

//Declaración del esquema usando la librería mongoose.
let Schema = mongoose.Schema;

// RolesValidos es una enumeración que nos permite definir los únicos posibles valores que tiene
// un campo en un esquema, en nuestro caso necesitamos sólo dos valores para el rol del usuario 
// que son user_role y admin_role
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

//Creación de un nuevo esquema, en este caso Users.
let UserSchema = new Schema({

    name: {
        type: String,
        required: [true, "EL NOMBRE ES OBLIGATORIO"]
    },
    surname: {
        type: String,
        required: [true, 'EL APELLIDO ES OBLIGATORIO']
    },
    nick: {
        type: String,
        required: [true, "EL NICKNAME ES OBLIGATORIO"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "EL CORREO ES OBLIGATORIO"],
        unique: true
            //Falta trabajar con esta validación.
    },
    password: {
        type: String,
        required: [true, "LA PASSWORD ES OBLLIGATORIA"]
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    image: {
        type: String,
        default: null,
        required: false
    }

});


//Eliminar un atributo de la petición
UserSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
//Añadir el plugin unique-validator para sólo permitir un único registro
//con los valores agregados.
UserSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

//Se indica el nombre de la entidad y además el esquema que contiene dicha entidad, en este caso UserSchema.
//Finalmente en la colección de la base de datos la entidad especificada acá como 'User' quedará pluralizada  y
//además en minúscula, es decir, users. De esta forma se haría referencia.
module.exports = mongoose.model('User', UserSchema);