const request = require("supertest");
const app = require("../src/app");
const { User } = require("../src/db");

beforeAll(async () => {
  // Limpia la tabla de usuarios antes de correr los tests
  await User.destroy({ where: {} });
});

describe("User Endpoints", () => {
  it("debería crear un usuario", async () => {
    const res = await request(app).post("/users").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", "testuser@example.com");
    expect(res.body).not.toHaveProperty("password");
  });

  it("debería obtener todos los usuarios", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).not.toHaveProperty("password");
  });
});
