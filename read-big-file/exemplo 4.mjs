import { pipeline, Readable, Writable } from 'stream'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)

const readableStream = Readable({
    read: function () {
        this.push("Heelo")
        this.push('World')

        this.push(null)
    }
})

const writableStream = Writable({
    write(chunk, encoding, callback) {
        console.log('chunk', chunk)
        console.log('msg', chunk.toString())
        callback()
    }
})

await pipelineAsync(
    readableStream,
    writableStream
)

console.log('done')