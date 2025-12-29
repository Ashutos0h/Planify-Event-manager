const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
// Password: FU9x22@$nV.V*Ny
// We encode only the @ to %40
const connectionString = 'postgresql://postgres.wjllcfpwvbxazssfilxn:FU9x22%40$nV.V*Ny@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1';

const content = `DATABASE_URL="${connectionString}"\nNEXTAUTH_SECRET="demos3cr3tkey"`;

fs.writeFileSync(envPath, content);
console.log('Updated .env successfully');
