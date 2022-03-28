import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Reuse the client when development server restarts
  if (!global.dbClient) {
    global.dbClient = new PrismaClient();
  }
  prisma = global.dbClient;
  prisma.$connect();
}

export { prisma };
