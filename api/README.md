
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
DATABASE_URL="mysql://root:GpUzjYbMakwnNjNLnNMmZvgwIXnoFPDl@viaduct.proxy.rlwy.net:32432/railway"
JWT_SECRET=47a8ec4d8752b9be493521b340f0aa2b847b8bd51d0a051c925ff1fe768dfc79
NODE_ENV=development

EMAIL_HOST=smtp.gmail.com
EMAIL_PASSWORD=contraseñaDeApp
EMAIL_USER=Correo del que envia
JWT_EXPIRATION=1h
```
### Generate JWT_SECRET 
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
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

