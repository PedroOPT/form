import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from 'md5-typescript';
import { Model } from 'mongoose';
import { UserAccountInterface } from '../interfaces/user-account.interface';
import { UserInterface } from '../interfaces/user.interface';
import { UserAccount } from '../models/user-account.model';
import * as crypto from 'crypto';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel('UserAccount') private readonly model: Model<UserAccountInterface>,
        @InjectModel('User') private userModel: Model<UserInterface>
    ) {
    }

    //Cria a conta de um novo usuário
    async create(data: UserAccount): Promise<UserAccountInterface> {
        const userAccount = new this.model(data);
        return await userAccount.save();
    }

    async update(username: string, data: any): Promise<UserAccountInterface> {
        return await this.model.findOneAndUpdate({ username }, data);
    }

    async confirmEmail(confirmationToken: string): Promise<UserAccountInterface> {
        const result = await this.model.findOneAndUpdate(
            { confirmationToken },
            {
                confirmationToken: null,
                active: true,
            },
        );
        return result;
    }

    async authenticate(username, password): Promise<UserInterface> {
        var user = await this.userModel
            .findOne({ telephone: username })
            .populate('userAccount')
            .exec();

        const pass = await Md5.init(`${password}${process.env.SALT_KEY}`);
        if (pass.toString() === user.userAccount.password.toString()) {
            return user;
        } else {
            return null;
        }
    }

    async findByUsername(username): Promise<UserAccountInterface> {
        return await this.model
            .findOne({ username: username })
            .exec();
    }
}