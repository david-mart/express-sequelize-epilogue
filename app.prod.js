/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from './utilities/config';
import router from './routes';
import database from './utilities/database';
import epilogue from 'epilogue';
import { setResources } from './utilities/resources';

const { port } = config;

const application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use(cookieParser());

application.use('/api', router);

application.use(express.static(path.join(__dirname, '../dist-client')));

epilogue.initialize({
  app: application,
  sequelize: database
});

setResources(application);

application.all('/api/*', (request, response) => {
  response.status(404).send('Not found');
});

application.get('*', (request, response) => {
  const clientEntryPoint = path.join(__dirname, '../dist-client/index.html');
  response.sendFile(clientEntryPoint);
});

database.sync().then(
  () => {
    application.listen(port, error => {
      if (error) {
        console.error(error);
      }
      console.info(`Serving API from http://localhost:${port}`);
    });
  },
  error => console.log(error)
);

export default application;
