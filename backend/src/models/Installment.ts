import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Installment extends Model {
  public id!: number;
  public transaction_id!: number;
  public transaction_type!: string;
  public installment_amount!: number;
  public due_date!: Date;
  public paid!: boolean;
  public payment_date?: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Installment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    installment_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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
    tableName: 'installments',
    timestamps: true,
    underscored: true,
  }
); 