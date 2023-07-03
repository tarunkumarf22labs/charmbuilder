import Client from 'shopify-buy';
import { currencyCalculation } from "./utils/currencyCalculation";
import { useState , useEffect } from "uelements";
import ItemAccordion from "./components/ItemAccordion/ItemAccordion"



 
function App() {
  // const Url = "http://localhost:3000/data"
  let base = window.location.pathname;
  const [order, Setorder] = useState({
      data : [],
      order : [],
      initialproduct : null
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
      Setorder((prev) => {
        return {
          ...prev ,
          initialproduct : { quantity: 1 , id : product.variants[0].id.replace(/gid:\/\/shopify\/ProductVariant\//, "") }
        }
      } )
    });
    
  }


  

  async function handleData() {
  const value   = await window.fetch("https://api.jsonbin.io/v3/b/64a2a9c39d312622a379944c")
  let   data    =  await value.json()
  setapi(data.record.data[base]?.collection)  
  if(!data.record.data[base]?.productid)return
  handleProduct(data.record.data[base]?.productid)
  return data  
}

  useEffect(() => {
    handleData()
  } ,[] )


  // const ItemAcoordItems = [
  //   {title : "Earring" , id : "285830086816" },
  //   {title : "Anklet" , id  : "295571849376"},
  //   {title : "Necklace" , id : "295829962912" }

  // ]

  async function handleClick() {
    console.log("data");
    
const payloaddata = order.order.map((prev)  =>  {
        return {
            id : prev.id,
           quantity : prev.quantity
        }
})

const payload = {
      items: [   ...payloaddata , order.initialproduct  ]
};


    fetch('https://www.wear-oni.com/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        response.json();
        window.location.href = "https://www.wear-oni.com/cart";
      })
      .then(data => data)
      .catch(error => console.error(error));
  }

  
  return (
    <div className="app">
      {api?.map(({collectionid , title , product} , i) => {
       return (
       <ItemAccordion  gopen = {i === 0 ? true: false}  title={title}  key={collectionid} Setorder= {Setorder} collectionid = {collectionid}  products ={product} />
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
   
       <button className="acc-body" onClick={handleClick} style="max-height: none;border: 1px solid;padding: 10px;"  >Add to Cart</button>
    </div>
  )
}




export default App;