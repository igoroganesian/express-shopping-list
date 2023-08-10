const request = require("supertest");

const app = require("./app");

let items = [];

beforeEach(function () {
  items = [{ name: "popsicle", price: "2" }];
});

afterEach(function () {
  items = [];
});

describe("GET /items", function () {
  it("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual({ items: [] });
  });
});

describe("POST /items", function () {
  it("Creates a new item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "bacon",
        price: "5"
      });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added:
        {
          name: "bacon",
          price: "5"
        }
    });
  });
});

describe("PATCH /items/:name", function () {
  it("Updates a single item", async function () {
    const resp = await request(app)
      .patch(`/items/:name`)
      .send({
        name: "tortilla",
        price: "9"
      });
    expect(resp.body).toEqual({
      updated:
        {
          name: "tortilla",
          price: "9"
        }
    });
  });
  // it("Responds with 404 if name invalid", async function() {
  //   const resp = await request(app).patch(`/items/not-here`);
  //   expect(resp.statusCode).toEqual(404);
  // });
});

describe("DELETE /items/:name", function() {
  it("Deletes a single item", async function() {
    const resp = await request(app)
      .delete(`/items/:name`);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(items.length).toEqual(0);
  });
});




