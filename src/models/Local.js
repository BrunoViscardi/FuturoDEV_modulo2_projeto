const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Usuario = require("./Usuario")



const Local = connection.define('locais_de_treino', {
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
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pratica_esportiva: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    localidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    paranoid: true
})


Local.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

Usuario.hasMany(Local, {
    foreignKey: 'usuarioId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});



module.exports = Local