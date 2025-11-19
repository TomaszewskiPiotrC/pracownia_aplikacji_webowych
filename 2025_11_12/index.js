const express = require('express')
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const app = express()

app.listen(3000, () => {
  console.log('App is running on https://localhost:3000')
})
