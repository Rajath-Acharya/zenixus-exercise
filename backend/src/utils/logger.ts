import pino from 'pino';
import dayjs from 'dayjs';

const logger = pino({
	base: {
		pid: false,
	},
	transport: {
		target: 'pino-pretty',
		options: {
			ignore: 'pid.hostname'
		}
	},
	timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;