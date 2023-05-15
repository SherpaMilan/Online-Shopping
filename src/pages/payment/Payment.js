import React from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import { PaymentOptions } from "../../components/payment/PaymentOptions";

export const Payment = () => {
  return (
    <DefaultLayout>
      <PaymentOptions />
    </DefaultLayout>
  );
};
