const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("X-Foo", "bar");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("ok");
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");

  const req = http.request(
    {
      host: "127.0.0.1",
      port: 8080,
      method: "POST",
    },
    (res) => {
      res.resume();
      res.on("end", () => {
        if (!res.complete) console.error("The connection was terminated while the message was still being sent");
      });
    }
  );
});
