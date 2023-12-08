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
  const [order, setOrder] = useState({
    data: [],
    order: [],
    initialproduct: null,
  });
  const [show, setShow] = useState(true);
  const [api, setApi] = useState([]);

  async function handleProduct(id) {
    const client = Client.buildClient({
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACESSTOKEN,
      domain: "oni-jewelry.myshopify.com",
      apiVersion: "2023-01",
    });
    const productId = `gid://shopify/Product/${id}`;

    client.product.fetch(productId).then((product) => {
      let pua = product.variants[0].id.replace(
        /gid:\/\/shopify\/ProductVariant\//,
        ""
      );
      // console.log("Product", pua);

      setOrder((prev) => {
        return {
          ...prev,
          data: [
            ...prev.data,
            {
              price: `$${product.variants[0].price.amount}`,
              title: product.title,
              id: product.variants[0].id.replace(
                /gid:\/\/shopify\/ProductVariant\//,
                ""
              ),
            },
          ],
          initialproduct: {
            quantity: 1,
            id: product.variants[0].id.replace(
              /gid:\/\/shopify\/ProductVariant\//,
              ""
            ),
            title: product.title,
          },
        };
      });
    });
  }

  async function handleData() {
    const value = await window.fetch(
      "https://s3.f22labs.cloud/storiespluginassets/oni-charm2.json"
    );
    let data = await value.json();
    console.log("Data -> ",data[base])
    setApi(data[base]?.collection);
    if (!data[base]?.product) return;
    setShow(false);
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

  if (show) return;

  async function handleClick() {
    const payloadData = order.order.map((prev) => {
      return {
        id: prev.id,
        quantity: prev.quantity,
      };
    });

    const payload = {
      items: [
        ...payloadData,
        { id: document.querySelector("#variant-selector").value, quantity: 1 },
      ],
    };

    const client = Client.buildClient({
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACESSTOKEN,
      domain: "oni-jewelry.myshopify.com",
      apiVersion: "2023-01",
    });
    let checkoutId = await client.checkout.create().then((checkout) => {
      return checkout.id;
    });
    console.log("Checkout", checkoutId);

    // const lineItemsToAdd = [
    //   {
    //     variantId: 'gid://shopify/ProductVariant/41914336313504',
    //     quantity: 5,
    //   }
    // ];

    // transform payload.items array above format
    const lineItemsToAdd = payload.items.reduce((accum, pItem) => {
      accum.push({
        variantId: `gid://shopify/ProductVariant/${pItem.id}`,
        quantity: pItem.quantity,
      });
      return accum;
    }, []);

    // add items to checkout
    checkoutId = await client.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then((checkout) => {
        return checkout.id;
        // Array with one additional line item
      });

    const discountCode = "STACK15";

    console.log("payload", payload);
    console.log("payload", lineItemsToAdd);

    // apply discount code
    const checkoutUrl = await client.checkout
      .addDiscount(checkoutId, discountCode)
      .then((checkout) => {
        console.log(checkout);
        return checkout.webUrl;
      });
    console.log(checkoutUrl, "webUrl");

    // redirect to checkout
    window.location.href = checkoutUrl;

    //   fetch("https://www.wear-oni.com/cart/add.js", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   })
    //     .then((response) => {
    //       response.json();
    //       window.location.href = "https://www.wear-oni.com/cart";
    //     })
    //     .then((data) => data)
    //     .catch((error) => console.error(error));
  }

  console.log(order, "");

  return (
    <div className="app">
      <svg
        width="72"
        height="26"
        viewBox="0 0 72 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="
    position: absolute;
    top: 0;
    left: 0;
"
      >
        <rect width="72" height="26" fill="black" style="fill: #6E2637;"/>
        <path
          d="M8.308 17V15.964H11.094V8.698H11.08C10.702 9.286 9.932 9.678 9.008 9.972L8.658 8.824C9.904 8.544 10.744 7.97 11.192 7.13H12.27V15.964H14.482V17H8.308ZM19.1252 17.35C17.0532 17.35 15.5972 16.062 15.4852 14.144L16.6052 13.92C16.6752 15.348 17.6832 16.314 19.1112 16.314C20.5532 16.314 21.5052 15.362 21.5052 13.878C21.5052 12.436 20.5812 11.484 19.1672 11.484C18.4532 11.484 17.6972 11.82 17.3332 12.31L16.5212 12.058L16.8292 7.13H21.6592V8.166H17.8652L17.6272 11.134C17.9912 10.756 18.7332 10.504 19.4752 10.504C21.4072 10.504 22.6672 11.82 22.6672 13.85C22.6672 15.978 21.2812 17.35 19.1252 17.35ZM27.1245 17.14L26.6905 16.832L33.9145 6.57L34.3625 6.878L27.1245 17.14ZM26.9005 12.282C25.2765 12.282 24.0865 11.106 24.1005 9.496C24.1005 7.858 25.2905 6.682 26.9005 6.682C28.5245 6.682 29.7005 7.858 29.7005 9.496C29.7005 11.12 28.5245 12.282 26.9005 12.282ZM26.9145 11.316C27.9645 11.316 28.7205 10.546 28.7205 9.496C28.7205 8.432 27.9645 7.648 26.9145 7.648C25.8365 7.648 25.0665 8.432 25.0665 9.496C25.0665 10.546 25.8505 11.316 26.9145 11.316ZM34.0265 17.182C32.4025 17.182 31.2265 16.006 31.2265 14.396C31.2405 12.758 32.4165 11.582 34.0265 11.582C35.6505 11.582 36.8265 12.758 36.8265 14.396C36.8265 16.02 35.6505 17.182 34.0265 17.182ZM34.0405 16.216C35.0905 16.216 35.8605 15.446 35.8605 14.396C35.8605 13.332 35.0905 12.548 34.0405 12.548C32.9625 12.548 32.1925 13.332 32.1925 14.396C32.1925 15.446 32.9765 16.216 34.0405 16.216ZM46.3635 17.28C44.0955 17.28 42.5975 15.768 42.5975 13.472C42.5975 11.162 44.0955 9.65 46.3635 9.65C48.6455 9.65 50.1435 11.162 50.1435 13.472C50.1435 15.768 48.6455 17.28 46.3635 17.28ZM46.3635 16.314C48.0015 16.314 49.0655 15.194 49.0655 13.472C49.0655 11.75 48.0015 10.63 46.3635 10.63C44.7255 10.63 43.6615 11.75 43.6615 13.472C43.6615 15.194 44.7255 16.314 46.3635 16.314ZM52.3579 17L52.3439 10.812H50.7899V9.93H52.3439V8.698C52.3439 7.396 53.2679 6.5 54.6399 6.5C55.8859 6.5 56.8099 7.256 57.0619 8.306L56.1239 8.698C55.9699 7.97 55.3819 7.424 54.6819 7.424C53.9399 7.424 53.4079 8.012 53.4079 8.88V9.93H56.4599V10.812H53.4079L53.4219 17H52.3579ZM59.207 17L59.193 10.812H57.639V9.93H59.193V8.698C59.193 7.396 60.117 6.5 61.489 6.5C62.735 6.5 63.659 7.256 63.911 8.306L62.973 8.698C62.819 7.97 62.231 7.424 61.531 7.424C60.789 7.424 60.257 8.012 60.257 8.88V9.93H63.309V10.812H60.257L60.271 17H59.207Z"
          fill="white"
        />
      </svg>
      <h2 className="charmbuilder-title">Stack It With</h2>
      {api?.map(({ collectionid, title, product }, i) => {
        return (
          <ItemAccordion
            isAccOpen={i === 0 ? true : false}
            title={title}
            key={collectionid}
            order={order}
            setOrder={setOrder}
            collectionid={collectionid}
            products={product}
          />
        );
      })}
      {order?.order?.length ? (
        <TotalCard handleClick={handleClick} data={order.data} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
