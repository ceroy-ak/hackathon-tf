import express from 'express'
import 'dotenv/config'
import { mysqlHealthCheck } from './model'
import {templateRouter} from "./controller/template"

const app = express()

const port = process.env.PORT || 3000

app.get('/health', async (req, res) => {
    const value = await mysqlHealthCheck()
    if (value) {
        return res.send('OK')
    }
    return res.status(500).send('NOT OK')
})

app.use("/template", templateRouter)


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
