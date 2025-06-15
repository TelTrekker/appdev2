const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'reflection.txt');

fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error ("Reading file error", err);
        return;
    }

    console.log('--Reflection--');
    console.log(data);
});