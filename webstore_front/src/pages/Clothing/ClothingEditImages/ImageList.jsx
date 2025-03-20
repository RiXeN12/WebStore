import React from "react";
import { useSelector } from "react-redux";
import ImageItem from "./ImageItem";
import productImage from "../../../hooks/productImage";

const ImageList = () => {
  const { currentClothingItem } = useSelector((state) => state.product);
  const images = currentClothingItem.images;

  return (
    <div>
      {images.length === 0 ? (
        <img
          height="200"
          alt="Product Image"
          loading="lazy"
          src={productImage(undefined)}
        />
      ) : (
        <div className="d-flex gap-3 flex-wrap justify-content-center">
          {images.map((image) => (
            <ImageItem key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageList;
