const express = require("express");

const { items } = require("./fakeDb")
const router = new express.Router();

// Each item should be a JavaScript object with the keys of name, and price.
// clear items each time server restarts

// GET /items: return list of shopping items:
//   { items: [
//     { name: "popsicle", price: 1.45 },
//     { name: "cheerios", price: 3.40 }
//   ]}

router.get("/", function(req, res) {
  return res.json({items: items});
})

// POST /items: accept JSON body, add item, and return it:
//   {name: "popsicle", price: 1.45} =>
//     {added: {name: "popsicle", price: 1.45}}

router.post("/", function(req, res) {
  const item = {};
  item.name = req.param.name;
  item.price = req.param.price;

  return res.json({added: item});
})

// GET /items/:name: return single item:
//   {name: "popsicle", "price": 1.45}

// PATCH /items/:name: accept JSON body, modify item, return it:
//   {name: "new popsicle", price: 2.45} =>
//     {updated: {name: "new popsicle", price: 2.45}}

// DELETE /items/:name: delete item:
//   {message: "Deleted"}

module.exports = { router };