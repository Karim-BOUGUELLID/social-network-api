import express from 'express';
import TicketType from '../models/ticketType.mjs';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    try {
        const ticketType = new TicketType(req.body);
        const savedTicketType = await ticketType.save();

        res.status(201).json(savedTicketType);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la création du type de billet',
            error: error.message
        });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const ticketTypes = await TicketType.find();

        res.status(200).json(ticketTypes);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des types de billets',
            error: error.message
        });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const ticketType = await TicketType.findById(req.params.id);

        if (!ticketType) {
            return res.status(404).json({
                message: 'Type de billet introuvable'
            });
        }

        res.status(200).json(ticketType);
    } catch (error) {
        res.status(400).json({
            message: 'ID type de billet invalide',
            error: error.message
        });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const ticketType = await TicketType.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!ticketType) {
            return res.status(404).json({
                message: 'Type de billet introuvable'
            });
        }

        res.status(200).json(ticketType);
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
        const ticketType = await TicketType.findByIdAndDelete(req.params.id);

        if (!ticketType) {
            return res.status(404).json({
                message: 'Type de billet introuvable'
            });
        }

        res.status(200).json({
            message: 'Type de billet supprimé'
        });
    } catch (error) {
        res.status(400).json({
            message: 'ID type de billet invalide',
            error: error.message
        });
    }
});

export default router;