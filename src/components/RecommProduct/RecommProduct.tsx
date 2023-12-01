// import { useState } from "uelements";
import "./RecommProduct.css";
// import { SelectIcon } from "../../assets/icons";
import { memo } from "preact/compat";
import { getDiscountedPrice } from "../../utils/currencyCalculation";

const RecommProduct = ({
  title,
  images,
  id,
  variants,
  handle,
  order,
  setOrder,
  setSelectedProduct,
  setEdit,
  money,
}) => {
  // const [isChecked, setIsChecked] = useState(false);
  function handleIsChecked(event) {
    event.stopPropagation();
    event.preventDefault();

    const id = variants[0].id.match(/\d+/)[0];
    console.log("ID ", id)
    // setIsChecked(true);
    setEdit(false);

    // if (false) {
      // setSelectedProduct((prev) => {
      //   let data = prev.filter((item) => item.title !== title);
      //   if (data.length === 0) {
      //     setEdit(true);
      //   }
      //   return data;
      // });

      // setOrder((prev) => {
      //   let data = prev.data.filter((item) => item.title !== title);
      //   let order = prev.order.filter((item) => item.title !== title);
      //   return {
      //     ...prev,
      //     data,
      //     order,
      //   };
      // });
      // return;
    // } else {
      setOrder((prev) => {
        console.log("setOrder", prev);
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
              id,
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
          image: images[0].src,
          type: variants[0].title,
        },
      ]);
    // }
  }

  function handlevaluechange(id, value, money) {
    setEdit(false);
    // setIsChecked(true);
    setOrder((prev) => {
      let data = prev.data.filter((item) => item.title !== title);
      let order = prev.order.filter((item) => item.title !== title);
      return {
        ...prev,
        data: [
          ...data,
          {
            title,
            price: money,
            id: id.replace(/gid:\/\/shopify\/ProductVariant\//, ""),
          },
        ],
        order: [
          ...order,
          {
            quantity: 1,
            id: id.replace(/gid:\/\/shopify\/ProductVariant\//, ""),
            title,
          },
        ],
      };
    });
    setSelectedProduct((prev) => {
      let data = prev.filter((item) => item.title !== title);
      return [
        ...data,
        {
          id,
          title: title,
          price: money,
          image: images[0].src,
          type: value,
        },
      ];
    });
  }

  const isProductAddedToCart = () =>{
    const currentProduct = order?.order?.find((item) => item.title == title);
    if(currentProduct)
      return true;
    return false;
  }
  return (
    <div className="recomm-product">
      <div className="recomm-product-img-wrapper">
        <label for={id}>
          <img src={images[0].src} alt="product_img" />
        </label>
        {/* <input
          type="checkbox"
          name=""
          id={id}
          checked={isChecked}
          onChange={handleIsChecked}
        /> */}
        {/* {isChecked ? (
          <SelectIcon onClick={(event) => handleIsChecked(event)} />
        ) : (
          <span
            className="select-icon"
            onClick={(event) => handleIsChecked(event)}
          ></span>
        )} */}
      </div>
      <div className="recomm-product-info">
        <a href={`/products/${handle}`} class="recomm-product-link">
          <div class="recomm-product-title">{title}</div>
          <div class="recomm-product-price">
            <span
              className="money"
              dangerouslySetInnerHTML={{ __html: money }}
              style="font-size: 14px; color: #828282 !important; text-decoration: line-through;"
            ></span>
            <span
              className="money"
              style="color: var(--color-primary); font-size: 16px;"
              dangerouslySetInnerHTML={{
                __html: getDiscountedPrice(money, 15),
              }}
            ></span>
          </div>
        </a>

        <select
          id="recomm-product-variant-selector"
          onChange={(event) => {
            let data = (event.target as HTMLInputElement).value;
            let value = (event.target as HTMLSelectElement).selectedOptions[0]
              .innerText;
            let money = (event.target as HTMLSelectElement).selectedOptions[0]
              .dataset.myattribute;
            handlevaluechange(data, value, `$${money}`);
          }}
          placeholder="Select product"
        >
          {variants.map((prev) => {
            return (
              <option
                data-myattribute={prev.price?.amount}
                data-currencysymbol={prev.price?.currencyCode}
                value={prev.id.replace(/gid:\/\/shopify\/ProductVariant\//, "")}
              >
                {prev.title}
              </option>
            );
          })}
        </select>
        <button className={`recomm-product-act-btn ${isProductAddedToCart() && 'act-disabled'}`} disabled={isProductAddedToCart()} onClick={(event) => handleIsChecked(event)}>{isProductAddedToCart() ? "Added to Bag": "Add to Bag"}</button>
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
