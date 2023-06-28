import { useEffect, useState } from 'uelements';
import Client from 'shopify-buy';
import RecommProduct from '../RecommProduct/RecommProduct';
import './ItemAccordion.css';

const ItemAccordion = ({title , id}) => {
  const [isOpen, setIsOpen] = useState();
  const [ data , setData]  =  useState([]);

   useEffect(() => {
    handleData()
 } , []);
   
  async function handleData() {
    const client= Client.buildClient({
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACESSTOKEN,
      domain: "oni-jewelry.myshopify.com",
      apiVersion: "2023-01",
    });
    const collectionId = `gid://shopify/Collection/${id}`;
    return client.collection.fetchWithProducts(collectionId , {productsFirst: 10}).then((collection) => {
      setData(collection.products)
    });
   }
  
    const recommProducts =   data?.map(product =>
      <RecommProduct {...product}/>
    )

  return (
    <div className="item-accordion">
      <div className="acc-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className="toggle-icons">
          <div className="toggle-icon"></div>
          <div className={`toggle-icon ${isOpen ? "": "rotate-icon"}`}></div>
        </span>
      </div>
      <div className={`acc-body ${isOpen ? "": "hide"}`}>
        <div className="recomm-products-wrapper">
          {recommProducts}
        </div>
      </div>
    </div>
  )
}
export default ItemAccordion;