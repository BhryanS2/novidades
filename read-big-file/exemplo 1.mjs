
const stdin = process.stdin
    // lê o que o usuário digitar e imprime na tela

    // os pipelines também herdam as propriedades de eventos, temos:
    .on('data', msg => console.log(msg.toString().toUpperCase()))
// .on('end')
// .on('error')
// .on('close')
const stdout = process.stdout
    .on("data", msg => console.log(msg.toString().toLowerCase()))

stdin.pipe(stdout)