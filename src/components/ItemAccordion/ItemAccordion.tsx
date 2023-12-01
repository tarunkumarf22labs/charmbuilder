import { useEffect, useState } from 'uelements';
import Client from 'shopify-buy';
import RecommProduct from '../RecommProduct/RecommProduct';
import { MinusIcon, PlusIcon } from '../../assets/icons';
import './ItemAccordion.css';
import SelectedAccItem from '../SelectedAccItem/SelectedAccItem';

const ItemAccordion = ({ title, setOrder , order,  collectionid , products , isAccOpen}) => {
  const [isOpen, setIsOpen] = useState(isAccOpen);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState( () =>  []);
  const [vdata, setdata] = useState({})


  function handleChange(value) {
    setdata(value)
    setOrder((prev) => {    
                  let data = prev.data.filter((item) => item.type !== value.type);
                  let order = prev.order.filter((item) => item.type !== value.type);
                  return {
                    data : [...data , value],
                    order : [...order , { quantity : 1 , ...value }]
                  }
    } )
    
  }


  async function fetchProductData() {
    let PRODUCT_DATA = await Promise.all(products.map((product) => {
      return productData(product);
    }));
    setData(PRODUCT_DATA)
  }
async  function productData(id){
    const client = Client.buildClient({
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACESSTOKEN,
      domain: "oni-jewelry.myshopify.com",
      apiVersion: "2023-01",
    });
    const productId = `gid://shopify/Product/${id}`;
    const product =  client.product.fetch(productId)
    return product
  }

  useEffect(() => {
    if(products.length) {
        fetchProductData()  
     return
    } else {
      handleData()     
    } 
 
  }, []);

  async function handleData() {
    const client = Client.buildClient({
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACESSTOKEN,
      domain: "oni-jewelry.myshopify.com",
      apiVersion: "2023-01",
    });
    const collectionId = `gid://shopify/Collection/${collectionid}`;
    return client.collection.fetchWithProducts(collectionId, { productsFirst: 10 }).then((collection) => {
      setData(collection.products)
    });
  }



  const recommProducts = data?.map(product => {
    const [money] = useState(`$${product?.variants?.[0]?.price?.amount}`)  
    const id = product.variants[0].id.replace(/gid:\/\/shopify\/ProductVariant\//, "");
    return <RecommProduct {...{ ...product, money, order, setOrder, selectedProduct, setSelectedProduct, setEdit }} datatitle = {title}   ischecked = { id === vdata.id ? true : false  }  handleChange={handleChange} />
  }
  )


  return (
    <>
      <div className={`item-accordion ${edit ? '': 'hidden'} ${isOpen? "br-1" : "br-2"}`}>
        <div className="acc-header" onClick={() => {
          setIsOpen(!isOpen)
        }}>
          <span className='acc-title'> {title}</span>
          {isOpen ? (<MinusIcon />) : (<PlusIcon />)}
        </div>
        <div className={`acc-body ${isOpen ? "" : "hide"}`}>
          <div className="recomm-products-wrapper">
            {recommProducts}
          </div>  
        </div>
      </div>
      <div className={`selected-product-card ${edit ? 'hidden': ''}`}>
        <span className='acc-title'>{title}</span>
        <span className='added-item'>Added Item</span>
        <div className="selected-product-details">
        {selectedProduct?.map((product) => {
            if(!product.image) return
            return (
              <SelectedAccItem {...{...product, setOrder, order, setEdit, setSelectedProduct, selectedProduct}}/>
            )
          })}
        </div>
        <span className="edit-button" onClick={() => setEdit(true)}>Edit</span>
      </div>
    </>
  )
}
export default ItemAccordion;