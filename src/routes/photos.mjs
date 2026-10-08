import express from 'express';
import Photo from '../models/photo.mjs';
import Album from '../models/album.mjs';
import Event from '../models/event.mjs';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    try {
        const { album, author } = req.body;

        // Récupérer l'album
        const existingAlbum = await Album.findById(album);

        if (!existingAlbum) {
            return res.status(404).json({
                message: 'Album introuvable'
            });
        }

        // Récupérer l'événement associé à l'album
        const event = await Event.findById(existingAlbum.event);

        if (!event) {
            return res.status(404).json({
                message: 'Événement associé à l’album introuvable'
            });
        }

        // Vérifier que l'auteur participe à l'événement
        const isParticipant = event.participants.some(
            participant => participant.toString() === author
        );

        if (!isParticipant) {
            return res.status(403).json({
                message: 'Seuls les participants à l’événement peuvent ajouter une photo'
            });
        }

        const photo = new Photo(req.body);
        const savedPhoto = await photo.save();

        res.status(201).json(savedPhoto);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la création de la photo',
            error: error.message
        });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();

        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des photos',
            error: error.message
        });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        if (!photo) {
            return res.status(404).json({
                message: 'Photo introuvable'
            });
        }

        res.status(200).json(photo);
    } catch (error) {
        res.status(400).json({
            message: 'ID photo invalide',
            error: error.message
        });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const photo = await Photo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!photo) {
            return res.status(404).json({
                message: 'Photo introuvable'
            });
        }

        res.status(200).json(photo);
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
        const photo = await Photo.findByIdAndDelete(req.params.id);

        if (!photo) {
            return res.status(404).json({
                message: 'Photo introuvable'
            });
        }

        res.status(200).json({
            message: 'Photo supprimée'
        });
    } catch (error) {
        res.status(400).json({
            message: 'ID photo invalide',
            error: error.message
        });
    }
});

export default router;