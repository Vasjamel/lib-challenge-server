const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')

const typeDefs = require('./src/Schema/TypeDefs')
const resolvers = require('./src/Schema/Resolvers')

const startServer = async () => {
  const app = express()
  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()
  server.applyMiddleware({ app })

  await mongoose.connect('mongodb://127.0.0.1:27017/lib-challenge')

  app.listen({ port: process.env.PORT || 3001 }, () => {
    console.log('SERVER IS RUNNING ON PORT 3001')
  })
}

startServer()
