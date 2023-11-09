type Props = {
    title: string,
    price: string
};

const TotalCardProduct = ({title, price}: Props) => {
  return (
    <div className="total-card-product">
      <div className="total-card-product-title">
        <span>{title}</span>
      </div>
      <span
        className="money"
        dangerouslySetInnerHTML={{
          __html: price,
        }}
      ></span>
    </div>
  );
};

export default TotalCardProduct;