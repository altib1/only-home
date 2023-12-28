## Project setup
This app contains both the backend and the frontend in a single repository.
```	
├── Readme.md
├── backend
├── docker-compose.yml
└── frontend
```

### Clone Repository

```bash
git clone https://github.com/altib1/only-home.git

```
Create the .env file on the backend directory

```bash
$ cd backend
$ touch .env
```
Add the following variables to the .env file

```bash
DATABASE_URL="postgresql://onlyhome:onlyhome@database:5432/onlyhome?schema=public"
```

Navigate to the root directory.

```bash
$ cd Onlyhome
```
### Start app containers

Start the `frontend`, `backend` and `db` containers using docker-compose

```	bash
$ docker-compose up
```

Then you should migrate the prisma schema to the database
To do this you need to access the backend container and use this command

```	bash
$ npx prisma db push
```

Access the app from your browser at http://localhost:8080


### Acces the pg container

To acces the database management application you need to got to http://localhost:5555/
username: pgadmin4@pgadmin.org
password: admin

Afteraccesing the application you need to add a new server with the following credentials
```
host: database
port: 5432
username: onlyhome
password: onlyhome
```

### Known errors : 

if database exits with this error : 
```
FATAL:  could not open directory "pg_notify": No such file or directory
```

Then comment this lines on docker-compose.yml on the backend container : 
```
   # volumes:
   #   - ./database:/var/lib/postgresql/data:rw
```

### Correcting the code from eslint errors and warnings to keep the code clean : 

```
cd frontend
npm run lint -- --fix
```

