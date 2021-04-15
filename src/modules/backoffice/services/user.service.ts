import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryDto } from '../dtos/query.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { UserInterface } from '../interfaces/user.interface';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly model: Model<UserInterface>) {
    }
    //Lista Usuários
    async getAll(): Promise<User[]> {
        return await this.model.find(
            {},
            'name email telephone'
        )
            .sort('name')
            .exec();
    }

    //Lista um usuario
    async getUser(telephone): Promise<User> {
        return await this.model.findOne(
            { telephone },
        )
            .populate('userAccount', '-password')
            .sort('name')
            .exec();
    }

    //Cria um novo usuário
    async create(data: User): Promise<UserInterface> {
        const user = new this.model(data);
        return await user.save();
    }

    //Atualiza o nome do usuário
    async update(telephone: string, data: UpdateUserDto): Promise<UserInterface>{
        const options = { useFindAndModify: false }
        return await this.model.findOneAndUpdate({ telephone }, data, options);
    }

    /*Query
    query: filtro,
    fields: campos p/ retorno,
    sort: ordenação de retorno,
    skip: se deseja pular,
    take: qtd de resultados,
    */
    async query(model: QueryDto): Promise<UserInterface[]> {
        return await this.model
            .find(model.query, model.fields,
                {
                    skip: model.skip,
                    limit: model.take,
                })
            .sort(model.sort)
            .exec();
    }
}