// importing modules and env
import express from 'express';
import { get } from 'axios';
import { json } from 'body-parser';
// import { readFileSync } from "fs";
// import { readFile } from 'xlsx';
const secrets = require('dotenv').config({ path: "./serverMiddleware/secret.env" }).parsed


// initializing server properties
const app = express()
const j_CMT_server = "https://connect.jazzcmt.com/sendsms_url.html"
app.use(json())

app.get("/api/", (req, res) => {
    res.send(secrets)
})


//   sms sender
async function sendSMS(receiver, message) {
    let req_url = `${j_CMT_server}?Username=${secrets.JAZZ_API_USERNAME}&Password=${secrets.JAZZ_API_PASSWORD}&From=AL%20NAFI&To=${receiver}&Message=${message}`
    let response = await get(req_url)
    console.log(response)
    return response
}

// single sms route
app.post('/api/sms/', async (req, res) => {
    let resp = await sendSMS(req.body.receiver, req.body.message)
    if (resp.data.includes("Successfully")) {
        res.send(`${resp.data} to ${req.body.receiver}`).status(200)
    } else {
        res.send("An Error Occured").status(406)
    }
})


// 
// function contacts_from_excel(filename) {
//     const excelFile = readFile(filename)
//     const contactsFile = excelFile.Sheets[excelFile.SheetNames[0]]
//     delete contactsFile["!ref"]
//     delete contactsFile["!margins"]
//     var contacts = []
//     for (let contact of Object.values(contactsFile)) {
//         contacts.push(contact["v"])
//     }
//     return contacts
// }

// app.get('/api/multi-sms/', async (req, res) => {
//     contacts = contacts_from_excel("./receivers.xlsx")
//     console.log(contacts)
//     // let message = fs.readFileSync(`./campaign_templates/${req.body.template}.txt`)
//     sendSMS(req.body.phone, message)
//     // res.send(resp.data)
//     res.send("SUCCESS")
// })

module.exports = app