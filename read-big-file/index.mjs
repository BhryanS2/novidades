import { pipeline, Readable, Transform } from 'stream'
import { promisify } from 'util'
import { createWriteStream } from 'fs'

const pipelineAsync = promisify(pipeline)

const readableStream = Readable({
    read() {
        for (let i = 0; i < 1e5; i++) {
            const person = {
                id: Date.now() + i,
                name: `Person-${i}`
            }
            const data = JSON.stringify(person)
            this.push(data)
        }
        this.push(null)
    }
})

const writableMapToCsv = Transform({
    transform(chunk, encoding, callback) {
        const data = JSON.parse(chunk)
        const csv = `${data.id},${data.name.toUpperCase()}\n`
        callback(null, csv)
    }
})

const setHeader = Transform({
    transform(chunk, encoding, callback) {
        this.counter = this.counter ?? 0
        if (this.counter) {
            return callback(null, chunk)
        }
        this.counter += 1
        callback(null, "id,name\n".concat(chunk))
    }
})

await pipelineAsync(
    readableStream,
    writableMapToCsv,
    setHeader,
    createWriteStream('./files/people.csv')
)