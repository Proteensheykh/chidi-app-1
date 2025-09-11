import { prisma } from './config/database';
import { Logger } from './shared/utils';

async function testConnection() {
  try {
    // Test query to check connection
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    Logger.info('✅ Database connection successful', result);
    return true;
  } catch (error) {
    Logger.error('❌ Database connection failed', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection()
  .then((success) => {
    if (!success) {
      process.exit(1);
    }
  })
  .catch((error) => {
    Logger.error('Unexpected error', error);
    process.exit(1);
  });
