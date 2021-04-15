import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Appointment } from "../models/appointment.model";
import { Result } from "../models/result.model";
import { AppointmentService } from "../services/appointment.service";

@Controller('v1/appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {
    }

    @Post(':telephone')
    //@UseInterceptors(new ValidatorInterceptor(new CreateAppointmentContract()))
    async postAppointment(@Param('telephone') telephone, @Body() model: Appointment) {
        try {
            await this.appointmentService.createAppointment(telephone, model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException
                (new Result('Não foi possivel realizar o cadastro da mensagem', false, null, error),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':telephone/:id')
    //@UseInterceptors(new ValidatorInterceptor(new CreateAppointmentContract()))
    async putAppointment(@Param('telephone') telephone, @Param('id') id, @Body() model: Appointment) {
        try {
            await this.appointmentService.updateAppointment(telephone, id, model);
            return new Result(null, true, model, null);
        } catch (error) {
            (new Result('Não foi possivel atualizar a mensagem', false, null, error),
            HttpStatus.BAD_REQUEST);
        }
    }
}