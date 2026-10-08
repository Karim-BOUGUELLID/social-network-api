import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    ticketType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TicketType',
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;