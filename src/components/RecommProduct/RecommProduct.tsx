import { useState } from "uelements";
import "./RecommProduct.css";
import { SelectIcon } from "../../assets/icons";

const RecommProduct = ({ title, images, id, money, variants, Setorder, selectedProduct, setSelectedProduct, setEdit  , datatitle , handleChange , ischecked}) => {
  // const [isChecked, setIsChecked] = useState(false);

  function handleIsChecked(event) {
    event.stopPropagation();
    event.preventDefault();

    const id = variants[0].id.replace(/gid:\/\/shopify\/ProductVariant\//, "");
    setSelectedProduct({...selectedProduct, id: id, title: title, price: money});
    setEdit(false);
    handleChange({id : id ,title: title, price: money , type : datatitle })
    // if(ischecked){
    //     Setorder((prev) => {
    //         let data = prev.data.filter((item) => item.id !== id);
    //         let order = prev.order.filter((item) => item.id !== id);
    //         return {
    //            data,
    //            order
    //         };
    //      });        
    // } else {
    //     Setorder((prev) => {
    //         return {
    //           data: [...prev.data, { title, image: images[0].src, price: money , id }],
    //           order: [...prev.order, { quantity: 1, id }],
    //         };
    //       });
    //     }
    // }
  }


  return (
    <div className="recomm-product">
      <div className="recomm-product-img-wrapper">
        <label for={id}>
          <img src={images[0].src} alt="product_img" />
        </label>
        <input
          type="checkbox"
          name={datatitle}
          id={id}
          checked={ischecked}
          onChange={handleIsChecked}
        />
        {ischecked ? <SelectIcon /> : <span className="select-icon"></span>}
      </div>
      <a href="#" class="recomm-product-link">
        <div class="recomm-product-title">{title}</div>
        <span className="money">{money}</span>
      </a>
    </div>
  );
};

export default RecommProduct;
