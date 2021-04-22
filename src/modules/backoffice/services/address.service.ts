import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressType } from '../enums/address-type.enum';
import { UserInterface } from '../interfaces/user.interface';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';


@Injectable()
export class AddressService {
    constructor(@InjectModel('User') private model: Model<UserInterface>) {
    }

    async createAddress(telephone: string, data: Address, type: AddressType): Promise<UserInterface> {
        const options = { upsert: true };
        if (type === AddressType.Home) {
            return await this.model.findOneAndUpdate({ telephone }, {
                $set: {
                    homeAddress: data,
                },
            }, options);
        }
        else if (type === AddressType.Work){
            return await this.model.findOneAndUpdate({ telephone }, {
                $set: {
                    workAddress: data,
                },
            }, options);
        }
        else if (type === AddressType.Favorite){
            var address = this.getAddress (telephone, AddressType.Favorite);
            if ((await address).favorites.find(a => a.title === data.title)){
                return null;
            }
            else {
                return await this.model.findOneAndUpdate({ telephone }, {
                    $push: {
                        favorites: data,
                    },
                }, options);
            }
        }
    }
    async getAddress(telephone, type: AddressType): Promise<User> {
        if (type === AddressType.Home) {
        return await this.model.findOne(
            {telephone},
            'homeAddress'
        )
            .sort('name')
            .exec();
        }
        else if (type === AddressType.Work){
            return await this.model.findOne(
                {telephone},
                'workAddress'
            )
                .sort('name')
                .exec();
        }
        else if (type === AddressType.Favorite){
            return await this.model.findOne(
                {telephone},
                'favorites'
            )
                .populate('favorites')
                .exec();
        }
    }

}