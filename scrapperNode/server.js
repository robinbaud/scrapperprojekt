const fastify = require("fastify")({ logger: true });
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const mongoose = require("mongoose");
const Recipes = require("./models/recipes.js");

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(
      "mongodb+srv://robin:robin@schoolmaterialcluster.xhun1xs.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((err) => console.log(err));
}
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});
fastify.post("/recipes", async (req, res) => {
  const recipe = new Recipes({ ...req.body });
  await recipe
    .save()
    .then(() => res.status(201).send(recipe))
    .catch((error) => res.status(400).send({ error }));
});
fastify.get("/all", (req, reply) => {
  Recipes.find().then((r) => {
    reply.send(r);
  });
});
fastify.post("/all", (req, res) => {
  fs.readFile("../scrapper/data.json", "utf8", (err, jsonString) => {
    if (err) {
      res.send(err);
      return;
    }
    const data = JSON.parse(jsonString);
    data.map(async (datum, index) => {
      const element = {
        titre: datum.Title,
        ingredients: datum.Ingredients,
      };
      const recipe = new Recipes({ ...element });
      await recipe
        .save()
        .then(() => res.status(201).send(recipe))
        .catch((error) => res.status(400).send({ error }));
    });
  });
});
// function getLinks() {
//   const linksMap = [];
//   axios("https://www.allrecipes.com/recipes/17562/dinner/").then((res) => {
//     const html = res.data;
//     const $ = cheerio.load(html);

//     const linkscard = $(".mntl-card-list-items");

//     linkscard.each((i, card) => {
//       const link = $(card).attr("href");
//       if (link.includes("https://www.allrecipes.com/recipe")) {
//         linksMap.push({ Link: link });
//       }
//     });
//   });

//   return linksMap;
// }
// const links = getLinks();

// setTimeout(() => {
//   links.map((link, i) => {
//     axios.get(link.Link).then((r) => {
//       const $ = cheerio.load(r.data);
//       const title = $("h1").text();
//       const titleTab = title.split("\n");
//       const ingredients = $(".mntl-structured-ingredients__list-item").text();
//       const ingredientsTab = ingredients.split("\n");
//       link["Title"] = titleTab.filter((i) => i.length > 0)[0];
//       link["Ingredients"] = ingredientsTab.filter((i) => i.length > 0);
//     });
//   });
// }, 2000);
// setTimeout(() => {
//   links.map((link) => {
//     axios.post("http://127.0.0.1:3000/recipes", {
//       titre: link.Title,
//       ingredients: link.Ingredients,
//     });
//   });
// }, 10000);
// setTimeout(() => {
//   links.map((link) => {
//     axios.post("http://127.0.0.1:8000/api/recipes", {
//       name: link.Title,
//       ingredients: link.Ingredients,
//     });
//   });
// }, 10000);
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
