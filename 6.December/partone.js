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

    // Make 400x400 grid
    const grid = [];
    const areas = [];
    for (let x = 0; x < 400; x++) {
        grid[x] = [];
        console.log(`Working on row ${x + 1} of 400`);  
        for (let y = 0; y < 400; y++) {
            // Search for closest coordinate
            const closestCord = findCoord(y, x);
            if (closestCord) { grid[x][y] = closestCord.id}
            else {
                const cc = findClosestCoord(y, x, 1);
                grid[x][y] = cc;
                const area = areas.find( (e) => {return e.id === cc});
                const isInfinite = (x === 0 || x === 399 || y === 0 || y === 399);
                if (area && isInfinite) {area.size ++; area.isInfinite = true}
                else if(area) {area.size++;}
                else {areas.unshift({id: cc, size: 2, isInfinite: isInfinite});}
            }

        }    
        
    }

    
    // *****************ANSWER ****************
    const nonInfiniteAreas = areas.filter( (area) => { return area.isInfinite === false});
    nonInfiniteAreas.sort( (a,b) => { return b.size - a.size});
    console.log(areas);
    console.log(`The biggest non-infinite area is: ${nonInfiniteAreas[0].id} with size: ${nonInfiniteAreas[0].size}`);

    // Make html file for visualization of grid
    for (row of grid) { row.push('<br>'); };
    grid[0].unshift('');
    fs.writeFile('output.html', `<span style="font-family: monospace">${grid}</span>`);


    // Recursive function that looks for the closest coordinate of the coordinates in the input list¨
    // Starts by looking in all coords within 1 radius, then increments the radius by one every time no coordinate is found
    function findClosestCoord( cx, cy, searchRadius) {
        if (searchRadius > 350) {console.log('Error: Recursion went crazy'); return 'x';}

        const closestCoord = [];

        for (let x = 0; (x < searchRadius) && (closestCoord.length < 2); x++) {

            let lookAtx = searchRadius - x + cx; // 3,  2, 1
            let lookAty = x + cy; // 0,  1, 2 

            // lowest x = 46, highest x = 352
            // lowest y = 47, highest y = 359
            if ( lookAtx >= 46 && lookAtx <= 352 && lookAty >= 47 && lookAty <= 359) {
                const coordinate = findCoord( lookAtx, lookAty);
                if ( findCoord( lookAtx, lookAty)) { closestCoord.push( coordinate )};
            }

            lookAtx = x + cx; // 0,  1, 2 
            lookAty = (searchRadius - x) * -1 + cy; // -3,  -2, -1

            if ( lookAtx >= 46 && lookAtx <= 352 && lookAty >= 47 && lookAty <= 359) {
                const coordinate = findCoord( lookAtx, lookAty);
                if ( coordinate) { closestCoord.push( coordinate )};
            }

            lookAtx = (searchRadius - x) * -1 + cx; // -3,  -2, -1
            lookAty = -1 * x + cy; // 0,  -1, -2 

            if ( lookAtx >= 46 && lookAtx <= 352 && lookAty >= 47 && lookAty <= 359) {
                const coordinate = findCoord( lookAtx, lookAty);
                if ( coordinate) { closestCoord.push( coordinate )};
            }

            lookAtx = -1 * x + cx; // 0,  -1, -2
            lookAty = searchRadius - x + cy; // 3,  2, 1

            if ( lookAtx >= 46 && lookAtx <= 352 && lookAty >= 47 && lookAty <= 359) {
                const coordinate = findCoord( lookAtx, lookAty);
                if ( coordinate) { closestCoord.push( coordinate )};
            }
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

