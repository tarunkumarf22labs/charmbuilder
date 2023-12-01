const SelectedAccItem = ({
  image,
  title,
  type,
  price,
  setOrder,
  order,
  setEdit,
  setSelectedProduct,
  selectedProduct,
}: any) => {
  console.log("SelectedProd", selectedProduct);
  console.log("order", order);

  const removeSelectedProduct = (title) => {
    setEdit(false);
    setSelectedProduct(() => {
      let updateSelectedProduct = selectedProduct.filter(
        (item) => item.title !== title
      );
      if (updateSelectedProduct.length === 0) {
        setEdit(true);
      }
      return updateSelectedProduct;
    });

    setOrder(() => {
      let orderHavingRequiredTitle = order.data.find(
        (item) => item.title == title
      );

      if (orderHavingRequiredTitle) {
        let updatedOrderdata = order.data.filter(
          (item) => item.title !== title
        );
        let updatedOrder = order.order.filter((item) => item.title !== title);

        return {
          ...order,
          data: [...updatedOrderdata],
          order: [...updatedOrder],
        };
      }
      return;
    });
  };
  return (
    <div className="charmproduct-details">
      <div className="selected-product-img">
        <img src={image} alt="product_img" />
      </div>
      <div className="selected-product-text">
        <div className="selected-product-info">
          <p className="title">{title}</p>
          <p className="color">Color: {type}</p>
          <span
            className="selected-product-remove-btn"
            onClick={() => removeSelectedProduct(title)}
          >
            Remove
          </span>
        </div>
        <span
          className="money"
          style="text-align: end; font-weight: 600; width: 80px; white-space: nowrap;"
          dangerouslySetInnerHTML={{ __html: price }}
        ></span>
      </div>
    </div>
  );
};
export default SelectedAccItem;
