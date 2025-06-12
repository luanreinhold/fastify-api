import { FastifyInstance } from 'fastify';
import { createUser, getAllUsers } from './user-controller';

export async function userRoutes (app: FastifyInstance) {
    app.get('/users', getAllUsers)
    app.post('/user', createUser)
}