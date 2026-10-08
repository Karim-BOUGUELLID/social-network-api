import express from 'express';
import Ticket from '../models/ticket.mjs';
import TicketType from '../models/ticketType.mjs';
import Event from '../models/event.mjs';

const router = express.Router();

// CREATE - acheter un billet
router.post('/', async (req, res) => {
    try {
        const {
            ticketType,
            firstName,
            lastName,
            address
        } = req.body;

        // Vérifier le type de billet
        const existingTicketType = await TicketType.findById(ticketType);

        if (!existingTicketType) {
            return res.status(404).json({
                message: 'Type de billet introuvable'
            });
        }

        // Vérifier l'événement
        const event = await Event.findById(existingTicketType.event);

        if (!event) {
            return res.status(404).json({
                message: 'Événement introuvable'
            });
        }

        // Seuls les événements publics peuvent avoir une billetterie
        if (event.visibility !== 'public') {
            return res.status(403).json({
                message: 'La billetterie est uniquement disponible pour les événements publics'
            });
        }

        // Vérifier qu'il reste des billets
        if (existingTicketType.quantity <= 0) {
            return res.status(409).json({
                message: 'Ce type de billet est épuisé'
            });
        }

        // Vérifier si cette personne possède déjà un billet pour cet événement
        const existingTickets = await Ticket.find({
            firstName,
            lastName,
            ticketType: {
                $in: await TicketType.find({
                    event: existingTicketType.event
                }).distinct('_id')
            }
        });

        if (existingTickets.length > 0) {
            return res.status(409).json({
                message: 'Cette personne possède déjà un billet pour cet événement'
            });
        }

        // Créer le billet
        const ticket = new Ticket({
            ticketType,
            firstName,
            lastName,
            address
        });

        const savedTicket = await ticket.save();

        // Diminuer la quantité disponible
        existingTicketType.quantity -= 1;
        await existingTicketType.save();

        res.status(201).json(savedTicket);

    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de l’achat du billet',
            error: error.message
        });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();

        res.status(200).json(tickets);

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des billets',
            error: error.message
        });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                message: 'Billet introuvable'
            });
        }

        res.status(200).json(ticket);

    } catch (error) {
        res.status(400).json({
            message: 'ID billet invalide',
            error: error.message
        });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!ticket) {
            return res.status(404).json({
                message: 'Billet introuvable'
            });
        }

        res.status(200).json(ticket);

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
        const ticket = await Ticket.findByIdAndDelete(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                message: 'Billet introuvable'
            });
        }

        res.status(200).json({
            message: 'Billet supprimé'
        });

    } catch (error) {
        res.status(400).json({
            message: 'ID billet invalide',
            error: error.message
        });
    }
});

export default router;