import express from 'express';
import Event from '../models/event.mjs';
import Group from '../models/group.mjs';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    try {
        const event = new Event(req.body);
        const savedEvent = await event.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la création de l’événement',
            error: error.message
        });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des événements',
            error: error.message
        });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: 'Événement introuvable'
            });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({
            message: 'ID événement invalide',
            error: error.message
        });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!event) {
            return res.status(404).json({
                message: 'Événement introuvable'
            });
        }

        res.status(200).json(event);
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
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: 'Événement introuvable'
            });
        }

        res.status(200).json({
            message: 'Événement supprimé'
        });
    } catch (error) {
        res.status(400).json({
            message: 'ID événement invalide',
            error: error.message
        });
    }
});

// CRÉER UN ÉVÉNEMENT DEPUIS UN GROUPE
router.post('/from-group/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params;
        const { creator } = req.body;

        // Vérifier le groupe
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({
                message: 'Groupe introuvable'
            });
        }

        // Vérifier que le créateur est membre du groupe
        const isMember = group.members.some(
            member => member.toString() === creator
        );

        if (!isMember) {
            return res.status(403).json({
                message: 'Seuls les membres du groupe peuvent créer un événement'
            });
        }

        // Vérifier la permission
        if (!group.membersCanCreateEvents) {
            return res.status(403).json({
                message: 'Les membres ne sont pas autorisés à créer des événements dans ce groupe'
            });
        }

        // Créer l'événement
        const event = new Event({
            ...req.body,
            organizers: [creator],
            participants: group.members
        });

        const savedEvent = await event.save();

        res.status(201).json(savedEvent);

    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la création de l’événement',
            error: error.message
        });
    }
});

export default router;