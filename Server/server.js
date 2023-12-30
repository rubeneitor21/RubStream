import * as fs from 'fs'
import path from 'path'
import * as url from 'url'
import * as http from 'http'


import RubLogger from './Modules/RubLogger.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const logger = new RubLogger(__dirname)

if (!fs.existsSync(__dirname + "install.lock")) {
    logger.info("Instalando")
    fs.mkdirSync(__dirname + "Media/")
    fs.mkdirSync(__dirname + "Media/" + "movies")
    fs.mkdirSync(__dirname + "Media/" + "shows")
    fs.writeFileSync(__dirname + "install.lock", "")
}


const server = http.createServer((req, res) => {

    /* -------------------------------------------------------------------------- */
    /*                                 Load media                                 */
    /* -------------------------------------------------------------------------- */

    if (req.url.startsWith("/media/")) {
        const file = req.url.split('/')
        file.splice(0, 2)

        const videoPath = path.resolve(`${__dirname}Media/${file[0]}/${file[1]}`)

        // logger.info(videoPath)

        if (!fs.existsSync(videoPath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Video file not found');
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'video/mp4',
            'Content-Length': fs.statSync(videoPath).size,
        });

        const stream = fs.createReadStream(videoPath);
        stream.pipe(res);
    }

    /* -------------------------------------------------------------------------- */
    /*                                 List media                                 */
    /* -------------------------------------------------------------------------- */

    else if (req.url.startsWith("/list/")) {
        let type = req.url.split("/")[2]
        // logger.info(type)
        let movies = []
        fs.readdir(path.resolve(`${__dirname}Media/${type}`), (err, content) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" })
                res.end("Error reading files")
            }

            content.forEach(movie => {
                movies.push({
                    "name": movie.replace(/\.\w{0,4}/g, ""),
                    "url": `/media/${type}/${movie}`
                })
            })

            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(movies))
        })

    }
});

const PORT = 3000;
server.listen(PORT, () => {
    logger.info(`Servidor listo en: ${PORT}`)
});