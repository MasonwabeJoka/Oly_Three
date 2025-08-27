import PriceClient from "./PriceClient";

interface Props {
  onNext: () => void;
}

  const Price =({ onNext }: Props)=> {
    return <PriceClient onNext={onNext}  />;
  }

  export default Price;
