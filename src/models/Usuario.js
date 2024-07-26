const { DataTypes } = require("sequelize");
const {hashSync} = require('bcryptjs')
const connection = require("../database/connection");



const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password_hash: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      cpf: {
        type: DataTypes.STRING(14),
        unique: true,
        allowNull: false
      },
      sexo: {
        type: DataTypes.ENUM,
        values: ['masculino', 'feminino', 'outro'],
        allowNull: true
      },
      data_nascimento: {
        type: DataTypes.DATE,
        allowNull: true
      },
      endereço: {
        type: DataTypes.STRING,
        allowNull: false
      },
}, {
    paranoid: true
})





// hooks

Usuario.beforeSave((usuario) => {
    usuario.password_hash = hashSync(usuario.password_hash, 10)
    return usuario
})

module.exports = Usuario