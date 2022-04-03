import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(-1);
  const [money, setMoney] = useState();
  const [result, setResult] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((Json) => {
        setCoins(Json);
        setLoading(false);
      });
  }, []); //[]의 내용이 변경될때만 rerendering

  useEffect(() => {
    setPrice(coins[0].quotes.USD.price);
  }, [coins]);

  const onChange = (event) => {
    setPrice(event.target.value);
    setResult(0);
  };

  const onChangeMoney = (event) => setMoney(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    setResult(Math.floor(money / price));
    setMoney("");
  };
  return (
    <div>
      <h1>Coin</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange}>
          {coins.map((item, index) => (
            <option key={index} value={item.quotes.USD.price}>
              {item.name}({item.symbol}):{item.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
      <hr></hr>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="write your money"
          required
          value={money}
          onChange={onChangeMoney}
        ></input>
        <button>Change</button>
      </form>
      <p>{price !== -1 ? `coin-price: ${price}` : null}</p>
      your-coin:{result}
    </div>
  );
}

export default App;
