export default (database, { FLOAT }) =>
  database.define(
    'location',
    {
      lat: FLOAT,
      lng: FLOAT
    },
    {
      timestamps: false
    }
  );
