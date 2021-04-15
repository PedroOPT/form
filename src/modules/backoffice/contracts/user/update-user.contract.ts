import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { Contract } from '../contract';

@Injectable()
export class UpdateUserContract implements Contract {
    errors: any[];

    validate(model: UpdateUserDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido');

        this.errors = flunt.errors;

        return flunt.isValid();
    }

}