import './ItemAccordion.css';
import RecommProduct from '../RecommProduct/RecommProduct';
import { useEffect, useState } from 'uelements';
import Client from 'shopify-buy';

const ItemAccordion = () => {
  const [ data , setData ]  =  useState();
  const [isOpen, setIsOpen] = useState();
    useEffect(() => {
       async function handleData() {
         const value = await fetch(" http://localhost:3000/products");
         const data =  await value.json();
         setData(data)
       }
       handleData()
    } , []);
  return (
    <div className="item-accordion">
      <div className="acc-header" onClick={() => setIsOpen(!isOpen)}>
        <span>Add Earring</span>
        <span className="toggle-icons">
          <div className="toggle-icon"></div>
          <div className={`toggle-icon ${isOpen ? "": "rotate-icon"}`}></div>
        </span>
      </div>
      <div className={`acc-body ${isOpen ? "": "hide"}`}>
        <div className="recomm-products-wrapper">
          {data && data.map(product =>
            <RecommProduct {...product}/>
          )}

        </div>
      </div>
    </div>
  )
}
export default ItemAccordion;