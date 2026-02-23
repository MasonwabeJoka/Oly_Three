import styles from './AddProduct.module.scss'
import AddProductForm from './AddProductForm';
import { PageHeader } from './PageHeader';

interface AddProductProps {
  
}

const AddProduct = ({}: AddProductProps) => {
  return (
    <div className={styles.container}>
        <PageHeader>Add Product</PageHeader>
        <AddProductForm/>
    </div>
  );
};

export default AddProduct;