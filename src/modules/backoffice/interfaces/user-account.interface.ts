import * as mongoose from 'mongoose';

export class UserAccountInterface extends mongoose.Document {
    public readonly username: string;
    public readonly password: string;
    public readonly confirmationToken: string;
    public readonly recoverToken: string;
    public readonly roles: string[];
    public readonly active: boolean;
}