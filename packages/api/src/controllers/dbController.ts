import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

// TODO: Make this class and add functionality for some queries.

const db = new JsonDB(new Config('db/db.json', true, false, '/'));

export default db;
