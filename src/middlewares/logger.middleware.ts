import morgan from 'morgan';

const logger = morgan(
  ':: Calling ":method" on ":url" returns {status: [:status], content: :res[content-length]} [finished in :response-time ms]'
);

export default logger;
