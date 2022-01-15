## requirements
- npm >= 6
- node >= 14

## steps
1. Create a database, one user and one password (for database).
2. Connect and test the connection of database created (using an IDE, like DBeaver).
3. Set the envinments variables in the .env file (see the .env.example)
4. Switch to node version 14 (using ```nvm use 14```)
5. Install all dependencies with ```yarn```
6. Override changes in your database running ```node ace migration:run```
7. Run you server with ```yarn dev```
8. Create a user requesting to the enpoint 'UsersController.create' (using an IDE, like Postman)
9. Uncomment the line 40 of routes.ts (`.middleware('auth')`) to test the other enpoints (like `/login`). 
All authenticated requests will need the token returned on the login response on Bearer Token format, on the header of the request.

## postgres
```sudo find / -name "pg_hba.conf"```

```sudo su```

```psql -U postgres```

```ALTER USER {postgres} PASSWORD '{password}';```

```CREATE DATABASE {database};```

```\connect {database}```

```CREATE ROLE {user} WITH LOGIN PASSWORD '{password}';```

