const fs = require('fs').promises;

const app = async () => {
    const input = await fs.readFile('./input.txt', 'utf8');

    let char1 = 65;
    let char2 = 65;

    const coordinates = input.split(/[\r\n]+/).map( (xy) => {
        const coords = xy.split(', ');
        const id = String.fromCharCode(char1, char2);
        if (char2 > 89) {char1++; char2 = 65}
        else char2++;
        return {x: coords[0], y: coords[1], id: id};
    });

    // lowest x = 46, highest x = 352
    // lowest y = 47, highest y = 359
    // Make 400x400 grid
    const grid = [];
    for (let x = 0; x < 400; x++) {
        grid[x] = [];
        for (let y = 0; y < 400; y++) {            
            console.log(`working on ${x}, ${y}`);
            // Search for closest coordinate
            if (findCoord(y, x)) { grid[x][y] = findCoord(y, x).id}
            else {
                const cc = findClosestCoord(y, x, 1);
                grid[x][y] = cc;
            }

        }    
    }

    // Make html file for visualization of grid
    for (row of grid) { row.push('<br>'); };
    grid[0].unshift('');
    fs.writeFile('output.html', `<span style="font-family: monospace">${grid}</span>`);

    // *****************ANSWER ****************
    // this program took 10 minutes to run, and i could from the html file visually see the areas
    // i decided i didnt wanna try to optimize and retry, and ended up simply using the browsers 'find'
    // function to count the area size. Not really a super valid solution, but i just wanted to move on








    // Recursive function that looks for the closest coordinate of the coordinates in the input list¨
    // Starts by looking in all coords within 1 radius, then increments the radius by one every time no coordinate is found
    function findClosestCoord( cx, cy, searchRadius) {
        if (searchRadius > 350) {console.log('Error: Recursion went crazy'); return 'x';}

        const closestCoord = [];

        for (let x = 0; x < searchRadius; x++) {
            let xOffset = searchRadius - x; // 3,  2, 1
            let yOffset = x; // 0,  1, 2 
            
            const lookatX = cx + xOffset;
            const lookatY = cy + yOffset;
            const coordinate = findCoord( lookatX, lookatY);
            if ( coordinate) { closestCoord.push( coordinate )};
        }
        
        for (let x = 0; x < searchRadius; x++) {
            let xOffset = -1 * x; // 0,  -1, -2
            let yOffset = searchRadius - x; // 3,  2, 1

            const lookatX = cx + xOffset;
            const lookatY = cy + yOffset;
            const coordinate = findCoord( lookatX, lookatY);
            if ( coordinate) { closestCoord.push( coordinate )};
        }
        
        for (let x = 0; x < searchRadius; x++) {
            let xOffset = (searchRadius - x) * -1; // -3,  -2, -1
            let yOffset = -1 * x; // 0,  -1, -2 

            const lookatX = cx + xOffset;
            const lookatY = cy + yOffset;
            const coordinate = findCoord( lookatX, lookatY);
            if ( coordinate) { closestCoord.push( coordinate )};
        }
        
        for (let x = 0; x < searchRadius; x++) {
            let xOffset = x; // 0,  1, 2 
            let yOffset = (searchRadius - x) * -1; // -3,  -2, -1

            const lookatX = cx + xOffset;
            const lookatY = cy + yOffset;
            const coordinate = findCoord( lookatX, lookatY);
            if ( coordinate) { closestCoord.push( coordinate )};
        }

        // If one coordinate is found 
        if (closestCoord.length === 1) {
            //console.log(`closest cord = ${closestCoord[0].id}`); 
            return closestCoord[0].id.toLowerCase();
        }

        // If multiple coordinates found
        if (closestCoord.length > 1) {
            //console.log(`multiple cords are equally close`); 
            return '..';}

        // If no coordinate found in radius
        //console.log(`cord: ${cx}, ${cy}. Trying again with r=${searchRadius + 1}`);
        return findClosestCoord( cx, cy, searchRadius + 1);
    }

    function findCoord(x, y) {
        return coordinates.find( (c) => { return (c.x == x &&  c.y == y)});
    }

}

app();

