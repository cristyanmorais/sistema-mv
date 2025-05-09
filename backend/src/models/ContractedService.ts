import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Employee } from './Employee';
import { Work } from './Work';

export class ContractedService extends Model {
  public id!: number;
  public amount!: number;
  public employee_id!: number;
  public description!: string;
  public date!: Date;
  public work_id?: number;
  public paid!: boolean;
  public num_installments!: number;
  public is_active!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ContractedService.init(
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
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employee,
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
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
    tableName: 'contracted_services',
    timestamps: true,
    underscored: true,
  }
); 