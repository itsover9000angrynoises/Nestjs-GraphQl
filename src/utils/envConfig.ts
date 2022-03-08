

export const envConfig = {
  serverPort: process.env.SERVER_PORT,
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresUsername: process.env.POSTGRES_USERNAME,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDatabase: process.env.POSTGRES_DATABASE,
  rabbitMQURL: process.env.RABBITMQ_URL, 
  rabbitMQExchange: process.env.RABBITMQ_EXCHANGE,
  rabbitMQRoutingKey: process.env.RABBITMQ_ROUTING_KEY,
}