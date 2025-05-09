import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Work } from './Work';

export class Sale extends Model {
  public id!: number;
  public amount!: number;
  public work_id?: number;
  public date?: Date;
  public paid!: boolean;
  public num_installments!: number;
  public description?: string;
  public is_active!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Sale.init(
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
    work_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Work,
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'sales',
    timestamps: true,
    underscored: true,
  }
); 