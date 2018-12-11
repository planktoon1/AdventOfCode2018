const fs = require('fs').promises;

const app = async () => {
    const text = await fs.readFile('./input.txt', 'utf8');
    const logEntriesText = text.split(/[\r\n]+/);
    
    // Make the data into JS objects 
    const logEntries = [];
    for (logEntry of logEntriesText) {
        let type = '';
        if      (logEntry.includes('Guard'))        { type = 'shift start'}
        else if (logEntry.includes('falls asleep')) { type = 'sleep start'}
        else                                        { type = 'sleep end'}

        let id = 0;
        if (type === 'shift start') { id = parseInt(logEntry.split(' ')[3].replace('#', ''))}

        const entry = {
            date: new Date(logEntry.split(']')[0].replace('[','')),
            type: type,
            id: id
        }
        logEntries.push( entry );
    }

    // Sort entries
    logEntries.sort( (a, b) => {return a.date - b.date});
    
    //
    const guards = [];
    let currentGuard = null;
    for (logEntry of logEntries) {
        if (logEntry.type === 'shift start') {
            currentGuard = guards.find( (g) => {return g.id === logEntry.id});
            if (!currentGuard) { guards.push(currentGuard = { id: logEntry.id, sleepTime: 0 }); };
        } else {logEntry.id = currentGuard.id;}
    }


    guards.sort( (a, b) => { return a.id - b.id});
    //console.log(guards);

    console.log( logEntries.filter( (entry) => {return entry.id === 3331}));
}
app();
