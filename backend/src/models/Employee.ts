import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Address } from './Address';

export class Employee extends Model {
  public id!: number;
  public name!: string;
  public cpf!: string;
  public phone?: string;
  public email?: string;
  public address_id?: number;
  public is_active!: boolean;
}

Employee.init(
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
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
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
    tableName: 'employees',
    timestamps: false,
    underscored: true,
  }
); 