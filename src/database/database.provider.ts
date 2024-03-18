import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import * as entities from '../all-entitites';
dotenv.config({
  path: '.env',
});
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
      });
      sequelize.addModels([...Object.values(entities)]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
