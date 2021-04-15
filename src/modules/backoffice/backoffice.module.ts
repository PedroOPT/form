import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { mailerConfig } from 'src/config/mailer.config';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtEstrategy } from 'src/shared/strategies/jwt.strategy';
import { AccountController } from './controllers/account.controller';
import { AddressController } from './controllers/address.controller';
import { AppointmentController } from './controllers/appointment.controller';
import { UserController } from './controllers/user.controller';
import { UserAccountSchema } from './schemas/user-account.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { AddressService } from './services/address.service';
import { AppointmentService } from './services/appointment.service';
import { UserService } from './services/user.service';

@Module({
    imports: [
        MailerModule.forRoot(mailerConfig),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: '54147f5ce0d2',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MongooseModule.forFeature(
            [
                {
                    name: 'User',
                    schema: UserSchema,
                },
                {
                    name: 'UserAccount',
                    schema: UserAccountSchema,
                },
            ]
        )
    ],
    controllers: [
        AccountController,
        AddressController,
        AppointmentController,
        UserController,
    ],
    providers: [
        AccountService,
        AddressService,
        AppointmentService,
        UserService,
        AuthService,
        JwtEstrategy,
    ],
})
export class BackofficeModule { }
