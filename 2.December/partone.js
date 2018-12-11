const fs = require('fs').promises;


const app = async () => {
    const text = await fs.readFile('./input.txt', 'utf8');

    const trimmedText = text.split(/[\r\n]+/);

    let linesWithDublicates = 0;
    let linesWithTriplets = 0;

    for (line of trimmedText) {
        let anyDublicates = false;
        let anyTriplets = false;
        for (char of line) {
            if (!anyDublicates && line.match(new RegExp(char, "g") || []).length === 2) anyDublicates = true;
            if (!anyTriplets && line.match(new RegExp(char, "g") || []).length === 3) anyTriplets = true;
        }
        if (anyDublicates) linesWithDublicates++; 
        if (anyTriplets) linesWithTriplets++;
    }

    console.log(`lines with doubles: ${linesWithDublicates}. Lines with triples: ${linesWithTriplets}`);
    const checksum = linesWithDublicates * linesWithTriplets;
    console.log(`Checksum is: ${checksum}`);
}

app();
