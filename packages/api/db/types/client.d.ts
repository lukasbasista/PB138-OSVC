import Address from './address';
import BankAccount from './bankAccount';

type Client = {
  email: string;
  name: string;
  mobileNumber?: string;
  isCompany: boolean;
  ic?: string;
  dic?: string;
  address: Address;
  bankAccount: BankAccount;
  creationTime: Date;
  updatedAt?: Date;
};

export default Client;
