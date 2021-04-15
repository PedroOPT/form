import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressType } from '../enums/address-type.enum';
import { UserInterface } from '../interfaces/user.interface';
import { Address } from '../models/address.model';


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
        else {
            return await this.model.findOneAndUpdate({ telephone }, {
                $set: {
                    workAddress: data,
                },
            }, options);
        }
    }
}