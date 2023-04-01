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
