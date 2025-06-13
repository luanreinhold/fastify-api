import { FastifyRequest, FastifyReply } from "fastify";
import crypt from "bcryptjs";;
import { prismaInstance } from "../prisma";
import { User } from "../generated/prisma";


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

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
  const bodyRequest = request.body as { email: string; password: string };

  const { email, password } = bodyRequest;

  try {
    const user = await prismaInstance.user.findUnique({
      where: { email }
    });

    if (!user) return reply.status(404).send({ error: "User not found" });
    const isPasswordValid = await crypt.compare(password, user.password);

    if (!isPasswordValid) return reply.status(401).send({ error: "Authentication failed, user not valid." });
    
    return reply.status(200).send({ message: "Authentication successful" });
  } catch (error) {
    return reply.status(500).send({ error: error });
  }
}


export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const bodyRequest = request.body as { name: string; email: string; password: string };
  const { name, email, password } = bodyRequest;
  if(!name || !email || !password) {
    return reply.status(400).send({ error: "Name, email, and password are required." });
  }
  try {
    const passwordHashed: string = await crypt.hash(password, 8);
    const userResponse = await prismaInstance.user.create({
      data: {
        email,
        name,
        password: passwordHashed
      }
    });

    reply.status(200).send(userResponse);
  } catch (error) {
    reply.status(500).send({ error: error });
  }
}
