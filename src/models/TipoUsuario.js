import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig.js';

const TipoUsuario = sequelize.define('TipoUsuario', {
  secuencial: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
  },
  descripcion: {
    type: DataTypes.STRING(75),
    allowNull: false,
    field: 'descripcion',
  },
  estaActivo: {
    type: DataTypes.SMALLINT, 
    allowNull: false,
    defaultValue: 1,
  },
  // Otros campos de tipo de usuario
});
export default TipoUsuario;