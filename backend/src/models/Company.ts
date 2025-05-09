import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Address } from './Address';

export class Company extends Model {
  public id!: number;
  public cnpj!: string;
  public real_name!: string;
  public fantasy_name!: string;
  public phone?: string;
  public email?: string;
  public address_id?: number;
  public is_active!: boolean;
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cnpj: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    real_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fantasy_name: {
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
    tableName: 'companies',
    timestamps: false,
    underscored: true,
  }
); 