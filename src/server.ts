import { app } from './app';
import { AppDataSource } from './data-source';


const PORT = process.env.PORT || 3333;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });


