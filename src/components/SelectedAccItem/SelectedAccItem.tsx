type Props = {
  image: string;
  title: string;
  type: string;
  price: string;
};

const SelectedAccItem = ({ image, title, type, price }: Props) => {
  return (
    <div className="charmproduct-details">
      <div className="selected-product-img">
        <img src={image} alt="product_img" />
      </div>
      <div className="selected-product-text">
        <div className="selected-product-info">
          <p className="title">{title}</p>
          <p className="color">Color: {type}</p>
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
