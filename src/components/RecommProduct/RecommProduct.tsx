import { useState } from "uelements";
import "./RecommProduct.css";
import { SelectIcon } from "../../assets/icons";
import { memo } from "preact/compat";

const RecommProduct = ({
  title,
  images,
  id,
  money,
  variants,
  Setorder,
  setSelectedProduct,
  setEdit,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  function handleIsChecked(event) {
    event.stopPropagation();
    event.preventDefault();

    const id = variants[0].id.replace(/gid:\/\/shopify\/ProductVariant\//, "");
    setIsChecked((prev) => !prev);
    setEdit(false);

    if (isChecked) {
      setSelectedProduct((prev) => {
        let data = prev.filter((item) => item.id !== id);

        if (data.length === 0) {
          setEdit(true);
        }
        return data;
      });
      Setorder((prev) => {
        let data = prev.data.filter((item) => item.id !== id);
        let order = prev.order.filter((item) => item.id !== id);
        return {
          ...prev,
          data,
          order,
        };
      });
    } else {
      Setorder((prev) => {
        return {
          ...prev,
          data: [
            ...prev.data,
            { title, image: images[0].src, price: money, id },
          ],
          order: [...prev.order, { quantity: 1, id }],
        };
      });
      setSelectedProduct((prev) => [
        ...prev,
        { id: id, title: title, price: money },
      ]);
    }
  }

  return (
    <div className="recomm-product">
      <div className="recomm-product-img-wrapper">
        <label for={id}>
          <img src={images[0].src} alt="product_img" />
        </label>
        <input
          type="checkbox"
          name=""
          id={id}
          checked={isChecked}
          onChange={handleIsChecked}
        />
        {isChecked ? <SelectIcon /> : <span className="select-icon"></span>}
      </div>
      <a href="#" class="recomm-product-link">
        <div class="recomm-product-title">{title}</div>
        <span className="money">
          {money}s
        </span>
      </a>
    </div>
  );
};

export default RecommProduct;


function myComparison(prevProps, nextProps) { 
   if(prevProps.title !== nextProps.title)  return true
   return false
}

export const memoizedRecommProduct   = memo(RecommProduct , myComparison)