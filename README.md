## requirements
- npm >= 6
- node >= 14

## using ace
node ace --help

## postgres
sudo find / -name "pg_hba.conf"
sudo su
psql -U postgres
ALTER USER {postgres} PASSWORD '{password}';
CREATE DATABASE {database};
\connect {database}
CREATE ROLE {user} WITH LOGIN PASSWORD '{password}';
