const express = require('express');
const app = express();
const port = 3301;

app.get('/', (req,res)=> {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat1.html');
})

app.listen(port, () => {
    console.log('Up on 3301');
});