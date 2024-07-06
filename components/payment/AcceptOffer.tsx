import styles from './AcceptOffer.module.scss'
const ItemDetailPage = () => {
  return (
    <div>
      <h1>Item Name</h1>
      <p>Description of the item being sold.</p>
      <p>Price: R100</p>
      <button>Accept Offer</button>
      <p>Offer accepted. Please proceed to payment.</p>
    </div>
  );
};

export default ItemDetailPage;
