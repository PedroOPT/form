import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { AddressType } from "../enums/address-type.enum";
import { Address } from "../models/address.model";
import { Result } from "../models/result.model";
import { AddressService } from "../services/address.service";

@Controller('v1/addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) {
    }

    @Post(':telephone/home')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async postHomeAddress(@Param('telephone') telephone, @Body() model: Address) {
        try {
            await this.addressService.createAddress(telephone, model, AddressType.Home);
            return new Result('Endereço da casa cadastrado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException
                (new Result('Não foi possivel realizar o cadastro do endereço', false, null, error),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':telephone/work')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async postWorkAddress(@Param('telephone') telephone, @Body() model: Address) {
        try {
            await this.addressService.createAddress(telephone, model, AddressType.Work);
            return new Result('Endereço do trabalho cadastrado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException
                (new Result('Não foi possivel realizar o cadastro', false, null, error),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':telephone/favorites')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async postFavoriteAddress(@Param('telephone') telephone, @Body() model: Address) {
        try {
            await this.addressService.createAddress(telephone, model, AddressType.Favorite);
            return new Result('Endereço do trabalho cadastrado com sucesso!', true, model, null);
        } catch (error) {
            throw new HttpException
                (new Result('Não foi possivel realizar o cadastro', false, null, error),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':telephone/home')
    async getHomeAddress(@Param('telephone') telephone) {
        const user = await this.addressService.getAddress(telephone, AddressType.Home);
        return new Result(null, true, user, null);
    }

    @Get(':telephone/work')
    async getWorkAddress(@Param('telephone') telephone) {
        const user = await this.addressService.getAddress(telephone, AddressType.Work);
        return new Result(null, true, user, null);
    }

    @Get(':telephone/favorites')
    async getFavoritesAddresses(@Param('telephone') telephone) {
        const user = await this.addressService.getAddress(telephone, AddressType.Favorite);
        return new Result(null, true, user, null);
    }
}