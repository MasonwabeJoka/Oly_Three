import { useFormContext } from "react-hook-form";

interface Props {
  onNext: () => void;
}
const ListingType = ({ onNext }: Props) => {
  const { setValue } = useFormContext();
  
  const handleChoice = (type: 'sale' | 'auction') => {
    setValue('listingType', type);
    onNext();
  };

  return (
    <div>
      <button onClick={() => handleChoice('sale')}>Fixed Price Sale</button>
      <button onClick={() => handleChoice('auction')}>Auction</button>
    </div>
  );
};
export default ListingType;