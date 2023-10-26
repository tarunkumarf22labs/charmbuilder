// @ts-nocheck
import Client from "shopify-buy";

import { currencyCalculation } from "./utils/currencyCalculation";
import { useState, useEffect } from "uelements";
import ItemAccordion from "./components/ItemAccordion/ItemAccordion";
import TotalCard from "./components/TotalCard/TotalCard";

function App() {
  // const Url = "http://localhost:3000/data"
  //   const url = "https://www.wear-oni.com/collections/terra/products/the-wild-haathi-charm";
  const regex = /\/products\/[a-zA-Z0-9-]+/;
  let base = window.location.pathname.match(regex)?.[0]!;
  const [order, Setorder] = useState({
    data: [],
    order: [],
    initialproduct: null,
  });
  const [show, setshow] = useState(true);
  const [api, setapi] = useState([]);

  async function handleProduct(id) {
    const client = Client.buildClient({
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACESSTOKEN,
      domain: "kikkiza.myshopify.com",
      apiVersion: "2023-07",
    });
    const productId = `gid://shopify/Product/4750072250477`;

    console.log( " id ", productId);
    client.product.fetch(productId).then((product) => {
      //  let pua =  product.variants[0].id.replace(
      //   /gid:\/\/shopify\/ProductVariant\//, ""
      // );
      console.log("Product -> ", product)
      Setorder((prev) => {
        return {
          ...prev,
          data: [
            ...prev.data,
            { price: `£${product.variants[0].price.amount}` , title  : product.title  ,  id: product.variants[0].id.replace(
              /gid:\/\/shopify\/ProductVariant\//,""
            ) },
          ],
          initialproduct: {
            quantity: 1,
            id: product.variants[0].id.replace(
              /gid:\/\/shopify\/ProductVariant\//,""
            ),
            title: product.title,
          },
        };
      });
    });
  }

  async function handleData() {
    const value = await window.fetch(
      "https://s3.f22labs.cloud/storiespluginassets/memara-charm1.json"
    );
    let data = await value.json();
    console.log(data[base]?.collection, "Coll Id")
    setapi(data[base]?.collection);
    if (!data[base]?.product) return;
    setshow(false);
    handleProduct(data[base]?.product);
    return data;
  }

  useEffect(() => {
    handleData();
  }, []);

  // const ItemAcoordItems = [
  //   {title : "Earring" , id : "285830086816" },
  //   {title : "Anklet" , id  : "295571849376"},
  //   {title : "Necklace" , id : "295829962912" }

  // ]
console.log("Colc", api.collection)
  if (show) return;

  async function handleClick() {
    const payloaddata = order.order.map((prev) => {
      return {
        id: prev.id,
        quantity: prev.quantity,
      };
    });
   console.log(document.querySelector(".select-on-focus").value ,  Number(document.querySelector(".select-on-focus").value) , " select-on-focus");
   
    const payload = {
      items: [
        ...payloaddata,
        { id: order.initialproduct.id, quantity: Number(document.querySelector(".select-on-focus").value) },
      ],
    };

    fetch(`https://${import.meta.env.VITE_STORE_BASE_URL}/cart/add.js`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        response.json();
        window.location.href = `https://${import.meta.env.VITE_STORE_BASE_URL}/cart`;
      })
      .then((data) => data)
      .catch((error) => console.error(error));
  }
  console.log(order, "");

  return (
    <div className="app">
      <h2 className="charmbuilder-title">Pairs Well With</h2>
      {api?.map(({ collectionid, title, product }, i) => {
        return (
          <ItemAccordion
            gopen={i === 0 ? true : false}
            title={title}
            key={collectionid}
            Setorder={Setorder}
            collectionid={collectionid}
            products={product}
          />
        );
      })}
      
      {/* <div className="flex charm-details" style="display: flex;justify-content: center;align-items: center;margin-top: 15px;">
        <div
          className="items_charm-container flex "
          style="justify-content: end;border-right: 1px solid red;padding-right: 10px;"
        >
          {order?.initialproduct?.title &&  
          (
          <><h4>{order?.initialproduct?.title} + Additional Items:</h4><h4> {order.order.length}</h4></>)
}
        </div>
        <div className="items_charm-container flex ">
          <h4 style="padding-left: 8px"> Total price</h4> :{" "}
          <span
            className="money"
            dangerouslySetInnerHTML={{
              __html: currencyCalculation(order?.data),
            }}
          ></span>
        </div>
      </div>  */}
      {order?.order?.length ? <TotalCard handleClick={handleClick}  data={order.data}  /> : ""}
    </div>
  );
}

export default App;
