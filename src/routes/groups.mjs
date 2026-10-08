import express from 'express';
import Group from '../models/group.mjs';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    try {
        const group = new Group(req.body);
        const savedGroup = await group.save();

        res.status(201).json(savedGroup);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la création du groupe',
            error: error.message
        });
    }
});

// READ ALL
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find();

        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des groupes',
            error: error.message
        });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({
                message: 'Groupe introuvable'
            });
        }

        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({
            message: 'ID groupe invalide',
            error: error.message
        });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!group) {
            return res.status(404).json({
                message: 'Groupe introuvable'
            });
        }

        res.status(200).json(group);
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
        const group = await Group.findByIdAndDelete(req.params.id);

        if (!group) {
            return res.status(404).json({
                message: 'Groupe introuvable'
            });
        }

        res.status(200).json({
            message: 'Groupe supprimé'
        });
    } catch (error) {
        res.status(400).json({
            message: 'ID groupe invalide',
            error: error.message
        });
    }
});

export default router;