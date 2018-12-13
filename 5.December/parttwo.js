const fs = require('fs').promises;

const app = async () => {
    const input = await fs.readFile('./input.txt', 'utf8');
    const polymer = input.split('');

    const theAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const polymerList = []; 
    for (letter of theAlphabet) {
        const modifiedPolymer = polymer.filter( (unit) => unit.toUpperCase() !== letter.toUpperCase() );

        let triggerHappend = true;
        let triggerCount = 1;
        while(triggerHappend) {
            triggerHappend = false;
            for (let i = 0; i < modifiedPolymer.length -1; i++) {
                const unit = modifiedPolymer[i]; 
                const nextUnit = modifiedPolymer[i+1];
                
                if (unit.toUpperCase() !== nextUnit.toUpperCase()) continue;

                unitUppercase = (unit == unit.toUpperCase());
                nextUnitUppercase = (nextUnit == nextUnit.toUpperCase());

                if ( unitUppercase !== nextUnitUppercase) {
                    modifiedPolymer.splice(i,2);
                    i--;
                    triggerHappend = true;
                }
            }
            
            //console.log(`trigger count: ${triggerCount} Polymer lenght: ${polymer.length}`);
            triggerCount++;
        } 
        const polymerInfo = {triggerCount: triggerCount, letter: letter, lenght: modifiedPolymer.length};
        polymerList.push(polymerInfo);
        console.log(polymerInfo);
    }

    polymerList.sort( (a,b) => {return a.lenght - b.lenght});
    console.log(`The shortest polymer is: ${polymerList[0]}`);
    
}
app();
