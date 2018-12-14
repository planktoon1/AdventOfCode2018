const fs = require('fs').promises;

const app = async () => {
    const input = await fs.readFile('./input.txt', 'utf8');
    const xxx = text.split(/[\r\n]+/);

    console.log(xxx);
}
app();
