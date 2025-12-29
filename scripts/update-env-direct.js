const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
// Password encoded
const passwordEncoded = 'FU9x22%40$nV.V*Ny';
const projectRef = 'wjllcfpwvbxazssfilxn'; // Extracted from user URL

// Pooler URL (Host: aws-1...pooler, Port: 6543) - For Application queries
const poolerUrl = `postgresql://postgres.${projectRef}:${passwordEncoded}@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`;

// Direct URL (Host: db...supabase.co, Port: 5432) - For Migrations
const directUrl = `postgresql://postgres:${passwordEncoded}@db.${projectRef}.supabase.co:5432/postgres`;

const content = `DATABASE_URL="${poolerUrl}"\nDIRECT_URL="${directUrl}"\nNEXTAUTH_SECRET="demos3cr3tkey"`;

fs.writeFileSync(envPath, content);
console.log('Updated .env with DIRECT_URL successfully');
