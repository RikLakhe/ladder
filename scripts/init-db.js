const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function initDb() {
  const sql = fs.readFileSync(path.join(__dirname, '..', 'migrations', '0001_init.sql'), 'utf8');
  const client = new Client({
    connectionString: process.env.DATABASE_URL ?? 'postgres://ladder:ladder@localhost:55432/ladder'
  });

  await client.connect();
  try {
    await client.query(sql);
    console.log('Database initialized');
  } finally {
    await client.end();
  }
}

initDb().catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});
