import * as fs from 'fs'
import path from 'path'
import * as url from 'url'
import * as http from 'http'
import os from 'os'
import mime from 'mime-types'


import RubLogger from './Modules/RubLogger.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const logger = new RubLogger(__dirname)


if (!fs.existsSync(__dirname + "install.lock")) {
    logger.info("Instalando...")
    fs.mkdirSync(__dirname + "Media/")
    fs.mkdirSync(__dirname + "Media/" + "movies")
    fs.mkdirSync(__dirname + "Media/" + "shows")
    logger.info("Los nombres de las carpetas pueden ser modificados")
    fs.writeFileSync(__dirname + "install.lock", "")
}


const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite solicitudes desde cualquier origen
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Permite encabezados específicos

    logger.info(req.url)
    /* -------------------------------------------------------------------------- */
    /*                                 Load media                                 */
    /* -------------------------------------------------------------------------- */

    if (req.url.startsWith("/media/")) {
        const file = req.url.split('/')
        file.splice(0, 2)

        let finalFile = ""
        file.forEach(route => finalFile += `${route}/`)
        finalFile = decodeURI(finalFile)

        const videoPath = path.resolve(`${__dirname}Media/${finalFile}`)

        logger.info(videoPath)
        logger.info(finalFile)

        // logger.info(videoPath)

        if (!fs.existsSync(videoPath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Video file not found');
            return;
        }

        res.writeHead(200, {
            'Content-Type': `${mime.lookup(videoPath)}`,
            'Content-Length': fs.statSync(videoPath).size,
        });

        const stream = fs.createReadStream(videoPath);
        stream.pipe(res);
    }

    /* -------------------------------------------------------------------------- */
    /*                                 List media                                 */
    /* -------------------------------------------------------------------------- */

    else if (req.url.startsWith("/list")) {
        let args = decodeURI(req.url).split("/")
        args.splice(0, 2)
        // logger.info(args)
        let search = ""

        args.forEach(arg => search += `${arg}/`)

        search = search.replace(/\/+/g, "/")

        let movies = []

        fs.readdir(path.resolve(`${__dirname}Media/${search}`), (err, content) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" })
                res.end("Not found")
            }

            else {
                content.forEach(movie => {
                    let type = movie.match(/\.\w{0,4}/) ? "file" : "folder"
                    let url = `/media/${search}/${movie}`.replace(/\/+/g, "/")
                    movies.push({
                        "name": movie.replace(/\.\w{0,4}/g, ""),
                        "url": type === "folder" ? url.replace("media/", "").replace(/^\//, "") : url,
                        "type": type
                    })
                })


                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(movies))
                console.log(movies)
            }
        })

    }
});

const PORT = 5000;
server.listen(PORT, () => {
    logger.info(`Servidor listo en: http://localhost:${PORT}`)
});