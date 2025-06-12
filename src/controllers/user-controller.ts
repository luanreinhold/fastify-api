import { FastifyRequest, FastifyReply } from "fastify";
import { prismaInstance } from "../prisma";
import { User } from "../generated/prisma";
// import { getAllU}

// export interface UserController {
//   getAllUsers: (request: FastifyRequest, reply: FastifyReply) => Promise<User[]>;
//   getUserById: (request: FastifyRequest, reply: FastifyReply) => Promise<User | null>;
//   createUser: (request: FastifyRequest, reply: FastifyReply) => Promise<User>;
//   updateUser: (request: FastifyRequest, reply: FastifyReply) => Promise<User | null>;
//   deleteUser: (request: FastifyRequest, reply: FastifyReply) => Promise<User | null>;
// }

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users: User[] = await prismaInstance.user.findMany();
    return reply.status(200).send(users);
  } catch (error) {
    return reply.status(500).send({ error: error });
  }
}

export async function createUser(request: any, reply: FastifyReply) {
  const { name, email } = request.body;
  console.log(name, email);
  try {
    const userResponse = await prismaInstance.user.create({
      data: {
        email,
        name,
      }
    });

    reply.status(200).send(userResponse);
  } catch (error) {
    reply.status(500).send({ error: error });
  }
}
