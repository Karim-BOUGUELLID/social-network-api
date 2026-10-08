import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }
});

const Album = mongoose.model('Album', albumSchema);

export default Album;