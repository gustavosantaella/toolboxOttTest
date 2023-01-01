const express = require("express")
const api = require('./config/api');
const axios = require("axios")
const route = express.Router()


const format = data => {
    const split = data.split("\n")
    const array = []
    if(split.length > 1){
        split.shift()
        split.forEach((item) => {
            const arrayContent = item.split(",")
            let obj  = {}
            for(item of arrayContent){
                const regex = /^[0-9]*$/;
                const isNumber = regex.test(item);
                if( item.trim() === "") continue
                if(isNumber){
                    obj.number = item
                }else{
                    if(item.includes("csv")){
                        obj.file = item
                    }
    
                    if(item.length === 32)
                    obj.hex = item
                    else
                    obj.text = item
                }
                
            
            }
            if(Object.keys(obj).length === 4){
                const { file, ...data} = obj
                const aux = {
                    file, 
                    lines:[data]
                }
            return Object.keys(obj).length === 4 && array.push(aux)
            }
        
        })
    }
    return array
}
route.get("/files/data", async (req, res) => {
    try{
        const queryFileName = req.query.fileName?.trim()
        let response;
        if(!queryFileName || queryFileName === ""){
            response = await axios.get(`${api.url}/files`, {
                headers:{
                    authorization: api.secretKey
                }
            })
        }else{
            response = await axios.get(`${api.url}/file/${queryFileName}`, {
                headers:{
                    authorization: api.secretKey
                }
            })

           console.log(format(response.data))
            return res.send(format(response.data))
        }
        const files = await Promise.all(response.data.files.map(async (file) => {
            try{
                response = await axios.get(`${api.url}/file/${file}`, {
                    headers: {
                        authorization: api.secretKey
                    }
                })
            return format(response.data)

        }catch(e){
            return []
        }
    }))
    return res.send(files.flat(Infinity))
}catch(e){
        console.log(e.message)
    }
})


module.exports = route