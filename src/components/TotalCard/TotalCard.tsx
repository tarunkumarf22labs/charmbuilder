import { currencyCalculation } from '../../utils/currencyCalculation';
import './TotalCard.css';

const TotalCard = ({handleClick , data }) => {
  
  return (
    <div className="total-card br-1">
      <div className="total-cart-heading">
        <div className="total-card-text">Total Price</div>
        <div className="total-card-price" >
            <span    className="money"
            dangerouslySetInnerHTML={{
              __html: currencyCalculation(data),
            }} ></span>
            </div>
      </div>
      <div className="total-card-items">{data.length} Items</div>
      <div className="total-card-products">
        {/* <div className="total-card-product">
          <div className="total-card-product-title">
            <span>Baby Clip Choker</span>
            <span>(White Gold)</span>
          </div>
          <div className="total-card-product-price">$75</div>
        </div> */}
        {data.map((prev) => {
            return(
                <div className="total-card-product">
          <div className="total-card-product-title">
            <span>{prev.title}</span>
          </div>
          <span className="money"
           dangerouslySetInnerHTML={{
            __html: prev.price,
          }}
          ></span>
        </div>
            )
        } )}
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
            Add to Bag
          </button>
        </div>
      {/* <div className="show-all">Show All</div> */}
    </div>
  );
};

export default TotalCard;
