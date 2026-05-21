import http from "http";

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    if (req.url === "/user") {
        const user = {
            id: 1,
            name: "Mauricio",
            email: "mauricio.ro1@hotmail.com"
        };
        res.end(JSON.stringify(user));
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});