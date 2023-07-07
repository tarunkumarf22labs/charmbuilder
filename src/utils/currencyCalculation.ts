export function currencyCalculation(currencydata){    
    let total_price = 0;
    let currencySymbol = '';
    for (let item of currencydata) {
        const currencyRegex = /[^0-9.,]+/g;
        const price = parseFloat(item.price.replace(currencyRegex,""));
        total_price += price;
        currencySymbol = item.price.trim().match(currencyRegex)[0];
    }
  return    `${currencySymbol}${total_price}`
}