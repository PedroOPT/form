import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import { Appointment } from '../models/appointment.model';
import { Friend } from '../models/friend.model';


@Injectable()
export class FriendService {
    constructor(@InjectModel('User') private model: Model<UserInterface>) {
    }
    
}