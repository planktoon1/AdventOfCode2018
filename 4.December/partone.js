const fs = require('fs').promises;

const app = async () => {
    const text = await fs.readFile('./input.txt', 'utf8');
    const logEntries = text.split(/[\r\n]+/);
    
    logEntries.sort(sortFunc);


    let guards = [];
    let currentGuard = {};
    for (let i = 0; i < logEntries.length; i++) {
        const date = new Date(logEntries[i].split(']')[0].replace('[',''));
        const information = logEntries[i].split('] ')[1];
        
        // Begin shift
       if (information.includes('Guard')) {
            let id = parseInt(information.split(' ')[1].replace('#', ''));
            const guard = guards.find( (guard) => { return guard.id === id; });

            if (guard) {
                currentGuard = guard;
            } else {
                const newGuard = { id: id, minsAsleep: 0};
                guards.push(newGuard);
                currentGuard = newGuard; 
            }
        }

        if (information.includes('falls asleep')){
            
            //currentGuard.minsAsleep =
        }

    }
    guards.sort( (a, b) => {return a.id - b.id} );
    console.log(guards);
    
}
app();

const sortFunc = (a, b) => {

    /*const test = '[1518-09-15 00:42] wakes up'
    const date = test.split(']')[0].replace('[','');
    console.log(`date : ${date}`);
    console.log(new Date(date));*/

    const dateA = new Date(a.split(']')[0].replace('[',''));
    const dateB = new Date(b.split(']')[0].replace('[',''));
    
    return dateA - dateB;
}
