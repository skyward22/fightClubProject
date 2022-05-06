const express = require('express')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())


const {getFighter, deleteFighter, createFighter, updateFighter} = require('./controller')

//endpoints
app.get('/api/fighters', getFighter);
app.delete('/api/fighters/:id', deleteFighter);
app.post('/api/fighters', createFighter);
app.put('/api/fighters/:id', updateFighter);


app.listen(4444, () => {console.log('Better be working on port 4444')})
