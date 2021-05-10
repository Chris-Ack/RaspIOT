const { server } = require("./server");

const testServer = server()

  const port = 9999 || process.env.DB_PORT;
  testServer.listen(9999, () => {
    console.log(`🎉 Server running at https://localhost:${port}!`);
  });
