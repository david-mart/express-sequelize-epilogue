const User = (database, { STRING, INTEGER }) =>
  database.define(
    'user',
    {
      name: STRING,
      email: STRING,
      picture: STRING,
      permissions: { type: INTEGER, defaultValue: 0 }
    }
  );

export default User;
