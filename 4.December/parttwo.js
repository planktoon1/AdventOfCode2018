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

        let date = new Date(logEntry.split(']')[0].replace('[','') + 'Z');
        let minute = parseInt(logEntry.substring(15,17));

        const entry = {
            date: date,
            type: type,
            id: id,
            minute: minute
        }
        logEntries.push( entry );
    }

    // Sort entries
    logEntries.sort( (a, b) => {return a.date - b.date});
    
    // Make list of guards, and add guard id to all log entries
    const guards = [];
    let currentGuard = null;
    let startSleepTime = null;
        for (logEntry of logEntries) {
        if (logEntry.type === 'shift start') {
            currentGuard = guards.find( (g) => {return g.id === logEntry.id});
            if (!currentGuard) { guards.push(currentGuard = { id: logEntry.id, sleepTime: 0 }); };
        } else {logEntry.id = currentGuard.id;}

        if (logEntry.type === 'sleep start') {
            startSleepTime = logEntry.minute;
        }
        
        if (logEntry.type === 'sleep end') {
            const minutesAsleep = logEntry.minute - startSleepTime - 1;
            currentGuard.sleepTime = currentGuard.sleepTime + minutesAsleep;
            logEntry.sleepStarted = startSleepTime; 
        }

    }
    
    // Use same technique as part one, but do it to all guards.
    const guardsSleepLogs = [];
    for (guard of guards) {
        const sleepersLogs = logEntries.filter( (entry) => {return (entry.id === guard.id && entry.type === 'sleep end')});

        // Make a list of the minutes 00-59 and populate it with the slept minutes of the guard
        const minutesAsleep = [];
        for (entry of sleepersLogs) {
            const startMinute = entry.sleepStarted;
            const endMinute = entry.minute;

            for (let min = startMinute; min < endMinute; min++) {
                if ( !minutesAsleep[min]) { minutesAsleep[min] = {minute: min, sleepingFor: 1};}
                else minutesAsleep[min].sleepingFor = minutesAsleep[min].sleepingFor + 1;
            }
        }

        // save info about the minute that the guard slept the most on
        minutesAsleep.sort( (a,b) => {return b.sleepingFor - a.sleepingFor});
        if (minutesAsleep.length > 0) {
            // ST = sleep time
            const guardSleepInfo = {
                guard: guard.id,
                toughMin: minutesAsleep[0].minute,
                toughMinST: minutesAsleep[0].sleepingFor,
                totalST: guard.sleepTime
            };

            guardsSleepLogs.push(guardSleepInfo);
        } else { console.log(` Guard ${guard.id} didnt sleep at all `)}
        
    }

    guardsSleepLogs.sort( (a, b) => {return b.toughMinST - a.toughMinST});
    const winner = guardsSleepLogs[0];
    console.log( winner);
    console.log( `answer(id * minute) = ${winner.guard * winner.toughMin}`);

}
app();