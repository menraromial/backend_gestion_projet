#Generate prisma project
npx prisma init --datasource-provider postgresql
#Migrate
npx prisma migrate dev --name user-entity --create-only
#Create tables in db
npx prisma db push

# backend_gestion_projet
