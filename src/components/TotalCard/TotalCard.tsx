import { currencyCalculation } from "../../utils/currencyCalculation";
import TotalCardProduct from "../TotalCardProduct/TotalCardProduct";
import "./TotalCard.css";

const TotalCard = ({ handleClick, data }) => {
  // console.log("Cart Total ",data)
 
  return (
    <div className="total-card br-1">
      <div className="total-cart-heading">
        <div className="total-card-text">Total Price</div>
        <div className="total-card-price">
          <span
            className="money"
            dangerouslySetInnerHTML={{
              __html: currencyCalculation(data),
            }}
          ></span>
          <span
            className="money"
            dangerouslySetInnerHTML={{
              __html: currencyCalculation(data, 15),
            }}
          ></span>
        </div>
      </div>
      <div className="total-card-items">{data.length} Items</div>
      <div className="total-card-products">
        {data.map((prev) => {
          return <TotalCardProduct {...prev} />;
        })}
      </div>
      <div
        className="act-wrapper"
        style="display: flex; justify-content: center; align-item: center; gap: 1rem;"
      >
        <button
          className="act-btn"
          onClick={handleClick}
          style=""
        >
          Buy Now
        </button>
      </div>
      {/* <div className="show-all">Show All</div> */}
    </div>
  );
};

export default TotalCard;
