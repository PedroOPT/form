import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    telephone: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    homeAddress: {
        zipCode: {
            type: String,
        },
        street: {
            type: String,
        },
        number: {
            type: String,
        },
        complement: {
            type: String,
        },
        neighborhood: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    workAddress: {
        zipCode: {
            type: String,
        },
        street: {
            type: String,
        },
        number: {
            type: String,
        },
        complement: {
            type: String,
        },
        neighborhood: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    appointments: [
        {
            category: {
                type: String,
                enum: ['warning', 'alert'],
            },
            description: {
                type: String,
            },
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            }
        },
    ],
    userAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAccount',
        required: true,
    }
})