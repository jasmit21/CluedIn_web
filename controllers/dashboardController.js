const path = require('path');

module.exports = {
    get: (req, res) => {
        
        //absolute path 
        // console.log(res.sendFile('views/Index.html', { root: '.' }));
        
        var Path =path.join(__dirname,"..","views","index.html");
        res.sendFile(Path);
    },
}
