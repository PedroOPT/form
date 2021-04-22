import { Body, Controller, Delete, Get, Header, HttpStatus, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { Md5 } from "md5-typescript";
import { Schema } from "mongoose";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { QueryContract } from "../contracts/query.contract";
import { CreateUserContract } from "../contracts/user/create-user.contract";
import { UpdateUserContract } from "../contracts/user/update-user.contract";
import { QueryDto } from "../dtos/query.dto";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { Address } from "../models/address.model";
import { Result } from "../models/result.model";
import { UserAccount } from "../models/user-account.model";
import { User } from "../models/user.model";
import { AccountService } from "../services/account.service";
import { UserService } from "../services/user.service";
import * as crypto from 'crypto';
import { MailerService } from "@nestjs-modules/mailer";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";

@Controller('v1/users')
export class UserController {
    constructor(
        private readonly accountService: AccountService,
        private readonly userService: UserService,
        private mailerService: MailerService,
    ) {
    }

    //Retorna todos os usuários
    @Get()
    async getAll() {
        const users = await this.userService.getAll();
        return new Result(null, true, users, null);
    }


    //@UseGuards(JwtAuthGuard)
    @Get(':telephone')
    async getById(@Param('telephone') telephone) {
        const user = await this.userService.getUser(telephone);
        return new Result(null, true, user, null);
    }

    @Post()
    @Header('Access-Control-Allow-Origin', '*')
    @Header("Access-Control-Allow-Credentials", "true")
    @Header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    @Header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    @UseInterceptors(new ValidatorInterceptor(new CreateUserContract()))
    async post(@Body() model: CreateUserDto) {
        try {
            const password = await Md5.init(`${model.password}${process.env.SALT_KEY}`);
            const confirmToken = crypto.randomBytes(32).toString('hex');
            const userAccount = await this.accountService.create(
                new UserAccount
                    (model.telephone, password, confirmToken, null, ['user'], false)
            );
            const user = new User(model.name, model.email, model.telephone, null, null, [], [], [], [], userAccount);
            const res = await this.userService.create(user);

            const mail = {
                to: user.email,
                from: 'noreply@application.com',
                subject: 'Email de confirmação',
                template: 'email-confirmation',
                context: {
                    token: userAccount.confirmationToken,
                },
            };
            await this.mailerService.sendMail(mail);

            return new Result('Usuário criado com sucesso', true, res, null);
        } catch (error) {
            (new Result('Não foi possivel criar o usuário', false, null, error),
                HttpStatus.BAD_REQUEST);
        }
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const users = await this.userService.query(model);
        return new Result(null, true, users, null);
    }


    @Put(':telephone')
    //@UseGuards(JwtAuthGuard)
    @Header('Access-Control-Allow-Origin', '*')
    @Header("Access-Control-Allow-Credentials", "true")
    @Header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    @Header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    @UseInterceptors(new ValidatorInterceptor(new UpdateUserContract()))
    async put(@Param('telephone') telephone, @Body() model: UpdateUserDto) {
        console.log(model.name);
        try {
            const user = await this.userService.update(telephone, model);
            return new Result('Usuário editado com sucesso', true, user, null);
        } catch (error) {
            (new Result('Não foi possivel editar o usuário', false, null, error),
                HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':telephone')
    delete(@Param('telephone') telephone) {
        return new Result('Usuário deletado com sucesso', true, null, null);
    }
}