const axios = require("axios");
const cheerio = require("cheerio");

function getLinks() {
  const linksMap = [];
  axios("https://www.allrecipes.com/recipes/17562/dinner/").then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);

    const linkscard = $(".mntl-card-list-items");

    linkscard.each((i, card) => {
      const link = $(card).attr("href");
      if (link.includes("https://www.allrecipes.com/recipe")) {
        linksMap.push({ Link: link });
      }
    });
  });

  return linksMap;
}
const links = getLinks();

setTimeout(() => {
  links.map((link, i) => {
    axios.get(link.Link).then((r) => {
      const $ = cheerio.load(r.data);
      const title = $("h1").text();
      const titleTab = title.split("\n");
      const ingredients = $(".mntl-structured-ingredients__list-item").text();
      const ingredientsTab = ingredients.split("\n");
      link["Title"] = titleTab.filter((i) => i.length > 0)[0];
      link["Ingredients"] = ingredientsTab.filter((i) => i.length > 0);
    });
  });
}, 2000);
setTimeout(() => {
  links.map((link) => {
    axios.post("http://127.0.0.1:3000/recipes", {
      titre: link.Title,
      ingredients: link.Ingredients,
    });
  });
}, 10000);
// setTimeout(() => {
//   links.map((link) => {
//     axios.post("http://127.0.0.1:8000/api/recipes", {
//       name: link.Title,
//       ingredients: link.Ingredients,
//     });
//   });
// }, 10000);