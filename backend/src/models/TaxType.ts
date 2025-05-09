import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class TaxType extends Model {
  public id!: number;
  public name!: string;
}

TaxType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'taxes_type',
    timestamps: false,
    underscored: true,
  }
); 