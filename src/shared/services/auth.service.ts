import { JwtService } from '@nestjs/jwt';
import { Injectable } from "@nestjs/common";
import { AccountService } from "src/modules/backoffice/services/account.service";
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) { }

    async createToken(telephone, email, image, roles: string[]) {
        const user: JwtPayload = {
            telephone: telephone,
            email: email,
            //image: image,
            roles: roles
        };
        return await this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        //let user = await this.accountService.findByUsername(payload.telephone);
        return payload;
    }
}