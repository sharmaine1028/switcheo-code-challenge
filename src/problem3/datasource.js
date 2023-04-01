import express from "express";
import request from "request";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/jokes/random", (req, res) => {
  request(
    { url: "https://cors-anywhere.herokuapp.com/" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }

      res.json(JSON.parse(body));
      console.log(res);
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

class Datasource {
  constructor(url) {
    this.url = url;
    this.proxy = "https://cors-anywhere.herokuapp.com/";
  }

  async getPrices() {
    const response = await fetch(this.proxy + this.url);
    const data = await response.json();
    const prices = data.data.prices.map((price) => {
      return new Price(price.pair, price.buy, price.sell);
    });

    return prices;
  }
}

class Price {
  constructor(pair, buy, sell) {
    this.pair = pair;
    this.buy = buy;
    this.sell = sell;
  }

  mid() {
    return (this.buy + this.sell) / 2;
  }

  quote() {
    return this.pair.substring(3);
  }
}

const ds = new Datasource("https://interview.switcheo.com/test.json");
ds.getPrices()
  .then((prices) => {
    prices.forEach((price) => {
      console.log(
        `Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
