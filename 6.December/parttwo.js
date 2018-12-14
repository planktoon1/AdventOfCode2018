const fs = require('fs').promises;

const app = async () => {
    const input = await fs.readFile('./input.txt', 'utf8');
    const xxx = input.split(/[\r\n]+/);

    const coords = [ 
        {x: 21, y: 43},
        {x: 65, y: 62},
        {x: 45, y: 12}
    ];

    console.log(coords.find( (c) => { return (c.x === 61 && c.y === 62 ) } ));
}
app();
