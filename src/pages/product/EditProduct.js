import React, { useEffect, useRef, useState } from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AiOutlineLeft } from "react-icons/ai";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { Button, Form } from "react-bootstrap";
import slugify from "slugify";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProductAction,
  fethProductsAction,
  fethSelectedProductAction,
} from "./ProductAction";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../config/firebaseConfig";
import ProgressBar from "react-bootstrap/ProgressBar";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { fethCagegoriesAction } from "../category/categoryAction";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const [image, setImage] = useState();
  const [progress, setProgress] = useState(0);
  const [imageToDelete, setImageToDelete] = useState([]);
  const [fetchProductRef, setFetchProductRef] = useState(true);

  const { slug } = useParams();
  console.log(slug);

  const { cats } = useSelector((state) => state.cat);
  const { selectedProd } = useSelector((state) => state.prods);

  useEffect(() => {
    dispatch(fethCagegoriesAction());
    console.log(selectedProd);
    //fetch the selected project and mount in redux
    fetchProductRef && dispatch(fethSelectedProductAction(slug));
    setFetchProductRef(false);
    setForm(selectedProd);
  }, [slug, selectedProd, dispatch, fetchProductRef]);

  const handleOnChange = (e) => {
    !fetchProductRef && setFetchProductRef(false);
    let { name, value, checked } = e.target;
    console.log(name, value, checked);

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    if (name === "thumbnail" && checked) {
      if (imageToDelete.includes(value)) {
        return toast.error(
          "Please untick the delete checkbox  first before attemping to make it thumbnail"
        );
      }
    }

    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnImageAttached = (e) => {
    //1. put image in the state
    const { files } = e.target;

    setImage([...files]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // console.log(form, image);
    const { createdAt, ...rest } = form;
    //2. upload imge to the firebase and get the downloadable url
    try {
      if (image?.length) {
        const urlArg = image.map((img) => {
          return new Promise((resolve, reject) => {
            const storageRef = ref(
              storage,
              `products/img/${Date.now()}-${img.name}`
            );

            // uploading image
            const uploadImg = uploadBytesResumable(storageRef, img);

            //monitoring every chang during the upload
            uploadImg.on(
              "state_changed",
              (snapshot) => {
                console.log(snapshot);
                const percentage = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(percentage);
                setProgress(percentage);
              },
              (error) => {
                toast.error("there was an error uploading image");
                console.log(error);
              },
              async () => {
                await getDownloadURL(uploadImg.snapshot.ref).then((url) => {
                  resolve(url);
                });
              }
            );
          });
        });
        //map ends

        //resolve all promises im the arrau

        const imageLinkList = await Promise.all(urlArg);

        // 3. add the img url to thumbnail property and updte the procuct

        rest.images = imageLinkList; //array
      } //if ends

      //remove imageToDelete list from rest.image array
      if (imageToDelete.length && rest.images) {
        const imgArg = rest.images.filter(
          (img) => !imageToDelete.includes(img)
        );
        rest.images = imgArg;
      }

      rest.images = [...rest.images, rest.thumbnail];

      dispatch(addNewProductAction(rest));

      setImageToDelete([]);
      setImage([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", slug));
        toast.success("the product has bee deleted");
        dispatch(fethProductsAction());
        navigate("/products");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

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

  const handleOnImageDeleteSelect = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);

    if (checked) {
      if (value === form.thumbnail) {
        return toast.error(
          "Please change your thumbnail first before attemping to delete"
        );
      }
      setImageToDelete([...imageToDelete, value]);
    } else {
      setImageToDelete(imageToDelete.filter((img) => img !== value));
    }
  };

  return (
    <DefaultLayout>
      <Link to="/products" className="btn btn-secondary mt-2">
        <AiOutlineLeft /> Back
      </Link>
      <h3 className="mt-4">Update New Product</h3>
      <hr />

      {/* form   here */}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mt-3">
          <Form.Check
            type="switch"
            name="status"
            label="Status"
            onChange={handleOnChange}
            checked={form.status === "active"}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <label htmlFor="">Select category</label>
          <Form.Select name="parentCat" required>
            <option value="">-- Select One --</option>
            {cats.map((item) => (
              <option value={item.slug} selected={item.slug === form.parentCat}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {inputs.map((item, i) => (
          <CustomInput {...item} onChange={handleOnChange} />
        ))}

        {/* existing images of the product */}
        <div className="p-3 d-flex gap-2 flex-wrap ">
          {form?.images?.map((img) => (
            <div className="shadow-lg p-2" key={img}>
              <Form.Check
                value={img}
                type="radio"
                name="thumbnail"
                label="Thumbnail"
                onChange={handleOnChange}
                checked={form.thumbnail === img}
              />
              <img src={img} alt="product" width="200px" />
              <Form.Check
                label="Delete"
                onChange={handleOnImageDeleteSelect}
                value={img}
                checked={imageToDelete.includes(img)}
              />
            </div>
          ))}
        </div>
        <Form.Group className="mt-3">
          <label htmlFor="">Select category</label>
          <Form.Control
            type="file"
            name="thumbnail"
            onChange={handleOnImageAttached}
            multiple
          />
          <ProgressBar animated now={progress} />
        </Form.Group>
        <div className="mt-3 mb-5 d-grid">
          <Button variant="primary" type="submit">
            Update Product
          </Button>
        </div>
      </Form>
      <div className="d-grid">
        <Button variant="danger mb-3" onClick={handleOnDelete}>
          Delete
        </Button>
      </div>
    </DefaultLayout>
  );
};

export default EditProduct;
