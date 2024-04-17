
# Config back:

## Install node_modules packages in main api folder:
```bash
npm install
```

## Config .env in main api folder
### Create .env file:

```bash
PORT=yourPort
CLIENT_URL=empty
DATABASE_URL="mysql://user:password@localhost:port/qryptogenia"
```

## Create firts migrate in main prisma folder
```bash
npx prisma migrate dev --name init
```

## Others comands for migrate
### Create others migrations:
```bash
npx prisma migrate dev --name name_migrate
```
### Prisma generate client
```bash
npx prisma generate 
```
### Prisma studio for manage DB
```bash
npx prisma studio 
```