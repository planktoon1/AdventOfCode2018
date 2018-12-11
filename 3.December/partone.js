const fs = require('fs').promises;


const app = async () => {
    const text = await fs.readFile('./input.txt', 'utf8');
    const trimmedText = text.split(/[\r\n]+/);

    let fabric = [];
    for (let i = 0; i < 1000; i++) {
        fabric[i] = [];

        for (let j = 0; j < 1000; j++) {            
            fabric[i][j] = '.';
        }
        
    }
    
    let overlapCount = 0;
    for (rectangle of trimmedText) {
        const info = rectangle.split(' ');

        const leftOffset = parseInt(info[2].split(',')[0]);
        const topOffset = parseInt(info[2].split(',')[1].replace(':',''));

        const width = parseInt(info[3].split('x')[0]);
        const height = parseInt(info[3].split('x')[1]);

        //console.log(`left: ${leftOffset}, top: ${topOffset} | {${width}, ${height}}`);

        for (let x = leftOffset; x < (leftOffset + width); x++) {
            
            for (let y = topOffset; y < (topOffset + height); y++) {
                if (fabric[x][y] === '.') {fabric[x][y] = '#';}
                else if (fabric[x][y] === '#') {fabric[x][y] = 'X'; overlapCount++;}
            }
        }
    }

    for (let i = 0; i < fabric.length; i++) {
        fabric[i].push('<br>');
        
    }

    fs.writeFile('output.html', `<span style="font-family: monospace">${fabric}</span>`)

    console.log(`Overlaps: ${overlapCount}`);
    console.log('Output done. Open output.html to see visulization of the data');

}

app();
