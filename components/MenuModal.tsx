import styles from "./MenuModal.module.scss"
import Menu from "./Menu";
import Modal from "./Modal";
interface MenuModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const MenuModal = ({ showModal, setShowModal }: MenuModalProps) => (
  <div className={styles.modalContainer}>
    <Modal showModal={showModal} setShowModal={setShowModal} modalContent={<Menu />} />
  </div>
);

export default MenuModal;