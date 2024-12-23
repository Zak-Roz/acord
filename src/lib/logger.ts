import pino from 'pino';

export const logger = pino({
  level: 'info',
  transport: {
    targets: [
      { target: 'pino-pretty' },
      { target: 'pino/file', options: { destination: './logs/debug.log' } },
      { target: 'pino/file', level: 'fatal', options: { destination: './logs/fatal.log' } }
    ]
  }
});