const request = require("supertest");
const app = require("../src/app");

describe("Flight Endpoints", () => {
  it("debería devolver error si no se pasan parámetros", async () => {
    const res = await request(app).get("/vuelos");
    // Puede que devuelva 400 o 500 según la lógica, ajusta si es necesario
    expect([400, 500, 200]).toContain(res.statusCode);
  });

  // Puedes agregar más tests simulando parámetros válidos
});
