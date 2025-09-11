import { PrismaClient } from '@prisma/client';
import { Logger } from '@/shared/utils';

declare global {
  var __prisma: PrismaClient | undefined;
}

class DatabaseConnection {
  private static instance: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!DatabaseConnection.instance) {
      if (process.env.NODE_ENV === 'production') {
        DatabaseConnection.instance = new PrismaClient();
      } else {
        // In development, use a global variable to prevent multiple instances
        if (!global.__prisma) {
          global.__prisma = new PrismaClient({
            log: ['query', 'error', 'warn'],
          });
        }
        DatabaseConnection.instance = global.__prisma;
      }

      // Handle connection events
      DatabaseConnection.instance.$connect()
        .then(() => {
          Logger.info('Database connected successfully');
        })
        .catch((error) => {
          Logger.error('Database connection failed', error);
          process.exit(1);
        });
    }

    return DatabaseConnection.instance;
  }

  public static async disconnect(): Promise<void> {
    if (DatabaseConnection.instance) {
      await DatabaseConnection.instance.$disconnect();
      Logger.info('Database disconnected');
    }
  }
}

export const prisma = DatabaseConnection.getInstance();
export default DatabaseConnection;
