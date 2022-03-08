## NESTJS GraphQl project 
# Setup 
1) clone the repo
2) run npm install
3) install postgres and rabbitmq via docker
   (docker pull postgres)
   (docker pull rabbitmq)
4) run postgres and docker
   (docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres)
   (docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 -p 5672:5672 rabbitmq:3-management)
   this runs & exposes the ports 
5) copy .env.example to .env
6) fill the env variables 
7) run npm run start

