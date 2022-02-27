import assert from 'assert';

const date = new Date("2022-02-25 00:00");

// convertendo data para o formato brasileiro com regex
{
  console.log("\n#1");
  console.log("Regex")
  console.time("Regex");
  const regex = /^([0-9]{4})-(0[1-9]|1[1-2])-(0[1-9]|2[0-9]|3[0-1])/;
  const dateArray = regex.exec(date.toISOString());
  console.log("dateArray", dateArray);
  /*
  [
    '2022-02-25',
    '2022',
    '02',
    '25',
    index: 0,
    input: '2022-02-25T03:00:00.000Z',
    groups: undefined
  ]
  */

  // queremos o dia, mes e ano
  const [full, year, month, day] = dateArray;

  // data no formato dd/mm/yyyy
  const actual = `${day}/${month}/${year}`;
  const expected = '25/02/2022';

  // crio o teste para ver se as datas conferem
  assert.equal(actual, expected);
  console.log({ actual, expected });
  console.timeEnd("Regex");
  // { actual: '25/02/2022', expected: '25/02/2022' }
}
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

// convertendo data para o formato brasileiro com toLocaleDateString
{
  console.time("toLocaleDateString");
  console.log("\n#2");
  console.log("toLocaleDateString")
  // toLocaleDateString()
  const actual = date.toLocaleDateString('pt-BR', options);
  const expected = '25 de fevereiro de 2022';
  assert.equal(actual, expected);
  console.log({ actual, expected });
  console.timeEnd("toLocaleDateString");
}

// colocando numeric
{
  console.time("toLocaleDateStringNumeric");
  console.log("\n#3");
  console.log("toLocaleDateString formato numerico")
  // toLocaleDateString()
  const actual = date.toLocaleDateString('pt-BR', {
    ...options,
    month: 'numeric',
  });
  const expected = '25/02/2022';
  assert.equal(actual, expected);
  console.log({ actual, expected });
  console.timeEnd("toLocaleDateStringNumeric");
}

// usando Intl.DateTimeFormat
{
  console.time("Intl.DateTimeFormat");
  console.log("\n#4");
  console.log("Intl.DateTimeFormat")
  const actual = new Intl.DateTimeFormat('pt-BR', options)
    .format(date);
  const expected = '25 de fevereiro de 2022';
  console.log(actual);
  // 25 de fevereiro de 2022
  assert.equal(actual, expected);
  console.log({ actual, expected });
  console.timeEnd("Intl.DateTimeFormat");
}

{
  console.time("Intl.DateTimeFormatCompleto");
  console.log("\n#5");
  console.log("Intl.DateTimeFormat informção completa")
  const actual = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'full',
  })
    .format(date);
  console.log({ actual });
  // assert.equal(actual, expected);
  console.timeEnd("Intl.DateTimeFormatCompleto");
}