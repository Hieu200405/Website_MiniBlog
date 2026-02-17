const request = require("supertest");
const app = require("../src/app");

describe("API Endpoints", () => {
  it("should return welcome message for GET /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
