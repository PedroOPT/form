import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Address } from '../../models/address.model';
import { Contract } from '../contract';

@Injectable()
export class CreateAddressContract implements Contract {
    errors: any[];

    validate(model: Address): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.title, 3, 'Minimo 3');

        this.errors = flunt.errors;

        return flunt.isValid();
    }

}