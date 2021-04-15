import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Address } from '../../models/address.model';
import { Contract } from '../contract';

@Injectable()
export class CreateAddressContract implements Contract {
    errors: any[];

    validate(model: Address): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.street, 3, 'Rua inválida');
        flunt.hasMinLen(model.neighborhood, 3, 'Bairro inválido');
        flunt.hasMinLen(model.city, 3, 'Cidade inválida');
        flunt.isFixedLen(model.state, 2, 'Estado inválido');

        this.errors = flunt.errors;

        return flunt.isValid();
    }

}