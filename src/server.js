import express from 'express'

let app = express()

app.get('/', (req,res) => {
  res.send('Server is up.')
})

export default function exp(){
  app.listen(3000)
}