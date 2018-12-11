const fs = require('fs').promises;


const app = async () => {
    const text = await fs.readFile('./input.txt', 'utf8');

    const trimmedText = text.split(/[\r\n]+/);

    let linesWithDublicates = 0;

    for (i = 0; i < trimmedText.length; i++) {
        

        for (j = i+1; j < trimmedText.length; j++) {
            
            let oneCharDiffrence = false;
            for(c = 0; c < trimmedText[i].length; c++) {
                const c1 = trimmedText[i].charAt(c);
                const c2 = trimmedText[j].charAt(c)
                if      (c1 !== c2 && !oneCharDiffrence) oneCharDiffrence = true;
                else if (c1 !== c2 &&  oneCharDiffrence) {oneCharDiffrence = false; break;};
            }
            if (oneCharDiffrence) console.log(`${trimmedText[i]} | ${trimmedText[j]}`);
        }
    }

}

app();
