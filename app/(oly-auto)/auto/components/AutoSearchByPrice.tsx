import styles from "./AutoSearchByPrice.module.scss";
import { formatPrice } from "@/utils/formatterFunctions/Formatter";
interface AutoSearchByPriceProps {}

const AutoSearchByPrice = ({}: AutoSearchByPriceProps) => {
  const data = [
    {
      id: 1,
      amount: 1000000,
      term: "Cash Purchase",
      interestRate: 10.5,
      note: "No financing needed if paying upfront",
    },
    {
      id: 2,
      amount: 1100000,
      term: 2,
      interestRate: "±R20,000/month @10.5%",
      note: "Shortest term — lowest total interest",
    },
    {
      id: 3,
      amount: 1250000,
      term: 4,
      interestRate: "±R20,000/month @10.5%",

      note: "Balanced term — balanced interest and flexibility",
    },
    {
      id: 4,
      amount: 1300000,
      term: 6,
      interestRate: "±R20,000/month @10.5%",

      note: "Longest term — most interest cost, most purchase power",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.searchOptions}>
        {data.map((item) => (
          <div className={styles.searchOption} key={item.id}>
            <div className={styles.searchAmountWrapper}>
              <p className={`${styles.term} ${styles.detail}`}>
                {item.id !== 1 ? (
                  <>
                    <span>{item.term}—year</span> finance term
                  </>
                ) : (
                  <span>{item.term}</span>
                )}
              </p>

              <p className={`${styles.amount} ${styles.detail}`}>
                <span>
                  {" "}
                  {formatPrice(item.amount, {
                    showCents: false,
                    formatMillions: false,
                    formatThousands: false,
                  })}
                </span>
              </p>
            </div>
            {item.id !== 1 && (
              <p className={`${styles.interestRate} ${styles.detail}`}>
                {item.interestRate}
              </p>
            )}

            <p className={styles.note}>{item.note}</p>
          </div>
        ))}
      </div>

      <p className={styles.disclosure}>
        Estimates based on a 10.5% interest rate. Actual rates vary.
      </p>
    </div>
  );
};

export default AutoSearchByPrice;
