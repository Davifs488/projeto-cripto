import { FormEvent, useEffect, useState } from "react";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

//https://coinlib.io/api/v1/coinlist?key=e0ef9ad54077fd62&pref
//https://sujeitoprogramador.com/api-cripto/?key=e0ef9ad54077fd62&pref

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24: string;
  market_cap: string;
  formatePrice: string;
  formatedMark: string;
}

interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navegate = useNavigate();

  useEffect(() => {
    function getData() {
      // fetch("https://coinlib.io/api/v1/coinlist?key=e0ef9ad54077fd62&pref=BRL")
      fetch(
        "https://sujeitoprogramador.com/api-cripto/?key=e0ef9ad54077fd62&pref=BRL"
      )
        .then((response) => response.json())
        .then((data: DataProps) => {
          let coinsData = data.coins.slice(0, 15);
          // console.log(coinsData);
          //a requisição deu tudo certo

          let price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatePrice: price.format(Number(item.price)),
              formatedMark: price.format(Number(item.market_cap)),
            };

            return formated;
          });
          // console.log(formatResult);
          setCoins(formatResult);
        });
    }

    getData();
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (inputValue === "") return;

    navegate(`/detail/${inputValue}`);

    // alert("TESTE");
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          placeholder="Digite o simbolo da moeda: BTC..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button type="submit">
          {/* <IoSearch size={30} color="#fff" /> */}
          <IoSearch size={30} />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.map((coin) => (
            <tr key={coin.name} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>

              <td className={styles.tdLabel} data-label="Mercado">
                {coin.formatedMark}
              </td>

              <td className={styles.tdLabel} data-label="Preço">
                {coin.formatePrice}
              </td>

              <td
                className={
                  Number(coin?.delta_24h) >= 0 ? styles.tdProfit : styles.tdLoss
                }
                data-label="Volume"
              >
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}

          {/* <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="Moeda">
              <Link className={styles.link} to="/detail/btc">
                <span>Bitcoin</span> | BTC
              </Link>
            </td>

            <td className={styles.tdLabel} data-label="Mercado">
              R$ 19987
            </td>

            <td className={styles.tdLabel} data-label="Preço">
              R$ 40.87889
            </td>

            <td className={styles.tdLoss} data-label="Volume">
              <span>- 5.3</span>
            </td>
          </tr> */}
        </tbody>
      </table>
    </main>
  );
}
