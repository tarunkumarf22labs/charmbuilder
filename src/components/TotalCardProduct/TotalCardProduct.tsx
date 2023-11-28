import { getDiscountedPrice } from "../../utils/currencyCalculation";

type Props = {
  title: string;
  price: string;
};

const TotalCardProduct = ({ title, price }: Props) => {
  return (
    <div className="total-card-product">
      <div className="total-card-product-title">
        <span>{title}</span>
      </div>
      <div className="total-card-product-price">
      <span
          className="money"
          dangerouslySetInnerHTML={{
            __html: price,
          }}
          style="white-space: nowrap;"
        ></span>
        <span
          className="money"
          dangerouslySetInnerHTML={{
            __html: getDiscountedPrice(price, 15),
          }}
          style="white-space: nowrap;"
        ></span>
        
      </div>
    </div>
  );
};

export default TotalCardProduct;
