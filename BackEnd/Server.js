const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./DB');
require('dotenv/config');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const tsModel = require('./Model/tsData');
const port = 3000;
connectDB();

app.get('/', (req, res) => {
    res.json({ message: 'ok' })
});

app.get('/getSharedData', async (req, res) => {
    const tsData = await tsModel.find({});
    const total1s = tsData.filter((item) => item.machine_status == '1');
    const total0s = tsData.filter((item) => item.machine_status == '0');
    const count = getCombination(tsData);
    res.json({ data: tsData, totalItem: tsData.length, total0s: total0s.length, total1s: total1s.length, combination: count });
});


function getCombination(data) {
    var dataStr = '';
    var index = 0;
    var count = 0;
    var lastIndex = 0;
    data.map((item) => {
        dataStr = dataStr + item.machine_status;
    });
    lastIndex = dataStr.lastIndexOf('01');
    while (index != lastIndex) {
        index = dataStr.indexOf('01', index + 1);
        if (index != -1) {
            count++;
        }
    }
    return count;
}

server.listen(port, () => {
    console.log(`Server running  at port:${port}`)
});

