import * as mongoose from 'mongoose';
import { Address } from '../models/address.model';
import { Appointment } from '../models/appointment.model';
import { Friend } from '../models/friend.model';
import { UserAccount } from '../models/user-account.model';

export class UserInterface extends mongoose.Document {
    public readonly name: string;
    public readonly email: string;
    public readonly telephone: string;
    public readonly homeAddress: Address;
    public readonly workAddress: Address;
    public readonly recents: Address[];
    public readonly favorites: Address[];
    public readonly appointments: Appointment[];
    public readonly friends: Friend[];
    public readonly userAccount: UserAccount; 
}