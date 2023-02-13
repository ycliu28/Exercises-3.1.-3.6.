const { response } = require('express')
const express = require('express')

const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const generateId = () => {
    let id = Math.floor(Math.random() * 1000000 + 1);
    while(persons.find(person => person.id === id)) {
        id = Math.floor(Math.random() * 1000000 + 1);
    }
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })    
    }
    else if(persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        }) 
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    console.log(person)
    persons = persons.concat(person)

    response.json(persons)
})

app.get('/api/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>${Date()}<p><\p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT)