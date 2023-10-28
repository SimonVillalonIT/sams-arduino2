import { Sequelize } from 'sequelize';

// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize('sams', 'simon', 'password', {
  host: 'localhost',
  dialect: "mariadb",
  define: {
    underscored: true,
    freezeTableName: true
  }
});

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default db
