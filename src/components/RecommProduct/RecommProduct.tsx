import { useState } from 'uelements';
import './recommProduct.css';
import { SelectIcon } from '../../assets/icons';

const RecommProduct = ({id, img, title, price}) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="recomm-product">
            <div className="recomm-product-img-wrapper">
                <label for={id}>
                    <img src={img} alt="product_img" />
                </label>
                <input type="checkbox" name="" id={id} checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                {isChecked ? <SelectIcon/>: (<span className="select-icon"></span>)}
            </div>
            <a href="#" class="recomm-product-link">
                <div class="recomm-product-title">{title}</div>
                <span className="money">${price}</span>
            </a>
        </div>
    )
}

export default RecommProduct;