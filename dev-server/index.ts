const ASSETS_DIRECTORY = "/../public";

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const rootPath = import.meta.dirname;
    let pathName = new URL(req.url).pathname;

    if (pathName === "/") {
      pathName = "/index.html";
    }

    const publicDirectoryPath = `${rootPath}${ASSETS_DIRECTORY}`;

    console.log("pathname", pathName);

    const requestedFile = publicDirectoryPath + pathName;

    return new Response(Bun.file(requestedFile));
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
