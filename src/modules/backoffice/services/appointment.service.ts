import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import { Appointment } from '../models/appointment.model';


@Injectable()
export class AppointmentService {
    constructor(@InjectModel('User') private model: Model<UserInterface>) {
    }

    async createAppointment(telephone: string, data: Appointment): Promise<UserInterface> {
        const options = { upsert: true, new: true };
        return await this.model.findOneAndUpdate({ telephone }, {
            $push: {
                appointments: data,
            },
        }, options);
    }

    async updateAppointment(telephone: string, id: string, data: Appointment): Promise<UserInterface> {
        return await this.model.findOneAndUpdate({ telephone, 'appointments._id': id }, {
            $set: {
                'appointments.$': data,
            }
        });
    }
}