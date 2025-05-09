import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Client } from './Client';
import { Address } from './Address';

export class Work extends Model {
  public id!: number;
  public name!: string;
  public area?: number;
  public floors!: number;
  public client_id?: number;
  public address_id?: number;
  public is_active!: boolean;
}

Work.init(
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
    area: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    floors: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Client,
        key: 'id',
      },
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
    tableName: 'works',
    timestamps: false,
    underscored: true,
  }
); 