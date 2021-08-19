const express = require('express')
const app = express()
const pool = require('./db')

app.use(express.json()) // => res.body

//ROUTES//

/**
 * Getting all the word types
 */
app.get('/wordTypes', async (req, res) => {
  try {
    const wordTypes = await pool.query('SELECT * FROM types')

    res.json(wordTypes.rows)
  } catch (error) {
    console.error(error.message)
  }
})

/**
 * Getthing all words by word type id
 *
 * @param id - is the word type id
 */
app.get('/words/:id', async (req, res) => {
  const { id } = req.params

  try {
    const words = await pool.query('SELECT * FROM words WHERE fk_type_id = $1', [id])

    res.json(words.rows)
  } catch (error) {
    console.error(error.message)
  }
})

app.listen(8000, () => {
  console.log('Server is listening on port 8000')
})
