import mongoose from 'mongoose';

const ticketTypeSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    name: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const TicketType = mongoose.model('TicketType', ticketTypeSchema);

export default TicketType;