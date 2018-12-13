const fs = require('fs').promises;

const app = async () => {
    const input = await fs.readFile('./input.txt', 'utf8');
    const polymer = input.split('');

    let triggerHappend = true;
    let triggerCount = 1;
    while(triggerHappend) {
        triggerHappend = false;
        for (let i = 0; i < polymer.length -1; i++) {
            const unit = polymer[i]; 
            const nextUnit = polymer[i+1];
            
            if (unit.toUpperCase() !== nextUnit.toUpperCase()) continue;

            unitUppercase = (unit == unit.toUpperCase());
            nextUnitUppercase = (nextUnit == nextUnit.toUpperCase());

            if ( unitUppercase !== nextUnitUppercase) {
                polymer.splice(i,2);
                i--;
                triggerHappend = true;
            }
        }
        
        console.log(`trigger count: ${triggerCount}. Polymer lenght: ${polymer.length}`);
        triggerCount++;
    }  

    
}
app();
