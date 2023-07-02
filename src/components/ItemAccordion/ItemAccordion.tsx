import { useEffect, useState } from 'uelements';
import Client from 'shopify-buy';
import RecommProduct from '../RecommProduct/RecommProduct';
import { MinusIcon, PlusIcon } from '../../assets/icons';
import './ItemAccordion.css';

const ItemAccordion = ({ title, id, Setorder }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState( () =>  [{
    id: '',
    title: '',
    price: ''
  }]);
  const [vdata, setdata] = useState({})
  function handleChange(value) {
    setdata(value)
    console.log(value);
    Setorder((prev) => {
      console.log(prev , "prev");
      
                  let data = prev.data.filter((item) => item.type !== value.type);
                  let order = prev.order.filter((item) => item.type !== value.type);
                  
                  return {
                    data : [...data , value],
                    order : [...order , { quantity : 1 , ...value }]
                  }
    } )
    
  }

  useEffect(() => {
    handleData()
  }, []);

  async function handleData() {
    const client = Client.buildClient({
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACESSTOKEN,
      domain: "oni-jewelry.myshopify.com",
      apiVersion: "2023-01",
    });
    const collectionId = `gid://shopify/Collection/${id}`;
    return client.collection.fetchWithProducts(collectionId, { productsFirst: 10 }).then((collection) => {
      setData(collection.products)
    });
  }



  const recommProducts = data?.map(product => {
    const [money] = useState(`$${product?.variants?.[0]?.price?.amount}`)
   
     
    const id = product.variants[0].id.replace(/gid:\/\/shopify\/ProductVariant\//, "");
     // const [isChecked, setIsChecked] = useState(false);

     return <RecommProduct {...{ ...product, money, Setorder, selectedProduct, setSelectedProduct, setEdit }} datatitle = {title}   ischecked = { id === vdata.id ? true : false  }  handleChange={handleChange} />
  }
  )


  return (
    <>
      <div className={`item-accordion ${edit ? '': 'hidden'}`}>
        <div className="acc-header" onClick={() => {
          setIsOpen(!isOpen)
        }}>
          <span className='acc-title'>Add {title}</span>
          {isOpen ? (<MinusIcon />) : (<PlusIcon />)}
        </div>
        <div className={`acc-body ${isOpen ? "" : "hide"}`}>
          <div className="recomm-products-wrapper">
            {recommProducts}
          </div>
        </div>
      </div>
      <div className={`selected-product-card ${edit ? 'hidden': ''}`}>
        <span className='acc-title'>Add {title}</span>
        <span className='added-item'>Added Item</span>
        <div className="selected-product-details">
          <span className="selected-product-title">{selectedProduct.title}</span>  <span className="money">{selectedProduct.price}</span>
        </div>
        <span className="edit-button" onClick={() => setEdit(true)}>Edit</span>
      </div>
    </>
  )
}
export default ItemAccordion;