"use client";
import styles from "./Checkout.module.scss";
import usePaymentModalStore from "../store/usePaymentModalStore";
import { useEffect } from "react";
import ChoosePaymentMethod from "@/app/(checkout)/listings/[slug]/components/ChoosePaymentMethod";
import CardPaymentForm from "@/app/(checkout)/listings/[slug]/components/CardPaymentForm";
import InstantEftPayment from "@/app/(checkout)/listings/[slug]/components/InstantEftPayment";
import PaymentSuccess from "@/app/(checkout)/listings/[slug]/components/PaymentSuccess";

interface PaymentModalProps {
  id: string;
}

const Checkout = ({ id }: PaymentModalProps) => {
  const { showPaymentModal, setShowPaymentModal } = usePaymentModalStore();


  if (!id) {
    return null;
  }

  useEffect(() => {
    setShowPaymentModal(true);
  }, [setShowPaymentModal]);
  const renderContent = () => {
    if (id === "payment-method") return <ChoosePaymentMethod id = {id} />;
    if (id === "card") return <CardPaymentForm />;
    if (id === "instant-eft") return <InstantEftPayment />;
    if (id === "payment-success") return <PaymentSuccess />;
    return <div>Invalid payment step</div>;
  };
  return <div className={styles.container}>{renderContent()}</div>;
};

export default Checkout;
