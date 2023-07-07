// @ts-nocheck
import Client from "shopify-buy";

import { currencyCalculation } from "./utils/currencyCalculation";
import { useState, useEffect } from "uelements";
import ItemAccordion from "./components/ItemAccordion/ItemAccordion";

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
      domain: "oni-jewelry.myshopify.com",
      apiVersion: "2023-01",
    });
    const productId = `gid://shopify/Product/${id}`;

    client.product.fetch(productId).then((product) => {
      Setorder((prev) => {
        return {
          ...prev,
          data: [
            ...prev.data,
            { price: `$${product.variants[0].price.amount}` },
          ],
          initialproduct: {
            quantity: 1,
            id: product.variants[0].id.replace(
              /gid:\/\/shopify\/ProductVariant\//
            ),
            title: product.title,
          },
        };
      });
    });
  }

  async function handleData() {
    const value = await window.fetch(
      "https://api.jsonbin.io/v3/b/64a56b729d312622a37aa639"
    );
    let data = await value.json();
    setapi(data.record.data[base]?.collection);
    if (!data.record.data[base]?.product) return;
    setshow(false);
    handleProduct(data.record.data[base]?.product);
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

  if (show) return;

  async function handleClick() {
    const payloaddata = order.order.map((prev) => {
      return {
        id: prev.id,
        quantity: prev.quantity,
      };
    });

    const payload = {
      items: [
        ...payloaddata,
        { id: document.querySelector("#variant-selector").value, quantity: 1 },
      ],
    };

    fetch("https://www.wear-oni.com/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        response.json();
        window.location.href = "https://www.wear-oni.com/cart";
      })
      .then((data) => data)
      .catch((error) => console.error(error));
  }

  console.log(order , "order");
  

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

      <div className="flex charm-details" style="display: flex;justify-content: center;align-items: center;margin-top: 15px;">
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
      </div>

      {order?.order?.length ? (
        <div
          className="act-wrapper"
          style="display: flex; justify-content: center; align-item: center; gap: 1rem;"
        >
          <button
            className="acc-body"
            onClick={handleClick}
            style="max-height: none;border: 1px solid;padding: 10px;background: #6E2637;color: white;  height: 35px; width: 249px; padding: 3px 28px; font-size: 18px;"
          >
            Add to Bag
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
