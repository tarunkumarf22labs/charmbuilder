import { useState } from 'uelements';
import './RecommProduct.css';
import { SelectIcon } from '../../assets/icons';

const RecommProduct = ( {title , images , variants , id}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [money, Setmoney] = useState(`${variants?.[0]?.price.amount}`)
   
    return (
        <div className="recomm-product">
            <div className="recomm-product-img-wrapper">
                <label for={id}>
                    <img src={images[0].src} alt="product_img" />
                </label>
                <input type="checkbox" name="" id={id} checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                {isChecked ? <SelectIcon/>: (<span className="select-icon"></span>)}
            </div>
            <a href="#" class="recomm-product-link">
                <div class="recomm-product-title">{title}</div>
                <span className="money">${variants?.[0]?.price.amount}</span>
            </a>
        </div>
    )
}

export default RecommProduct;