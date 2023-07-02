import { useState , useEffect } from "uelements";
import ItemAccordion from "./components/ItemAccordion/ItemAccordion"
import ItemCard from "./components/Itemcard/ItemCard";
import { currencyCalculation } from "./utils/currencyCalculation";
import Client from 'shopify-buy';



 
function App( ) {
  const Url = "http://localhost:3000/data"
  let base = window.location.pathname;
  const [order, Setorder] = useState({
      data : [],
      order : []
  })
  const [api, setapi] = useState([])


  async function handleProduct(id) {
    const client = Client.buildClient({
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACESSTOKEN,
      domain: "oni-jewelry.myshopify.com",
      apiVersion: "2023-01",
    });
    const productId = `gid://shopify/Product/${id}`;
    
    client.product.fetch(productId).then((product) => {
      // Do something with the product
    });
    
  }


  async function handleData() {
  const value =  await window.fetch(Url)
  let data =    await value.json()
  setapi(data[base])  
  handleProduct(data[base]?.productid)
  return data  
}

  useEffect(() => {
    handleData()
  } ,[] )

 console.log(api)
  const ItemAcoordItems = [
    {title : "Earring" , id : "285830086816" },
    {title : "Anklet" , id  : "295571849376"},
    {title : "Necklace" , id : "295829962912" }
  ]

  async function handleClick() {
    
    const payloaddata = order.order.map((prev)  =>  {
        return {
            id : prev.id,
           quantity : prev.quantity
        }
    })

    const payload = {
      items: payloaddata
    };

    fetch('https://www.wear-oni.com/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error));
  }


  return (
    <div className="app">
      <ItemCard orderdata = {order.data} />
      {ItemAcoordItems.map(({id , title}) => {
       return (
       <ItemAccordion title={title}  id={id}  key={id} Setorder= {Setorder}   />
        )
       })} 

      <div className="grid">
      <div className="items_charm-container flex " style="justify-content: end;border-right: 1px solid red;padding-right: 10px;">
        <h4>Total Items</h4>  :  <h4>{order.data.length}</h4>
         </div>
         <div className="items_charm-container flex ">
          <h4>Total price</h4> :  <h4>{currencyCalculation(order.data)}</h4>
         </div>

      </div>
   
       <button className="acc-body" onClick={handleClick} >Add to Cart</button>
    </div>
  )
}




export default App;