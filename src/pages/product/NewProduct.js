import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";

import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import slugify from "slugify";
// import { ProgressBar } from "react-toastify/dist/components";
import { useDispatch, useSelector } from "react-redux";
import { addNewProductAction } from "./ProductAction";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import ProgressBar from "react-bootstrap/ProgressBar";
import { fethCagegoriesAction } from "../category/categoryAction";

const NewProduct = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    status: "inactive",
  });
  const { cats } = useSelector((state) => state.cat);
  const [image, setImage] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    dispatch(fethCagegoriesAction());
  }, [dispatch]);

  //add handle onChange
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // handle on image attached

  const handleOnImageAttached = (e) => {
    const { files } = e.target;
    console.log(files[0], "mmfd");
    setImage(files[0]);
  };
  //add handle on Submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    const prod = {
      ...form,
      createdAt: Date.now(),
      slug: slugify(form.name, {
        trim: true,
        lower: true,
      }),
    };

    if (image) {
      //upload image and get publi url
      //process of uploading image to firestorage
      const storageRef = ref(
        storage,
        `/products/img/${Date.now()}-${image.name}`
      );

      const uploadImg = uploadBytesResumable(storageRef, image);

      uploadImg.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percent);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadImg.snapshot.ref).then((url) => {
            console.log(url);
            // setForm({
            //   ...form,
            //   thumbnail: url,
            // });
            dispatch(addNewProductAction({ ...prod, thumbnail: url }));
          });
        }
      );
    }

    //add public url to the produ and add product
  };
  //include constant inputs

  const inputs = [
    {
      label: "Product Name",
      name: "name",
      type: "text",
      placeholder: "Laptop",
      required: true,
      value: form.name,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "34",
      required: true,
      value: form.price,
    },
    {
      label: "Qty",
      name: "qty",
      type: "number",
      placeholder: "44",
      value: form.qty,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "30",
      value: form.salesPrice,
    },
    {
      label: "Sales Starts",
      name: "salesStarts",
      type: "date",
      value: form.salesStarts,
    },
    {
      label: "Sales Ends",
      name: "salesEnds",
      type: "date",
      value: form.salesEnds,
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      as: "textarea",
      value: form.description,
      rows: 10,
    },
  ];

  return (
    <DefaultLayout>
      <Link to="/products" className="btn btn-secondary mt-2">
        <AiOutlineLeft /> Back
      </Link>
      <h3 className="mt-4">Add New Product</h3>
      <hr />

      {/* form here */}

      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mt-3">
          <label htmlFor="">Select category</label>
          <Form.Select name="parentCat" required onChange={handleOnChange}>
            <option value="">-- Select One --</option>
            {cats.map((item) => (
              <option value={item.slug}>{item.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {inputs.map((item, i) => (
          <CustomInput {...item} onChange={handleOnChange} />
        ))}

        <Form.Group className="mt-3">
          <label htmlFor="">Select category</label>
          <Form.Control
            type="file"
            name="thumbnail"
            onChange={handleOnImageAttached}
          />
          <ProgressBar animated now={progress} />
        </Form.Group>

        <div className="mt-3 mb-5 d-grid">
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </div>
      </Form>
    </DefaultLayout>
  );
};

export default NewProduct;
