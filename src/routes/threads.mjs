import express from 'express';
import Thread from '../models/thread.mjs';
import Group from '../models/group.mjs';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    try {
        const { groupId, eventId } = req.body;

        // Un thread doit être lié à un groupe OU un événement
        if ((!groupId && !eventId) || (groupId && eventId)) {
            return res.status(400).json({
                message: 'Un thread doit être lié à un groupe OU à un événement'
            });
        }

        const thread = new Thread(req.body);
        const savedThread = await thread.save();

        res.status(201).json(savedThread);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la création du thread',
            error: error.message
        });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const threads = await Thread.find();

        res.status(200).json(threads);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des threads',
            error: error.message
        });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.id);

        if (!thread) {
            return res.status(404).json({
                message: 'Thread introuvable'
            });
        }

        res.status(200).json(thread);
    } catch (error) {
        res.status(400).json({
            message: 'ID thread invalide',
            error: error.message
        });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const thread = await Thread.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!thread) {
            return res.status(404).json({
                message: 'Thread introuvable'
            });
        }

        res.status(200).json(thread);
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
        const thread = await Thread.findByIdAndDelete(req.params.id);

        if (!thread) {
            return res.status(404).json({
                message: 'Thread introuvable'
            });
        }

        res.status(200).json({
            message: 'Thread supprimé'
        });
    } catch (error) {
        res.status(400).json({
            message: 'ID thread invalide',
            error: error.message
        });
    }
});

// AJOUTER UN MESSAGE DANS UN THREAD DE GROUPE
router.post('/:id/messages', async (req, res) => {
    try {
        const { author, content } = req.body;

        // Récupérer le thread
        const thread = await Thread.findById(req.params.id);

        if (!thread) {
            return res.status(404).json({
                message: 'Thread introuvable'
            });
        }

        // Cette route concerne uniquement les threads de groupe
        if (!thread.groupId) {
            return res.status(400).json({
                message: 'Ce thread n’est pas lié à un groupe'
            });
        }

        // Récupérer le groupe
        const group = await Group.findById(thread.groupId);

        if (!group) {
            return res.status(404).json({
                message: 'Groupe introuvable'
            });
        }

        // Vérifier que l'utilisateur est membre
        const isMember = group.members.some(
            member => member.toString() === author
        );

        if (!isMember) {
            return res.status(403).json({
                message: 'Seuls les membres du groupe peuvent publier'
            });
        }

        // Vérifier la permission de publication
        if (!group.membersCanPost) {
            return res.status(403).json({
                message: 'Les membres ne sont pas autorisés à publier dans ce groupe'
            });
        }

        // Ajouter le message
        thread.messages.push({
            author,
            content
        });

        const savedThread = await thread.save();

        res.status(201).json(savedThread);

    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de l’ajout du message',
            error: error.message
        });
    }
});

export default router;