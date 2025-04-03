const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err){
        console.error('The file doesn’t exist');
    } else {
        console.log('File content:', data);
    }
});

fs.writeFile('newfile.txt', 'This is a new file created by Node.js!', (err) => {
    if (err) {
        console.error('Error creating file:', err);
    } else {
        console.log('File created successfully!');
    }
});

fs.appendFile('sample.txt', '\nAppended content.', (err) => {
    console.log('Data appended successfuly');
})

fs.unlink('newfile.txt', (err) => {
    if (err) {
        console.error('Error in deleting file:', err);
    } else {
        console.log ('File deleted successfully!');
    }
});
