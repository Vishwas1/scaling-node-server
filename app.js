const express =  require("express");
const process =  require("process");
const app = express();

app.get("/", (req, res) => {
    res.send("Ok....")
})

app.listen(3000, () => console.log(`Server ${process.pid} is started at 3000`))



