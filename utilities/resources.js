import epilogue from 'epilogue';
import database, { Proposal, Status, User } from './database';
import authMiddleware from './auth-middleware';

const resources = {};

export const setResources = app => {
  epilogue.initialize({
    app,
    sequelize: database
  });

  resources.proposal = epilogue.resource({
    model: Proposal,
    endpoints: ['/api/proposal', '/api/proposal/:id'],
    include: [{ model: Status }, { model: User, attributes: ['name'] }]
  });

  resources.proposal.all.auth(authMiddleware);

  resources.status = epilogue.resource({
    model: Status,
    endpoints: ['/api/status', '/api/status/:id']
  });
};

export default resources;
