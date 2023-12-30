import fs from 'fs'
import { stdout } from 'process'

export default class RubLogger {

    constructor(dirname) {
        this._dirname = dirname
    }

    info(string) {
        let day = new Date(Date.now()).getDate()
        let month = new Date(Date.now()).getMonth() + 1
        let year = new Date(Date.now()).getFullYear()

        let time = new Date(Date.now()).toLocaleTimeString()
        let mili = new Date(Date.now()).getMilliseconds()

        // Faster than console.log() | Does not interrupt code execution
        process.stdout._write(`[\u001b[36mINFO\u001b[0m] [${day}/${month}/${year} - ${time}.${mili}]: ${string}\n`)

        fs.writeFile(this._dirname + "logs.log", `[INFO] [${day}/${month}/${year} - ${time}.${mili}]: ${string}\n`, { flag: "a" }, (err) => {
            if (err)
                console.log(err)
        })
    }
}