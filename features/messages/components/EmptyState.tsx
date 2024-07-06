import styles from "./EmptyState.module.scss";
import "./globals.css";

const EmptyState = () => {
  return (
    <div
      className="
        px-4
        py-10
        sm:px-6
        lg:px-8
        h-full
        flex
        justify-center
        items-center
        bg-gray-100
  "
    >
      Start chatting now!
    </div>
  );
};

export default EmptyState;
