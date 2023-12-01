// export function currencyCalculation(currencydata){  
//   console.log(currencydata);
    
//     let total_price = 0;
//     let currencySymbol = '';
//     for (let item of currencydata) {
//         const currencyRegex = /[^0-9.,]+/g;
//         const price = parseFloat(item.price.replace(currencyRegex,""));
//         total_price += price;
//         currencySymbol = item.price.trim().match(currencyRegex)[0];
//     }
//   return    `${currencySymbol}${total_price}`
// }

export function currencyCalculation(currencydata, discount = 0){  
  let total_price = 0;
  let currencySymbol = '';
    // console.log("first", currencydata[0].price)
      for (let item of currencydata) {
        const currencyRegex = /[^0-9.,]+/g;
        const price = parseFloat(item.price.replace(currencyRegex,""));
        total_price += price;
        currencySymbol = item.price.trim().match(currencyRegex)[0];
      }
      let discountAmount = total_price * discount/100;
      let discountedPrice = total_price - discountAmount;
      // console.log("discountedPrice", currencySymbol, discountedPrice); 
      return `${currencySymbol}${discountedPrice}`
}

export function getDiscountedPrice(price, discount = 0){
  // console.log("Price of Prod -> ", parseFloat(price.replace("$", "")))
  let currencyRegex = /[^0-9.,]+/g;
  let currencySymbol = price.trim().match(currencyRegex)[0];
  let prodPrice = parseFloat(price.replace(currencyRegex, ""));
  let discountAmount = prodPrice * discount/100;
  let discountedPrice = prodPrice - discountAmount;
  return `${currencySymbol}${discountedPrice}`
}