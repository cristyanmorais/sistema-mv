import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Address } from './Address';

export class Client extends Model {
  public id!: number;
  public name!: string;
  public phone?: string;
  public email?: string;
  public address_id?: number;
  public is_active!: boolean;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Address,
        key: 'id',
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'clients',
    timestamps: false,
    underscored: true,
  }
); 