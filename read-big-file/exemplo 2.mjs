
import http from 'http';

import { createReadStream, readFileSync } from 'fs';
// commando no wls para criar um arquivo de quase 1GB
// node - e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

http.createServer((req, res) => {
    // const file = readFileSync('./big.file');
    // // file é um buffer
    // // para manipular o buffer, usamos o método toString(), porem esse arquivo é muito grande

    // res.write(file);
    // res.end();
    createReadStream('./files/big.file')
        .pipe(res);
})
    .listen(3000, () => console.log('http://localhost:3000'));

// curl localhost:3000 --output big.txt
