import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { useParams } from "react-router-dom";

interface CoinProp {
  symbol: string;
  name: string;
  price: string;
  market_cap: string;
  low_24: string;
  high_24: string;
  total_volume_24: string;
  delta_24: string;
  formatedPrice: string;
  formatedMarket: string;
  formatedLowprice: string;
  formatedHighprice: string;
  error?: string;
}

export function Detail() {
  const { cripto } = useParams();
  const [detail, setDetail] = useState<CoinProp>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getData() {
      fetch(
        // `https://coinlib.io/api/v1/coinlist?key=e0ef9ad54077fd62&pref=${cripto}`
        `https://coinlib.io/api/v1/coin?key=e0ef9ad54077fd62&pref=BRL&symbol=${cripto}`
      )
        .then((response) => response.json())
        .then((data: CoinProp) => {
          let price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const reusltData = {
            ...data,
            formatedPrice: price.format(Number(data.price)),
            formatedMarket: price.format(Number(data.market_cap)),
            formatedLowprice: price.format(Number(data.low_24)),
            formatedHighprice: price.format(Number(data.high_24)),
          };

          setDetail(reusltData);
          setLoading(false);
        });
    }

    getData();
  }, [cripto]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando informações ...</h4>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{detail?.name}</h1>
      <p className={styles.center}>{detail?.symbol}</p>

      <section className={styles.container}>
        <p>
          <strong>Preço:</strong>
          {detail?.formatedPrice}
        </p>

        <p>
          <strong>Maior Preço 24h:</strong>
          {detail?.formatedHighprice}
        </p>

        <p>
          <strong>Menor Preço 24h:</strong>
          {detail?.formatedLowprice}
        </p>

        <p>
          <strong>Delta 24h:</strong>
          {detail?.delta_24}
        </p>
        <p>
          <strong>Valor mercado:</strong>
          {detail?.formatedMarket}
        </p>
      </section>
    </div>
  );
}
