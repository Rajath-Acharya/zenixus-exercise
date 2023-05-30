import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelizeConnection from "./db/config";
import logger from "./utils/logger";
import AuthRouter from './routes/auth.routes';

dotenv.config();

const app = express();

const PORT = 4000;

app.use(cors());

app.use(express.json());

app.use('/api/v1/', AuthRouter);

async function connectDatabase() {
	try {
		await sequelizeConnection.sync();
		logger.info('DB connected');
	} catch(error) {
		logger.error('Failed to connect database');
	}
}

function listen() {
  app.listen(PORT, () => {
    logger.info(`Server is listening on ${PORT}`);
  });
}

async function startServer() {
  await connectDatabase();
  listen();
}

startServer();