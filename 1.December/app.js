const fs = require('fs').promises;


const app = async () => {
    const text = await fs.readFile('./input.txt', 'utf8');

    const trimmedText = text.split(/[\r\n]+/);

    let sum = 0;
    let frequencies = [];
    let repeat = true;

    console.log('Datacrunching...');
    // Could be optimized to be alooot faster if the frequencies was saved in a tree '.includes' is being put to the test here
    while (repeat == true) {

        // part one is solved with this loop alone
        for (number of trimmedText) {
            let n = parseInt(number.substring(1));
            if (n) {
                sum = (number.substring(0,1) === '+') ? sum + n : sum - n;
                
                if (frequencies.includes(sum)) {
                    console.log('First frequency to be repeated twice is: ' + sum); 
                    repeat = false;
                    break;
                }
                
                frequencies.push(sum);
            }
        }
        // console.log(sum) //Answer to part one

    }
}

app();
