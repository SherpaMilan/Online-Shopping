import React from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import { ProductTable } from "../../components/product-mgmt/ProductTable";

const Product = () => {
  return (
    <DefaultLayout>
      <h3 className="mt-4">Product Mgmt.</h3>
      <hr />

      {/* table here */}
      <ProductTable />
    </DefaultLayout>
  );
};

export default Product;
