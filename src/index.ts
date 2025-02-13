import { MockFastifyInstance } from "./mock-fastify-instance";

const fastifyInstance = new MockFastifyInstance();

fastifyInstance.get<{ message: string }>("/hello", async (req) => {
  return { message: `Hello, world! ${req.url}` };
});

fastifyInstance.listen(3001);