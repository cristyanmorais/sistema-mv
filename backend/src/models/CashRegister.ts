import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class CashRegister extends Model {
  public id!: number;
  public transaction_type!: string;
  public transaction_id!: number;
  public transaction_date!: Date;
  public amount!: number;
  public balance!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

CashRegister.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transaction_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
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
    tableName: 'cash_register',
    timestamps: true,
    underscored: true,
  }
); 