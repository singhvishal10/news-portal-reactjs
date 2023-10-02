
function getMarketData(marketSymbol) {
    // fetching stockmarket data from proxy server hosted on https://newsylandstockmarketindexserver.onrender.com
    const url = 'https://newsylandstockmarketindexserver.onrender.com/stockMarketData/' + marketSymbol;
    return fetch(url).then((res) => res.json());
  };

export default getMarketData;