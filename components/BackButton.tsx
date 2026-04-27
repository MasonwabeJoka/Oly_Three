'use client'
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import Button from "./Buttons";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      buttonType="round"
      buttonSize="medium"
      name="back"
      type="button"
      ariaLabel="Go back"
      autoFocus={false}
      onClick={handleBack}
      buttonChildren={
        <Icon
          src="/icons/left-arrow.png"
          alt="Go back"
          width={20}
          height={20}
        />
      }
    />
  );
};

export default BackButton;