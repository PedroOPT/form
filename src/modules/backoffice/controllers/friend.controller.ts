import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Appointment } from "../models/appointment.model";
import { Result } from "../models/result.model";
import { AppointmentService } from "../services/appointment.service";
import { FriendService } from "../services/friend.service";

@Controller('v1/friends')
export class FriendController {
    constructor(private readonly friendService: FriendService) {
    }

    @Post(':telephone')
    //@UseInterceptors(new ValidatorInterceptor(new CreateAppointmentContract()))
    async postAppointment(@Param('telephone') telephone, @Body() model: string) {
    }
}