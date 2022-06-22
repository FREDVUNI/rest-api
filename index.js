const express = require("express")
const app = express()
const PORT = 4000

app.use(express.json())

app.use("/quotes",require("./routes/quotes"))    

app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`)
})