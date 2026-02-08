const express = require(`express`)
const cors = require(`cors`)
const app = express()

app.use(cors())
app.use(express.json())

let users = [
    { id: 1, name: "ali", email: "ali@gmail.com"},
    { id: 2, name: "sara", email: "sara@gmail.com"},
    { id: 3, name: "john", email: "john@gmail.com"}
]

let nextId = 4

app.post(`/users`, (req,res) => {
    const { name, email } = req.body
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" })
    }

    const user = { id: nextId++, name, email }
    users.push(user)
    res.status(201).json(user)
})

app.get(`/users`, (req,res) => {
    const { name } = req.query
    if (name) {
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
        return res.json(filteredUsers)
    }
    res.json(users)})

app.get(`/users/:id`, (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) {
        return res.status(404).json({ error: "User not found" })
    }
    res.json(user)
})

app.put("/users/:id", (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) 
        return res.status(404).json({ error: "User not found" })
    
    const { name, email } = req.body
    if (name) user.name = name
    if (email) user.email = email

    res.json(user)
})

app.delete("/users/:id", (req,res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id))
    if (userIndex === -1) return res.status(404).json({ error: "User not found" })
    const deletedUser = users.splice(userIndex, 1)
    res.json(deletedUser[0])
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
}) 