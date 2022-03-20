import Client from '../types/client';
import BankAccount from '../types/bankAccount';
import Address from '../types/address';
import WorkLog from '../types/workLog';
import JobCategory from '../types/jobCategory';

const personAccount: BankAccount = {
  accountNumber: '4214128391/5500',
  currency: 'CZK',
};

const personAddress: Address = {
  address: 'Street 2, 123',
  city: 'City 2',
  postcode: '602 02',
  country: 'US',
};

const person: Client = {
  email: 'john.doe@gmail.com',
  name: 'John Doe',
  mobileNumber: '+420123123123',
  isCompany: false,
  ic: 'ICO',
  dic: 'DICO',
  address: personAddress,
  bankAccount: personAccount,
  creationTime: new Date(),
};

const companyAccount: BankAccount = {
  accountNumber: '7214168391/5500',
  currency: 'CZK',
};

const companyAddress: Address = {
  address: 'Ulica 3, 1420',
  city: 'Kosice 2',
  postcode: '103 03',
  country: 'SK',
};

const company: Client = {
  email: 'contact@beegcorp.com',
  name: 'Beeg Scary Corporation',
  mobileNumber: '+420123123123',
  isCompany: true,
  ic: 'ICO',
  dic: 'DICO',
  address: companyAddress,
  bankAccount: companyAccount,
  creationTime: new Date(),
};

const unspecifiedCategory: JobCategory = {
  name: 'Unspecified',
  description: 'No category was selected',
  creationTime: new Date(),
  updatedAt: undefined,
};

const programmingCategory: JobCategory = {
  name: 'Programming',
  description: 'beep beep boop boop',
  creationTime: new Date(),
  updatedAt: undefined,
};

const researchCategory: JobCategory = {
  name: 'Research',
  description: 'Getting money for free',
  creationTime: new Date(),
  updatedAt: undefined,
};

const cleaningCategory: JobCategory = {
  name: 'Cleaning',
  description: 'Cleaners are the most important people in every company',
  creationTime: new Date(),
  updatedAt: undefined,
};

const customCategory1: JobCategory = {
  name: 'programming2',
  description: 'beep beep boop boop',
  creationTime: new Date(),
  updatedAt: undefined,
};

const workLog1: WorkLog = {
  uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', // uuid
  email: 'john.doe@gmail.com',
  name: 'Zapracovane hodne dost',
  description: 'Zabavna praca jak dycky',
  jobCategory: customCategory1,
  timeWorked: 90,
  total: 3000,
  workStart: new Date('2021-05-21'),
  workEnd: new Date('2021-05-23'),
  creationTime: new Date(),
  updatedAt: undefined,
};

const workLog2: WorkLog = {
  uuid: '8a6e0804-2bd0-4672-b79d-d97027f9071a', // uuid
  email: 'john.doe@gmail.com',
  name: 'Zapracovane hodne dost',
  description: 'Zabavna praca jak dycky',
  jobCategory: customCategory1,
  timeWorked: 90,
  total: 3000,
  workStart: new Date('2021-05-21'),
  workEnd: new Date('2021-05-23'),
  creationTime: new Date(),
  updatedAt: undefined,
};

const workLog3: WorkLog = {
  uuid: 'fc10b881-d9a0-4ab1-a6fd-a102db188f49', // uuid
  email: 'contact@beegcorp.com',
  name: 'Zapracovane hodne dost',
  description: 'Zabavna praca jak dycky',
  jobCategory: customCategory1,
  timeWorked: 90,
  total: 3000,
  workStart: new Date('2021-05-21'),
  workEnd: new Date('2021-05-23'),
  creationTime: new Date(),
  updatedAt: undefined,
};

const clients: Client[] = [person, company];
const workLogs: WorkLog[] = [workLog1, workLog2, workLog3];
const jobCategories: JobCategory[] = [
  unspecifiedCategory,
  programmingCategory,
  researchCategory,
  cleaningCategory,
  customCategory1,
];

const mockData = {
  clients,
  workLogs,
  jobCategories,
};

export default mockData;
