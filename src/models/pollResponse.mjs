import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    answerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const pollResponseSchema = new mongoose.Schema({
    poll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    },

    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    answers: {
        type: [answerSchema],
        required: true,
        validate: {
            validator: function (answers) {
                return answers.length >= 1;
            },
            message: 'Une réponse doit contenir au moins une réponse à une question'
        }
    }
});

const PollResponse = mongoose.model('PollResponse', pollResponseSchema);

export default PollResponse;