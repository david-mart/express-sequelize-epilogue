/* eslint-disable no-console */
import Sequelize from 'sequelize';
import config from './config';

const connection = config.databaseConnection;

const sequelize = new Sequelize(connection);

export const User = sequelize.import('../models/user.js');
export const Status = sequelize.import('../models/status.js');
export const Proposal = sequelize.import('../models/proposal.js');
export const Location = sequelize.import('../models/location.js');
export const Facility = sequelize.import('../models/facility.js');

Status.hasMany(Proposal, { foreignKey: 'statusId' });
Proposal.belongsTo(Status, { foreignKey: 'statusId' });
User.hasMany(Proposal, { foreignKey: 'createdBy' });
Proposal.belongsTo(User, { foreignKey: 'createdBy' });

export default sequelize;
