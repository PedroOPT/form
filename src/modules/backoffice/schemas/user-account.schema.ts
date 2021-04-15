import * as mongoose from 'mongoose';

export const UserAccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    confirmationToken: {
        type: String,
        required: true,
        trim: true,
    },
    recoverToken: {
        type: String,
        trim: true,
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    }],
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });