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
      domain: "aliciaswim.myshopify.com",
      apiVersion: "2023-01",
    });
    const productId = `gid://shopify/Product/${id}`;

    client.product.fetch(productId).then((product) => {
      let pua = product.variants[0].id.replace(
        /gid:\/\/shopify\/ProductVariant\//,
        ""
      );
      // console.log(pua);

      setOrder((prev) => {
        return {
          ...prev,
          data: [
            ...prev.data,
            {
              price: `£${product.variants[0].price.amount}`,
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
      "https://s3.f22labs.cloud/storiespluginassets/alicia-charmbuilder.json"
    );
    let data = await value.json();
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
        { id: document.querySelector(".product-variant-id").value, quantity: 1 },
      ],
    };

    const client = Client.buildClient({
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_ACESSTOKEN,
      domain: "aliciaswim.myshopify.com",
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
      <h2 className="charmbuilder-title">Match It With</h2>
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
