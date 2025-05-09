import { Address } from './Address';
import { City } from './City';
import { Client } from './Client';
import { Company } from './Company';
import { Employee } from './Employee';
import { Work } from './Work';
import { ProvidedService } from './ProvidedService';
import { ContractedService } from './ContractedService';
import { Purchase } from './Purchase';
import { Sale } from './Sale';
import { Tax } from './Tax';
import { TaxType } from './TaxType';
import { Payroll } from './Payroll';

// Address associations
Address.belongsTo(City, { foreignKey: 'city_id' });
City.hasMany(Address, { foreignKey: 'city_id' });

// Client associations
Client.belongsTo(Address, { foreignKey: 'address_id' });
Address.hasMany(Client, { foreignKey: 'address_id' });

// Company associations
Company.belongsTo(Address, { foreignKey: 'address_id' });
Address.hasMany(Company, { foreignKey: 'address_id' });

// Employee associations
Employee.belongsTo(Address, { foreignKey: 'address_id' });
Address.hasMany(Employee, { foreignKey: 'address_id' });

// Work associations
Work.belongsTo(Client, { foreignKey: 'client_id' });
Client.hasMany(Work, { foreignKey: 'client_id' });

Work.belongsTo(Address, { foreignKey: 'address_id' });
Address.hasMany(Work, { foreignKey: 'address_id' });

// ProvidedService associations
ProvidedService.belongsTo(Client, { foreignKey: 'client_id' });
Client.hasMany(ProvidedService, { foreignKey: 'client_id' });

// ContractedService associations
ContractedService.belongsTo(Employee, { foreignKey: 'employee_id' });
Employee.hasMany(ContractedService, { foreignKey: 'employee_id' });

ContractedService.belongsTo(Work, { foreignKey: 'work_id' });
Work.hasMany(ContractedService, { foreignKey: 'work_id' });

// Purchase associations
Purchase.belongsTo(Company, { foreignKey: 'company_id' });
Company.hasMany(Purchase, { foreignKey: 'company_id' });

// Sale associations
Sale.belongsTo(Work, { foreignKey: 'work_id' });
Work.hasMany(Sale, { foreignKey: 'work_id' });

// Tax associations
Tax.belongsTo(TaxType, { foreignKey: 'taxes_type_id' });
TaxType.hasMany(Tax, { foreignKey: 'taxes_type_id' });

// Payroll associations
Payroll.belongsTo(Employee, { foreignKey: 'employee_id' });
Employee.hasMany(Payroll, { foreignKey: 'employee_id' }); 