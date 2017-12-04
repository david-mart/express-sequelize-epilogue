import { User, Status } from '../utilities/database';

export default (database, { STRING, INTEGER, DATE, TEXT }) =>
  database.define('proposal', {
    name: STRING,
    createdBy: {
      type: INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    statusId: {
      type: INTEGER,
      defaultValue: 1,
      references: {
        model: Status,
        key: 'id'
      }
    },
    dueDate: DATE,
    notes: TEXT,
    settings: INTEGER
  });
