import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { Contract } from '../contract';

@Injectable()
export class CreateUserContract implements Contract {
    errors: any[];

    validate(model: CreateUserDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido');
        flunt.isEmail(model.email, 'Email inválido');
        flunt.hasMinLen(model.password, 6, 'Senha inválida');

        this.errors = flunt.errors;

        return flunt.isValid();
    }

}