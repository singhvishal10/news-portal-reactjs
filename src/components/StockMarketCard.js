import React, { useEffect, useState } from "react";
import getMarketData from "../services/StockMarketService";
import {
  UilArrowDown,
  UilArrowUp,
} from "@iconscout/react-unicons";
import {PuffLoader} from "react-spinners";

const stockMarketsSymbol = ['NSEI','BSESN','IXIC','DJI'];


function StockMarketCard() {

  const [stockMarketsData, setstockMarketsData] = useState(null);

  useEffect( () => {
    let aStockMarketsData = [];
    let countOfMarketDataRead = 0;
    stockMarketsSymbol.forEach(async (marketSymbol,index,object) => {
      await getMarketData(marketSymbol).then((res) => {
          let responseMarketDataFromAPI = res.quoteResponse.result[0];
          aStockMarketsData.push(responseMarketDataFromAPI);
          countOfMarketDataRead++;
        if(countOfMarketDataRead === object.length){
          setstockMarketsData(aStockMarketsData);
        }
      });
    });
  },[]);

  return (
    <div className="card mb-6 text-bg-light border-primary">
          <div className="card-header border-primary">Stock Market Update</div>
            <div className="card-body">
              {
                stockMarketsData === null ?  <><div>
                <p>Trying to Fetch Latest Stock Market Update</p>
              </div>
              <div className="card-text">
              <div className="row" style={{display:'flex',alignItems:'center'}}>
              <div style={{width: '100px', margin: 'auto', display: 'block'}}>
                      <PuffLoader	
                              loading={true}
                              size={100}
                              sizeunit={"px"}
                              color="#3498db"
                            />
                  </div>
              </div>
              </div></> :
            <div className="list-group">
              {stockMarketsData.map((market) => {
                return (
                  <div key={market.exchange}>
                      <a href={`https://finance.yahoo.com/quote/%5E${market.symbol.slice(1)}`} 
                      className={market.regularMarketChangePercent > 0 ? "list-group-item list-group-item-action flex-fill align-items-start list-group-item-success"
                                                                        : "list-group-item list-group-item-action flex-fill align-items-start list-group-item-danger" }>
                        <div className="ms-2 me-auto">
                          <div className="row">
                            <div className="col-md-4 align-middle">
                              <div className="fw-bold">{market.shortName}</div>
                              {/* 52 Week Range
                              <p>{market.fiftyTwoWeekRange}</p> */}
                            </div>
                            <div className="col-md-2">
                              Index
                              <p>{market.regularMarketPrice.toFixed(2)}</p>
                            </div>
                            <div className="col-md-2">
                              Day High
                              <p>{market.regularMarketDayHigh.toFixed(2)}</p>
                            </div>
                            <div className="col-md-2">
                              Day Low
                              <p>{market.regularMarketDayLow.toFixed(2)}</p>
                            </div>
                            <div className="col-md-2">
                            <span className={market.regularMarketChangePercent > 0 ? "badge bg-success rounded-pill" : "badge bg-danger rounded-pill"}>
                            { market.regularMarketChangePercent > 0 && <UilArrowUp/>} {market.regularMarketChangePercent < 0 && <UilArrowDown/>}
                            {market.regularMarketChangePercent < 0 ? market.regularMarketChangePercent.toFixed(2)*-1 : market.regularMarketChangePercent.toFixed(2)}%
                        </span>
                        {/* <span className={market.regularMarketChangePercent < 0 ? "badge bg-danger rounded-pill" : "invisible"}>
                           &#8595; {market.regularMarketChangePercent.toFixed(3)}%
                        </span> */}
                            </div>
                          </div>
                        </div>
                      </a>
                  </div>
                );
              })}
            </div>
}
          </div>
    </div>
  );
}

export default StockMarketCard;
