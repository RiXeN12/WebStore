import NoImageProduct from "../assets/images/noImageProduct.png";
import APP_ENV from "../env";

const productImage = (productImage) => {
  if (productImage !== undefined)
    return productImage === "N/A"
      ? NoImageProduct
      : `${APP_ENV.PRODUCT_IMAGE_URL}${productImage}`;
  else return NoImageProduct;
};

export default productImage;