import express from 'express';
import PollResponse from '../models/pollResponse.mjs';
import Poll from '../models/poll.mjs';
import Event from '../models/event.mjs';

const router = express.Router();

// CREATE - répondre à un sondage
router.post('/', async (req, res) => {
    try {
        const { poll, participant, answers } = req.body;

        // Vérifier que le sondage existe
        const existingPoll = await Poll.findById(poll);

        if (!existingPoll) {
            return res.status(404).json({
                message: 'Sondage introuvable'
            });
        }

        // Vérifier que l'utilisateur existe parmi les participants de l'événement
        const event = await Event.findById(existingPoll.event);

        if (!event) {
            return res.status(404).json({
                message: 'Événement introuvable'
            });
        }

        const isParticipant = event.participants.some(
            userId => userId.toString() === participant
        );

        if (!isParticipant) {
            return res.status(403).json({
                message: 'Seuls les participants à l’événement peuvent répondre au sondage'
            });
        }

        // Vérifier qu'une seule réponse est donnée par question
        const questionIds = answers.map(answer => answer.questionId);

        if (new Set(questionIds).size !== questionIds.length) {
            return res.status(400).json({
                message: 'Une seule réponse est autorisée par question'
            });
        }

        // Vérifier que les questions et réponses appartiennent bien au sondage
        for (const answer of answers) {
            const question = existingPoll.questions.id(answer.questionId);

            if (!question) {
                return res.status(400).json({
                    message: 'Question invalide pour ce sondage'
                });
            }

            const validAnswer = question.answers.id(answer.answerId);

            if (!validAnswer) {
                return res.status(400).json({
                    message: 'Réponse invalide pour cette question'
                });
            }
        }

        // Vérifier que le participant n'a pas déjà répondu
        const existingResponse = await PollResponse.findOne({
            poll,
            participant
        });

        if (existingResponse) {
            return res.status(409).json({
                message: 'Ce participant a déjà répondu à ce sondage'
            });
        }

        const response = new PollResponse(req.body);
        const savedResponse = await response.save();

        res.status(201).json(savedResponse);

    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la réponse au sondage',
            error: error.message
        });
    }
});

// GET toutes les réponses
router.get('/', async (req, res) => {
    try {
        const responses = await PollResponse.find();

        res.status(200).json(responses);

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des réponses',
            error: error.message
        });
    }
});

// GET une réponse
router.get('/:id', async (req, res) => {
    try {
        const response = await PollResponse.findById(req.params.id);

        if (!response) {
            return res.status(404).json({
                message: 'Réponse introuvable'
            });
        }

        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({
            message: 'ID réponse invalide',
            error: error.message
        });
    }
});

// DELETE une réponse
router.delete('/:id', async (req, res) => {
    try {
        const response = await PollResponse.findByIdAndDelete(req.params.id);

        if (!response) {
            return res.status(404).json({
                message: 'Réponse introuvable'
            });
        }

        res.status(200).json({
            message: 'Réponse supprimée'
        });

    } catch (error) {
        res.status(400).json({
            message: 'ID réponse invalide',
            error: error.message
        });
    }
});

export default router;