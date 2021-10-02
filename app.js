const express =  require("express");
const process =  require("process");
const cluster =  require("cluster");
const os =  require("os");


const app = express();
const numCpu = os.cpus().length;

app.get("/", (req, res) => {
    res.send("Ok.... from process = " + process.pid)
})

// Check if this is master process
if(cluster.isMaster){
    //// Then spawn ${numCpu} workers processes
    
    // create worker process as many as ${numCpu}
    for(let i = 0; i < numCpu; i++){
        cluster.fork();
    }

    // keep forking a new proess on any of these worker process exists
    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
        console.log(`Worker ${worker.process.pid} died`)
    })
}else{
    // Else just run the server
    app.listen(3000, () => console.log(`Server ${process.pid} is started at 3000`))
}





