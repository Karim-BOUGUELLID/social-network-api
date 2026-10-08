import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
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

    icon: {
        type: String
    },

    coverPhoto: {
        type: String
    },

    type: {
        type: String,
        enum: ['secret', 'private', 'public'],
        required: true
    },

    membersCanPost: {
        type: Boolean,
        default: true
    },

    membersCanCreateEvents: {
        type: Boolean,
        default: false
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    administrators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

// Au moins un membre
groupSchema.path('members').validate(function (members) {
    return members && members.length >= 1;
}, 'Un groupe doit avoir au moins un membre');

// Au moins un administrateur
groupSchema.path('administrators').validate(function (administrators) {
    return administrators && administrators.length >= 1;
}, 'Un groupe doit avoir au moins un administrateur');

const Group = mongoose.model('Group', groupSchema);

export default Group;