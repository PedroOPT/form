import { Address } from './address.model';
import { Appointment } from './appointment.model';
import { Friend } from './friend.model';
import { UserAccount } from './user-account.model';

export class User {
    constructor(
        public name: string,
        public email: string,
        public telephone: string,
        public homeAddress: Address,
        public workAddress: Address,
        public recents: Address[],
        public favorites: Address[],
        public appointments: Appointment[],
        public friends: Friend[],
        public userAccount: UserAccount,
    ) {
    }
}