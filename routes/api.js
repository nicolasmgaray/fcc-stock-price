"use strict";

const fetch = require("node-fetch");
const url = symbol =>
  `https://repeated-alpaca.glitch.me/v1/stock/${symbol}/quote`;

let likes = {}

const getLikes = symbol => {
  symbol = symbol.toUpperCase();
  if(!likes[symbol]) return 0;
  else return likes[symbol].length
};

const addLikes = (symbol, ip) => {
  symbol = symbol.toUpperCase();
  if(!likes[symbol]) likes[symbol] = [ip];
  else{
    if(!likes[symbol].includes(ip)) likes[symbol] = [...likes[symbol],ip]
  }
};

const getIP = req => {
  if(!req.headers["x-forwarded-for"]) return 'localhost'
  let forwards = req.headers["x-forwarded-for"].split(",");
  return forwards[0];
};

module.exports = function(app) {
  app.route("/api/stock-prices").get(async (req, res) => {
    const { stock, like } = req.query;
    if (Array.isArray(stock)) {
      if (like == 'true') stock.map(x => addLikes(x, getIP(req)));
      let operations = stock.map(async x => {
        const response = await fetch(url(x));
        const json = await response.json();    
        return {
          stock: json.symbol,
          price: json.latestPrice          
        };
      });
      let data = await Promise.all(operations)      
      data[0].relLikes = getLikes(data[0].stock) - getLikes(data[1].stock) 
      data[1].relLikes = - data[0].relLikes;
      res.json({ stockData: data });
    } else {
      if (like == 'true') addLikes(stock, getIP(req))
      const response = await fetch(url(stock));
      const json = await response.json();      
      res.json({
        stockData: {
          stock: json.symbol,
          price: json.latestPrice,
          likes: getLikes(json.symbol)
        }
      });
    }
  });
};
