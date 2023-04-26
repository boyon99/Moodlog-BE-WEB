import { DataSource } from 'typeorm'
require('dotenv').config()

export const myDataBase = new DataSource({
  type: 'mysql',
  host: process.env.AWS_DB_ENDPOINT,
  port: 3306,
  username: 'admin',
  password: process.env.AWS_DB_PASSWORD,
  database: 'moodlog',
  entities: [process.env.NODE_ENV === 'production' ? 'dist/entity/*.js' : 'src/entity/*.ts'],
  logging: true,
  synchronize: true,
})
