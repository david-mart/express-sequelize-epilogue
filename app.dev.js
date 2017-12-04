/* eslint-disable no-console */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import config from './utilities/config';
import webpackConfiguration from '../webpack.config.dev';
import router from './routes';
import database from './utilities/database';
import epilogue from 'epilogue';
import { setResources } from './utilities/resources';

const { port } = config;

const application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use(cookieParser());

const applicationCompiler = webpack(webpackConfiguration);
application.use(
  require('webpack-dev-middleware')(applicationCompiler, {
    noInfo: true,
    publicPath: webpackConfiguration.output.publicPath
  })
);

application.use(require('webpack-hot-middleware')(applicationCompiler));

application.use('/api', router);

application.use('/client', express.static(path.join(__dirname, '../client')));

epilogue.initialize({
  app: application,
  sequelize: database
});

setResources(application);

// Handle all calls to the /api route that do not have a resource behind it
application.all('/api/*', (request, response) => {
  response.status(404).send('Not found');
});

application.get('*', (request, response) => {
  const fileName = path.join(applicationCompiler.outputPath, 'index.html');
  applicationCompiler.outputFileSystem.readFile(fileName, (error, result) => {
    response.set('content-type', 'text/html');
    response.send(result);
    response.end();
  });
});

database.sync().then(() => {
  application.listen(port, async error => {
    if (error) {
      console.error(error);
    }
    console.info(`Serving API from http://localhost:${port}`);
  });
});

export default application;
