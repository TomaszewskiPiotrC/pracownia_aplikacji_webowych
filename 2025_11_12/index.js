const express = require('express')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express()

app.listen(3000, () => {
  console.log('App is running on https://localhost:3000')
})
