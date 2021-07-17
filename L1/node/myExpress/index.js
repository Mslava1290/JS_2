const express = require('express');
const app = express();//в обьекте app есть методы протокола http
app.get('/', (req,res) => {
    res.send('Hello!!! man!');
})
app.listen(3000,() =>{
    console.log('Server starting');
})