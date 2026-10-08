import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    coverPhoto: {
        type: String
    },

    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },

    organizers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Au moins un organisateur
eventSchema.path('organizers').validate(function (organizers) {
    return organizers && organizers.length >= 1;
}, 'Un événement doit avoir au moins un organisateur');

// La date de fin doit être après la date de début
eventSchema.pre('validate', function (next) {
    if (this.startDate && this.endDate && this.endDate <= this.startDate) {
        this.invalidate(
            'endDate',
            'La date de fin doit être après la date de début'
        );
    }

    next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event;