require('dotenv').config()
// import dotenv from 'dotenv'
// dotenv.config()
// import express from 'express'
const express = require('express')
const app = express()
// import path from 'path'
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
// console.log((path.join(__dirname, '../build')))

app.use(express.json())
// import cors from 'cors'
const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  res.json(res)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 8080 || 3001
// app.listen(PORT, "0.0.0.0")
app.listen(PORT, () => {
  // console.log('Server running on port 3001')
})