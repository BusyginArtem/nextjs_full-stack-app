import { MongoClient, Db, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_USER_PASSWORD}@ecommerce-db.dxler.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce-db`;

let cachedClient: MongoClient | null = null;
let cachedDB: Db | null = null;

export default async function connectToDB() {
  if (cachedClient && cachedDB) {
    return {
      client: cachedClient,
      db: cachedDB,
      message: 'DB has been connected successfully!',
    };
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  cachedDB = client.db('ecommerce-nextjs');
  cachedClient = client;

  return {
    client: cachedClient,
    db: cachedDB,
    message: 'DB is connected successfully!',
  };
}
