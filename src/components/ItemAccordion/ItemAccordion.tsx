import './ItemAccordion.css';
import RecommProduct from '../RecommProduct/RecommProduct';
import { useEffect, useState } from 'uelements';

const ItemAccordion = () => {
  const [ data , SetData ]  =  useState()
    useEffect(() => {
       async function handleData() {
         const value = await fetch(" http://localhost:3000/products");
         const data =  await value.json();
         console.log(data)
         SetData(data)
       }
       handleData()
    } , [] )
  return (
    <div className="item-accordion">
      <div className="acc-header">
        <span>Add Earring</span>
        <span className="toggle-icons">
          <div className="toggle-icon"></div>
          <div className="toggle-icon rotate-icon"></div>
        </span>
      </div>
      <div className="acc-body">
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