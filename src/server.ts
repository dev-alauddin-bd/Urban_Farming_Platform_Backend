import app from "./index.js";

const port = process.env.PORT || 5000;



async function server() {

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })

}

server();