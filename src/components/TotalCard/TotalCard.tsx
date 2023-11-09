import { currencyCalculation } from "../../utils/currencyCalculation";
import TotalCardProduct from "../TotalCardProduct/TotalCardProduct";
import "./TotalCard.css";

const TotalCard = ({ handleClick, data }) => {
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
          className="acc-body"
          onClick={handleClick}
          style="max-height: none;border: 1px solid;padding: 10px;background: #6E2637;color: white;  height: 35px; width: 249px; padding: 3px 28px; font-size: 18px;"
        >
          Buy Now
        </button>
      </div>
      {/* <div className="show-all">Show All</div> */}
    </div>
  );
};

export default TotalCard;
