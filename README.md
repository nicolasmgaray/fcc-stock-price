# FCC Stock Price Checker

<h2>User Stories</h2>

- Set the content security policies to only allow loading of scripts and css from your server.
- I can GET /api/stock-prices with form data containing a Nasdaq stock ticker and recieve back an object stockData.
- In stockData, I can see the stock(string, the ticker), price(decimal in string format), and likes(int).
- I can also pass along field like as true(boolean) to have my like added to the stock(s). Only 1 like per ip should be accepted.
- If I pass along 2 stocks, the return object will be an array with both stock's info but instead of likes, it will display rel_likes(the difference between the likes on both) on both.
- All 5 functional tests are complete and passing.

<h2>Example usage:</h2>

/api/stock-prices?stock=goog
/api/stock-prices?stock=goog&like=true
/api/stock-prices?stock=goog&stock=msft
/api/stock-prices?stock=goog&stock=msft&like=true


<h2>Example return</h2>

{"stockData":{"stock":"GOOG","price":"786.90","likes":1}}
{"stockData":[{"stock":"MSFT","price":"62.30","rel_likes":-1},{"stock":"GOOG","price":"786.90","rel_likes":1}]}

<h2>Live Example</h2>

[https://fcc-stock-price-project.glitch.me](https://fcc-stock-price-project.glitch.me)


