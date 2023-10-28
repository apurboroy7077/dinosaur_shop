import data from "../database.js";
let products = data.data_of_dinos;
let total_amount = () => {
  let bag = JSON.parse(localStorage.getItem("dino_data"));
  let total_price = 0;
  for (let i = 0; i < bag.length; i++) {
    let bag_item = bag[i];
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      if (product.name == bag_item.name) {
        total_price = total_price + product.price * bag_item.quantity;
      }
    }
  }
  return total_price;
};
export default total_amount;
