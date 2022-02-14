const express = require('express');
const cluster = require('cluster');
const os = require('os');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const cpus = os.cpus().length;

// if(cluster.isPrimary || cluster.isMaster) {

//     for(let i = 0; i < cpus; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         if(signal) console.log(signal);
//         if(code !== 0) console.log(code);
//     });

//} else if(cluster.isWorker) {
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');

app.use('/api/v1/main', mainRouter);
app.use('/api/v1/auth', userRouter);
console.log(process.versions);
app.listen(
    PORT,
    () => console.log('listening on ' + PORT)
);
//}
