const fs = require("fs")


exports.getQuotes =  (req,res) =>{
    let quotesData = []

    fs.readFile("quotes.json",(err,data)=>{
        if(data){
            quotesData = JSON.parse(data)
            res.status(201).send(quotesData)
        }else{
            res.status(500).send(err || `something went wrong`)
        }
    })
}

exports.addQuote =  (req,res) =>{
    let quoteData = []

    fs.readFile("quotes.json",(err,data)=>{
        if(data){
            quoteData = JSON.parse(data)
            let quote = req.body

            let newQuotes = [...quoteData,quote]
            let quoteId = quoteData.some(item => item.id == req.body.id)

            if(Object.keys(quote).length !== 0){
                if(!quoteId){
                    fs.writeFile("quotes.json",JSON.stringify(newQuotes,null,1),(err)=>{
                        if(err){
                            res.status(400).send(err || `something went wrong`)
                        }else{
                            res.status(200).send(`Quote has been added.`)
                        }
                    })
                }else{
                    res.status(400).send(`Quote with this id already exists.`)
                }
            }else{
                res.status(400).send(`All the fields are required.`)
            }

        }else{
            res.status(500).send(err || `something went wrong`)
        }
    })
}

exports.getQuote =  (req,res) =>{
    let quoteId = req.params.id
    let quoteData = []

    if(quoteId){
        fs.readFile("quotes.json",(err,data)=>{
            if(data){
                quoteData = JSON.parse(data) 
                let quote = quoteData.filter(quote => quote.id === quoteId)
                res.status(200).send(quote)
            }else{
                res.status(500).send(err || `something went wrong`)
            } 
        })
    }else{
        res.status(404).send(`The id does not exist.`)
    }
}

exports.updateQuote =  (req,res) =>{
    let quoteId = req.params.id
    let quote = req.body
    let quotes = []

    if(quoteId){
        fs.readFile("quotes.json",(err,data)=>{
            if(data){
                quotes = JSON.parse(data)
                let filterQuote = quotes.filter(quote => quote.id === quoteId)

                filterQuote.map((item)=>{
                    item.id = req.body.id ? req.body.id : item.id,
                    item.text = req.body.text ? req.body.text : item.text,
                    item.Author = req.body.Author ? req.body.Author : item.Author
                })
                
                let updatedQuotes = [...quotes]
                
                if(Object.keys(quote).length !== 0){
                    fs.writeFile("quotes.json",JSON.stringify(updatedQuotes,null,1),(err)=>{
                        if(err){
                            res.status(400).send(err || `something went wrong.`)
                        }else{
                            res.status(201).send('Quote has been updated.')
                        }
                    })
                }else{
                    res.status(400).send(`All the fields are required.`)
                }

            }else{
                res.status(404).send(err || `something went wrong.`)
            }
        })
    }else{
        res.status(404).send(`The id does not exist.`)
    }
}

exports.deleteQuote = async (req,res) =>{
    let quoteId = req.params.id
    let quotes = []

    if(quoteId){
        fs.readFile("quotes.json",(err,data)=>{
            if(data){
                quotes = JSON.parse(data)
                let filterQuotes = quotes.filter(quote => quote.id !== quoteId)
                
                
                fs.writeFile("quotes.json",JSON.stringify(filterQuotes,null,1),(err)=>{
                    if(err){
                        res.status(400).send(err || `something went wrong.`)
                    }else{
                        res.status(201).send('Quote has been deleted.')
                    }
                })

            }else{
                res.status(404).send(err || `something went wrong.`)
            }
        })
    }else{
        res.status(404).send(`The id does not exist.`)
    }
}