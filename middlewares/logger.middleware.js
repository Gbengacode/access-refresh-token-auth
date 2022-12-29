import { v4 as uuidv4 } from 'uuid'
import { format } from "date-fns";
import * as fs from 'fs';
import path from 'path'
const __dirname = path.resolve();
const fsPromises = fs.promises
export const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '.', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '.', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '.', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}