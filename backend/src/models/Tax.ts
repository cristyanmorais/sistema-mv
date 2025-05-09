import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { TaxType } from './TaxType';

export class Tax extends Model {
  public id!: number;
  public amount!: number;
  public taxes_type_id!: number;
  public date!: Date;
  public paid!: boolean;
  public num_installments!: number;
  public description?: string;
  public is_active!: boolean;
  public readonly created_at!: Date;
}

Tax.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    taxes_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TaxType,
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    num_installments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'taxes',
    timestamps: false,
    underscored: true,
  }
); 