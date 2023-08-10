const express = require("express");
const { BadRequestError } = require("./expressError");

const items = require("./fakeDb");

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
  if (req.body === undefined) throw new BadRequestError();
  console.log("PARAMS>>>>>>", req.body);

  const item = {};
  item.name = req.body.name;
  item.price = req.body.price;
  items.push(item);

  return res.json({added: item});
})

router.get("/:name", function(req, res) {
  for (let item of items) {
    if (item.name === req.params.name) {
      return res.json({item})
    } else {
      throw new BadRequestError("Item not found");
    }
  }
})

router.patch("/:name", function(req, res) {
  for (let item of items) {
    if (item.name === req.params.name) {
      item.name = req.body.name;
      item.price = req.body.price;
      return res.json({updated: {item}})
    } else {
      throw new BadRequestError("Item not found")
    }
  }
})

router.delete("/:name", function(req, res) {
  for (let item in items) {
    if (items[item].name === req.params.name) {
      items.splice(item, 1);
      return res.json({message: "deleted"});
    } else {
      throw new BadRequestError("Item not found");
    }
  }
})



// GET /items/:name: return single item:
//   {name: "popsicle", "price": 1.45}

// PATCH /items/:name: accept JSON body, modify item, return it:
//   {name: "new popsicle", price: 2.45} =>
//     {updated: {name: "new popsicle", price: 2.45}}

// DELETE /items/:name: delete item:
//   {message: "Deleted"}

module.exports = router;