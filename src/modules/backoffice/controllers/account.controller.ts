import { MailerService } from "@nestjs-modules/mailer";
import { Body, Controller, Get, Header, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Guid } from "guid-typescript";
import { Md5 } from "md5-typescript";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { AuthService } from "src/shared/services/auth.service";
import { AuthenticateDto } from "../dtos/account/authenticate.dto";
import { ChangePasswordDto } from "../dtos/account/change-password.dto";
import { ResetPasswordDto } from "../dtos/account/reset-password.dto";
import { Result } from "../models/result.model";
import { UserAccount } from "../models/user-account.model";
import { User } from "../models/user.model";
import { AccountService } from "../services/account.service";
import { UserService } from "../services/user.service";

@Controller('v1/accounts')
export class AccountController {
    constructor(
        private mailerService: MailerService,
        private authService: AuthService,
        private userService: UserService,
        private accountService: AccountService,
    ) { }

    //@UseGuards(JwtAuthGuard) para rotas que precisam de autenticação
    //UseInterceptors(new RoleInterceptor(['role'])) para rotas que precisam de acesso privilegiado


    //Autenticação - localhost:3000/v1/accounts/authenticate

    @Post('authenticate')
    @Header('Access-Control-Allow-Origin', '*')
    @Header("Access-Control-Allow-Credentials", "true")
    @Header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    @Header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const user = await this.accountService.authenticate(model.username, model.password);
        if (!user) {
            throw new HttpException(new Result
                ('Usuário ou senha inválidos', false, null, null),
                HttpStatus.NOT_FOUND);
        }
        if (!user.userAccount.active) {
            throw new HttpException(new Result
                ('Usuário inativo', false, null, null),
                HttpStatus.UNAUTHORIZED);
        }
        const token = await this.authService.createToken(user.telephone, user.email, '', user.userAccount.roles);
        return new Result(null, true, token, null);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Req() req): UserAccount {
        return req.user;
    }

    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            const user = await this.userService.getUser(model.telephone);
            
            const password = Guid.create().toString().substring(0, 8).replace('-', '');
            const newPassword = await Md5.init(`${password}${process.env.SALT_KEY}`);
            await this.accountService.update(model.telephone, { password: newPassword });

            const mail = {
                to: user.email,
                from: 'noreply@application.com',
                subject: 'Email de confirmação',
                template: 'recover-password',
                context: {
                    token: password,
                },
            };
            await this.mailerService.sendMail(mail);

            return new Result('Uma nova senha foi enviada para o seu e-mail', true, null, null);
        } catch (error) {
            throw new HttpException
                (new Result('Não foi possivel restaurar sua senha', false, null, error),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            //Encriptar Senha
            await this.accountService.update(request.user.telephone, { password: model.newPassword });
            return new Result('Senha alterada com sucesso!', true, null, null);
        } catch (error) {
            throw new HttpException
                (new Result('Não foi possivel alterar sua senha', false, null, error),
                    HttpStatus.BAD_REQUEST);
        }
    }

    //Refresh Token
    @Post('refresh')
    async refreshToken(@Req() request): Promise<any> {
        //Gera o token
        const token = await this.authService.createToken(request.user.telephone, request.user.email, request.user.image, request.user.roles);
        return new Result(null, true, token, null);
    }

    @Patch(':token')
    async confirmEmail(@Param('token') token: string) {
      const user = await this.accountService.confirmEmail(token);
      return new Result("E-mail confirmado com sucesso!", true, user, null);
    }
}