import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelizeConnection from "./db/config";
import logger from "./utils/logger";
import AuthRouter from './routes/auth.routes';
import UserRoute from './routes/user.routes';
import PersonalDetails from './routes/personal-details.routes';

dotenv.config();

const app = express();

const PORT = 4000;

app.use(cors());

app.use(express.json());

app.use('/api/v1/', AuthRouter);
app.use('/api/v1/', UserRoute);
app.use('/api/v1/', PersonalDetails);


function listen() {
  app.listen(PORT, async () => {
    logger.info(`Server is listening on ${PORT}`);
		try {
			await sequelizeConnection.authenticate();
			await sequelizeConnection.sync();
			logger.info('DB connected');
		} catch(error) {
			logger.error('Failed to connect database');
		}	
  });
}

listen();