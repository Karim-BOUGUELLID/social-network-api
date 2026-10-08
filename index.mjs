import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './src/routes/users.mjs';
import eventRoutes from './src/routes/events.mjs';
import groupRoutes from './src/routes/groups.mjs';
import threadRoutes from './src/routes/threads.mjs';
import albumRoutes from './src/routes/albums.mjs';
import photoRoutes from './src/routes/photos.mjs';
import pollRoutes from './src/routes/polls.mjs';
import ticketTypeRoutes from './src/routes/ticketTypes.mjs';
import ticketRoutes from './src/routes/tickets.mjs';
import pollResponseRoutes from './src/routes/pollResponses.mjs';

const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'Social Network API fonctionne !'
    });
});

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/groups', groupRoutes);
app.use('/threads', threadRoutes);
app.use('/albums', albumRoutes);
app.use('/photos', photoRoutes);
app.use('/polls', pollRoutes);
app.use('/ticket-types', ticketTypeRoutes);
app.use('/tickets', ticketRoutes);
app.use('/poll-responses', pollResponseRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connecté');

        app.listen(PORT, () => {
            console.log(`Serveur lancé sur le port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erreur MongoDB :', error.message);
    });