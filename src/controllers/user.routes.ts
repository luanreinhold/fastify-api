import { FastifyInstance } from 'fastify';
import { createUser, getAllUsers, authenticateUser } from './user-controller';

export async function userRoutes (app: FastifyInstance) {
    app.get('/', getAllUsers)
    app.post('/auth', authenticateUser);
    app.post('/register', createUser)
}