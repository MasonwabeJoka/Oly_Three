import styles from "./ChoosePaymentMethod.module.scss";

import Icon from "@/components/Icon";
import { PaymentFormWrapper } from "./PaymentFormWrapper";

interface ChoosePaymentMethodProps {
  
}

const ChoosePaymentMethod = ({}: ChoosePaymentMethodProps) => {
   const attachments = [
    {
      id: "1",
      title: "Invoice.pdf",
      url: "/uploads/invoice.pdf",
      size: "250KB",
      type: "application/pdf",
      uploadedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Contract.pdf",
      url: "/uploads/contract.pdf",
      size: "1.2MB",
      type: "application/pdf",
      uploadedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Blueprint.pdf",
      url: "/uploads/blueprint.pdf",
      size: "3.5MB",
      type: "application/pdf",
      uploadedAt: new Date().toISOString(),
    },
  ];
  return (
    <PaymentFormWrapper title="Choose Payment Method">
      <div className={styles.wrapper}>
        {attachments?.map((attachment: any) => (
          <div key={attachment.id} className={styles.attachmentContainer}>
            <div className={styles.iconContainer}></div>
            <div className={styles.text}>
              <p className={styles.title}>{attachment.title}</p>
            </div>
            
            
          </div>
        ))}
      </div>
    </PaymentFormWrapper>
  );
};

export default ChoosePaymentMethod;