import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },

    answers: {
        type: [answerSchema],
        required: true,
        validate: {
            validator: function (answers) {
                return answers.length >= 2;
            },
            message: 'Une question doit avoir au moins 2 réponses'
        }
    }
});

const pollSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    questions: {
        type: [questionSchema],
        required: true,
        validate: {
            validator: function (questions) {
                return questions.length >= 1;
            },
            message: 'Un sondage doit avoir au moins une question'
        }
    }
});

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;