import { User, Proposal, Location } from '../utilities/database';

export default (database, { STRING, INTEGER, TEXT }) =>
  database.define('facility', {
    name: STRING,
    createdBy: {
      type: INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    location: {
      type: INTEGER,
      references: {
        model: Location,
        key: 'id'
      }
    },
    proposal: {
      type: INTEGER,
      references: {
        model: Proposal,
        key: 'id'
      }
    },
    address: STRING,
    ownershipType: TEXT
  });
