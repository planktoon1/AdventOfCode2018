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
    let ids = ['the false id: 0'];
    for (let i = 1; i < trimmedText.length +1; i++) {
        ids.push(i);       
    }
    
    for (rectangle of trimmedText) {
        const info = rectangle.split(' ');

        const leftOffset = parseInt(info[2].split(',')[0]);
        const topOffset = parseInt(info[2].split(',')[1].replace(':',''));

        const width = parseInt(info[3].split('x')[0]);
        const height = parseInt(info[3].split('x')[1]);

        const id = parseInt(info[0].replace('#',''));
        //console.log(`left: ${leftOffset}, top: ${topOffset} | {${width}, ${height}}`);

        for (let x = leftOffset; x < (leftOffset + width); x++) {
            
            for (let y = topOffset; y < (topOffset + height); y++) {
                if (fabric[x][y] === '.') {fabric[x][y] = `${id}`;}
                else { //If its an overlab. Remove the id's from the list of not overlabbed ids
                    const otherId = fabric[x][y];
                    ids.splice(otherId, 1, 'removed');
                    ids.splice(id, 1, 'removed');
                }
            }
        }
    }

    const remainingId = ids.filter((e) => {return e !== 'removed'});
    console.log(remainingId);

}

app();
