import express from 'express';
import Poll from '../models/poll.mjs';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    try {
        const poll = new Poll(req.body);
        const savedPoll = await poll.save();

        res.status(201).json(savedPoll);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la création du sondage',
            error: error.message
        });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const polls = await Poll.find();

        res.status(200).json(polls);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des sondages',
            error: error.message
        });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);

        if (!poll) {
            return res.status(404).json({
                message: 'Sondage introuvable'
            });
        }

        res.status(200).json(poll);
    } catch (error) {
        res.status(400).json({
            message: 'ID sondage invalide',
            error: error.message
        });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const poll = await Poll.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!poll) {
            return res.status(404).json({
                message: 'Sondage introuvable'
            });
        }

        res.status(200).json(poll);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la modification',
            error: error.message
        });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const poll = await Poll.findByIdAndDelete(req.params.id);

        if (!poll) {
            return res.status(404).json({
                message: 'Sondage introuvable'
            });
        }

        res.status(200).json({
            message: 'Sondage supprimé'
        });
    } catch (error) {
        res.status(400).json({
            message: 'ID sondage invalide',
            error: error.message
        });
    }
});

export default router;