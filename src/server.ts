import { app } from './app';
import { AppDataSource } from './data-source';


const PORT = process.env.PORT || 3333;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected successfully');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

    process.on('SIGTERM', async () => {
      console.log('🔄 SIGTERM received, shutting down');
      server.close(() => {
        AppDataSource.destroy();
        process.exit(0);
      });
    });

  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });


