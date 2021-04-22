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
        title: {
            type: String,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    workAddress: {
        title: {
            type: String,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    recents: [
        {
            title: {
                type: String,
            },
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            },
        },
    ],
    favorites: [
        {
            title: {
                type: String,
            },
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            },
        },
    ],
    appointments: [
        {
            description: {
                type: String,
            },
            title: {
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
    friends: [
        {
            name: {
                type: String,
            },
            telephone: {
                type: String,
            },
        },
    ],
    userAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAccount',
        required: true,
    }
})