import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";

export class MockFastifyInstance {
  private readonly server: Server<
    typeof IncomingMessage,
    typeof ServerResponse
  >;

  public constructor() {
    this.server = createServer();
  }

  public get<T>(route: string, handler: (req: IncomingMessage) => Promise<T>): void {
    this.server.on("request", async (req, res) => {
      
      if (req.url === route && req.method === "GET") {
        const result = await handler(req);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(result)
        );
      }

      return;
    });
  }

  public listen(port: number): void {
    this.server.listen(port);
  }
}
