const { Router } = require('express')
require('dotenv').config()
const mysql = require('mysql2')
mongoose = require('mongoose')


´//Conexão SQL
const connectionSQL = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})



const User = mongoose.model('User', {
  email: String,
  password: String
})

const injectionsRoutes = Router()

injectionsRoutes.post('/sql-injection', (req, res)=>{
  const { email, password } = req.body


  //Separamos os payloads com o placeholder ? para evitar que códigos maliciosos sejam concatenados diretamente na consulta
  connectionSQL.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.json(result)
  })

})  


injectionsRoutes.post('/nosql-command-injection', async (req, res) => {
  const { email, password } = req.body

  // Verifica se a entrada de email e senha estão presentes e não estão vazias
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  // Verifica se a entrada de email é uma string válida
  if (typeof email !== 'string' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    const user = await User.findOne({ email, password })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})  

module.exports = injectionsRoutes