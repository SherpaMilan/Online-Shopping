import React from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import { CategoryTable } from "../../components/category-mgmt/CategoryTable";
import { NewCategory } from "../../components/category-mgmt/NewCategory";

export const Category = () => {
  return (
    <DefaultLayout>
      <h3 className="mt-4">Category Mgmt</h3>

      <hr />
      {/* form here  */}
      <NewCategory />
      {/* table here  */}
      <CategoryTable />
    </DefaultLayout>
  );
};
