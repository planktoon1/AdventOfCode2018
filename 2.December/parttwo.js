const fs = require('fs').promises;


const app = async () => {
    const text = await fs.readFile('./input.txt', 'utf8');

    const trimmedText = text.split(/[\r\n]+/);

    console.log(trimmedText);

}

app();
