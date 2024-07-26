const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Usuario = require("./Usuario")



const Endereco = connection.define('enderecos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
    },
    logradouro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    paranoid: true
})


Endereco.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
})



module.exports = Endereco