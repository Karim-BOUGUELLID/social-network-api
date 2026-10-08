import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    content: {
        type: String,
        required: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const threadSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },

    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },

    messages: {
        type: [messageSchema],
        default: []
    }
});

// Un thread doit être lié à un groupe OU à un événement
threadSchema.pre('validate', function (next) {
    const hasGroup = !!this.groupId;
    const hasEvent = !!this.eventId;

    if ((hasGroup && hasEvent) || (!hasGroup && !hasEvent)) {
        this.invalidate(
            'groupId',
            'Un thread doit être lié à un groupe OU à un événement'
        );
    }

    next();
});

const Thread = mongoose.model('Thread', threadSchema);

export default Thread;