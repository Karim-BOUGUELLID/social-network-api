import express from 'express';
import Album from '../models/album.mjs';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    try {
        const album = new Album(req.body);
        const savedAlbum = await album.save();

        res.status(201).json(savedAlbum);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la création de l’album',
            error: error.message
        });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find();

        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des albums',
            error: error.message
        });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).json({
                message: 'Album introuvable'
            });
        }

        res.status(200).json(album);
    } catch (error) {
        res.status(400).json({
            message: 'ID album invalide',
            error: error.message
        });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const album = await Album.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!album) {
            return res.status(404).json({
                message: 'Album introuvable'
            });
        }

        res.status(200).json(album);
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
        const album = await Album.findByIdAndDelete(req.params.id);

        if (!album) {
            return res.status(404).json({
                message: 'Album introuvable'
            });
        }

        res.status(200).json({
            message: 'Album supprimé'
        });
    } catch (error) {
        res.status(400).json({
            message: 'ID album invalide',
            error: error.message
        });
    }
});

export default router;