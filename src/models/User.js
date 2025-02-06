import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js';
import TipoUsuario from './TipoUsuario.js';

const User = sequelize.define('User', {
  secuencial: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
  },
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  nombres: {
    type: DataTypes.STRING(75),
    allowNull: false,
    defaultValue: '',
  },
  apellidos: {
    type: DataTypes.STRING(75),
    allowNull: false,
    defaultValue: '',
  },
  cedula: {
    type: DataTypes.STRING(15),
    allowNull: false,
    defaultValue: '',
  },
  direccion: {
    type: DataTypes.STRING(150),
    allowNull: false,
    defaultValue: '',
  },
  movil: {
    type: DataTypes.STRING(15),
    allowNull: false,
    defaultValue: '',
  },
  titulo_principal: {
    type: DataTypes.STRING(150),
    allowNull: false,
    defaultValue: '',
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: '',
  },
  estaActivo: {
    type: DataTypes.SMALLINT, 
    allowNull: false,
    defaultValue: 0,
  },  
  cargo: {
    type: DataTypes.STRING(250), 
    allowNull: false,
    defaultValue: '',
  },
  // Otros campos de usuario
});

// Establece la relación con TipoUsuario
User.belongsTo(TipoUsuario, {
  foreignKey: 'tipoUsuarioSecuencial', // Nombre del campo de clave externa en la tabla de Usuario con relacion a tipo de usuario
});

export default User;