import { useState } from "uelements";
import "./RecommProduct.css";
import { SelectIcon } from "../../assets/icons";
import { memo } from "preact/compat";

const RecommProduct = ({
  title,
  images,
  id,
  variants,
  Setorder,
  setSelectedProduct,
  setEdit,
  money
}) => {
  const [isChecked, setIsChecked] = useState(false);
  function handleIsChecked(event) {
    event.stopPropagation();
    event.preventDefault();
   
    const id = variants[0].id.match(/\d+/)[0];
    setIsChecked((prev) => !prev);
    setEdit(false);

   
    if (isChecked) {
      setSelectedProduct((prev) => {
        let data = prev.filter((item) => item.title !== title);
        if (data.length === 0) {
          setEdit(true);
        }
        return data;
      });


      Setorder((prev) => {
        let data = prev.data.filter((item) => item.title !== title);
        let order = prev.order.filter((item) => item.title !== title);
        return {
          ...prev,
          data,
          order,
        };
      });
    } else {
      Setorder((prev) => {
        let data = prev.data.filter((item) => item.title !== title);
        let order = prev.order.filter((item) => item.title !== title);
        return {
          ...prev,
          data: [
           ...data,
            {
              title,
              image: images[0].src,
              price: money,
              id
            },
          ],
          order: [
            ...order,
            {
              quantity: 1,
              id,
              title,
            },
          ],
        };
      });
      setSelectedProduct((prev) => [
        ...prev,
        {
          id,
          title: title,
          price: money,
          image : images[0].src,
          type :  variants[0].title,
        },
      ]);
    }
  }

  function handlevaluechange(id , value , money){     
    setEdit(false);
    setIsChecked(true);
    Setorder((prev) => {
      let data = prev.data.filter((item) => item.title !== title);
      let order = prev.order.filter((item) => item.title !== title);
      return {
        ...prev,
        data: [
         ...data,
          {
            title,
            price: money,
            id : id.replace(
              /gid:\/\/shopify\/ProductVariant\//,
              ""
            ),
          },
        ],
        order: [
          ...order,
          {
            quantity: 1,
            id : id.replace(
              /gid:\/\/shopify\/ProductVariant\//,
              ""
            ) ,
            title,
          },
        ],
      };
    });
    setSelectedProduct((prev) => {
      let data = prev.filter((item) => item.title !== title);
      return  [
      ...data,
      {
        id,
        title: title,
        price: money,
        image: images[0].src,
        type : value,
      },
    ] 
    });
  }

  return (
    <div className="recomm-product">
      <div className="recomm-product-img-wrapper">
        <label for={id} style={{cursor: 'pointer'}}>
          <img src={images[0].src} alt="product_img" />
        </label>
        <input
          type="checkbox"
          name=""
          id={id}
          checked={isChecked}
          onChange={handleIsChecked}
        />
        {isChecked ? <SelectIcon  onClick={(event)=> handleIsChecked(event)} /> : <span className="select-icon" onClick={(event)=> handleIsChecked(event)}></span>}
      </div>
      <div className="recomm-product-info">
      <a href="#" class="recomm-product-link">
        <div class="recomm-product-title">{title}</div>
        <span className="money"  dangerouslySetInnerHTML={{ __html: money }} ></span>
      </a>

      <select
         id = "recomm-product-variant-selector"
        onChange={(event) => {
          let data = (event.target as HTMLInputElement).value
          let value = (event.target as HTMLSelectElement).selectedOptions[0].innerText          
          let money = (event.target as HTMLSelectElement).selectedOptions[0].dataset.myattribute
          handlevaluechange(data , value, `£${money}`)
        }}
        style={{visibility: `${variants && variants.length > 1 ? '' : 'hidden'}`}}
        placeholder="selectproduct"
      >
        {variants.map((prev) => {    
          return (
            <option
            data-myattribute= {prev.price?.amount}
            data-currencysymbol  = {prev.price?.currencyCode}
              value={prev.id.replace(/gid:\/\/shopify\/ProductVariant\//, "")}
            >
              {prev.title}
            </option>
          );
        })}
      </select>
      </div>
   
    </div>
  );
};

export default RecommProduct;

function myComparison(prevProps, nextProps) {
  if (prevProps.title !== nextProps.title) return true;
  return false;
}

export const memoizedRecommProduct = memo(RecommProduct, myComparison);
