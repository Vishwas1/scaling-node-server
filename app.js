const express =  require("express");
const process =  require("process");
const cluster =  require("cluster");
const os =  require("os");
const { v4: uuid } = require('uuid');


const app = express();
app.use(express.json())

const numCpu = os.cpus().length;

// In-mem store
const userMap = {};

app.post("/user", (req, res) => {
    const { name } = req.body;
    const user = {
        id: uuid(),
        name,
        pid: process.pid
    }
    userMap[user.id] = user;
    res.send({
        data:  userMap[user.id],
        length: Object.keys(userMap).length
    })
})

app.get("/user", (req, res) => {
    res.send(userMap)
})

app.get("/user/:id", (req, res) => {
    res.send(userMap[req.params.id])
})

app.get("/", (req, res) => {
    res.send("Ok.... from process = " + process.pid)
    // kill the process on to test fault tolerance
    // cluster.worker.kill();
})

// Check if this is master process
if(cluster.isMaster){
    //// Then spawn ${numCpu} workers processes
    
    // create worker process as many as ${numCpu}
    for(let i = 0; i < numCpu; i++){
        cluster.fork();
    }

    // keep forking a new proess if any of these worker process exists; fault tolrant
    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
        console.log(`Worker ${worker.process.pid} died`)
    })
}else{
    // Else just run the server
    app.listen(3000, () => console.log(`Server ${process.pid} is started at 3000`))
}

// app.listen(3000, () => console.log(`Server ${process.pid} is started at 3000`))






