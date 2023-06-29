import { currencyCalculation } from "../../utils/currencyCalculation";

function ItemCard({ orderdata }: { orderdata: any }) {
  return (
    <div className="acc-body">
      <div className="grid">
        <div className="con-1">Add Bracelets</div>

        <div className="price">{currencyCalculation(orderdata)}</div>
      </div>
      <h4>ADDED ITEMS</h4>
      <div className="grid">
        {orderdata.map((data) => {
          return (
            <>
              <div className="con-1">{data.title}</div>
              <div className="con-1">{data.price}</div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ItemCard;
