export default (database, { STRING }) =>
  database.define(
    'status',
    {
      name: STRING
    },
    {
      timestamps: false
    }
  );
