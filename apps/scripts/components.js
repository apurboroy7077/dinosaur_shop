import data from "./database.js";
import total_amount from "./components/total_amount.js";
import clear_cart_function from "./components/clear_cart.js";
import confirm_order_function from "./components/confirm_order.js";
let generate_list = (bag) => {
  let dino_data = data.data_of_dinos;
  let code = "";
  // let bag = JSON.parse(localStorage.getItem("dino_data"));
  for (let i = 0; i < dino_data.length; i++) {
    let data = dino_data[i];
    let quantity = 0;
    for (let i = 0; i < bag.length; i++) {
      let bag_item = bag[i];
      if (bag_item.name == data.name) {
        quantity = bag_item.quantity;
      }
    }
    code =
      code +
      ` <li class="dino_list_1">
    <div class="dino_list_1_1">
      <div class="dino_list_1_1_1">
        <img src="${data.img_src}" alt="" />
      </div>
      <div class="dino_list_1_1_2">
        <div class="dino_list_1_1_2_1">${data.name}</div>
        <div class="dino_list_1_1_2_2">
          ${data.description}
        </div>
        <div class="dino_list_1_1_2_3">
          <div class="dino_list_1_1_2_3_1">${data.price} $</div>
          <div class="dino_list_1_1_2_3_2">
            <div class="dino_list_1_1_2_3_2_1 minus_button" data-name="${data.name}">-</div>
            <div class="dino_list_1_1_2_3_2_2 quantity" data-name="${data.name}">${quantity}</div>
            <div class="dino_list_1_1_2_3_2_3 plus_button" data-name="${data.name}">+</div>
          </div>
        </div>
      </div>
    </div>
  </li>`;
  }
  let final_code = `<ul class="dino_list">${code}</ul>`;
  let div = document.getElementsByTagName("main")[0];
  div.style.backgroundImage = 'url("apps/images/background/jungle_1.jpg")';
  div.innerHTML = final_code;
};
let plus_button_function = (bag) => {
  let buttons = document.getElementsByClassName("plus_button");
  buttons = Array.from(buttons);
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", (events) => {
      let name = events.currentTarget.getAttribute("data-name");
      let check_exist = false;
      for (let i = 0; i < bag.length; i++) {
        let bag_item = bag[i];
        if (bag_item.name == name) {
          bag_item.quantity++;
          check_exist = true;
        }
      }
      if (check_exist == false) {
        let object = {
          name: name,
          quantity: 1,
        };
        bag.push(object);
      }
      save_to_localStorage(bag);
      update_shown_info();
    });
  }
};
let minus_button_function = (bag) => {
  let buttons = document.getElementsByClassName("minus_button");
  buttons = Array.from(buttons);
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", (events) => {
      let name = events.currentTarget.getAttribute("data-name");
      let check_exist = false;
      for (let i = 0; i < bag.length; i++) {
        let bag_item = bag[i];
        if (bag_item.name == name && bag_item.quantity > 0) {
          bag_item.quantity--;
          check_exist = true;
        }
      }
      save_to_localStorage(bag);
      update_shown_info();
    });
  }
};
let save_to_localStorage = (bag) => {
  for (let i = 0; i < bag.length; i++) {
    let bag_item = bag[i];
    if (bag_item.quantity == 0) {
      let index = i;
      bag.splice(index, 1);
    }
  }
  localStorage.setItem("dino_data", JSON.stringify(bag));
};
let update_shown_info = () => {
  let bag = JSON.parse(localStorage.getItem("dino_data"));
  let quantity = document.getElementsByClassName("quantity");
  quantity = Array.from(quantity);
  for (let i = 0; i < quantity.length; i++) {
    let quantity_box = quantity[i];
    let name = quantity_box.getAttribute("data-name");
    let exists = false;
    for (let i = 0; i < bag.length; i++) {
      let bag_item = bag[i];
      if (name == bag_item.name) {
        quantity_box.innerHTML = bag_item.quantity;
        exists = true;
      }
    }
    if (exists == false) {
      quantity_box.innerHTML = 0;
    }
  }
  let bagpack_quantity = document.getElementsByClassName("bagpack_quantity")[0];
  let total_quantity = 0;
  for (let i = 0; i < bag.length; i++) {
    let bag_item = bag[i];
    total_quantity = total_quantity + bag_item.quantity;
  }
  bagpack_quantity.innerHTML = total_quantity;
};
let bag_button_function = () => {
  // let button = document.getElementsByClassName("bag_button")[0];
  // button.addEventListener("click", () => {
  //   generate_cart();
  // });
};
let generate_cart = () => {
  let main_div = document.getElementsByTagName("main")[0];
  main_div.style.backgroundImage =
    'url("apps/images/background/helicopter.jpg")';
  let saved = JSON.parse(localStorage.getItem("dino_data"));
  let code = ``;
  for (let i = 0; i < saved.length; i++) {
    let saved_item = saved[i];
    let name = saved_item.name;
    let dino_data = data.data_of_dinos;

    for (let i = 0; i < dino_data.length; i++) {
      let dino_data_item = dino_data[i];
      if (name == dino_data_item.name) {
        code =
          code +
          `<li class="dino_list_cart_1">
        <div class="dino_list_cart_1_1">
          <div class="dino_list_1_1_1 dino_list_cart_1_1_1">
            <img src="${dino_data_item.img_src}" alt="" />
          </div>
          <div class="dino_list_1_1_2 dino_list_cart_1_1_2">
            <div class="dino_list_1_1_2_1">${dino_data_item.name}</div>
            <div class="dino_list_1_1_2_2">
              ${dino_data_item.description}
            </div>
            <div class="dino_list_1_1_2_3">
              <div class="dino_list_1_1_2_3_1">${dino_data_item.price} $</div>
              <div class="dino_list_1_1_2_3_2">
                <div class="dino_list_1_1_2_3_2_1 cart_minus_button" data-name="${dino_data_item.name}">-</div>
                <div class="dino_list_1_1_2_3_2_2 cart_single_quantity" data-name="${dino_data_item.name}">${saved_item.quantity}</div>
                <div class="dino_list_1_1_2_3_2_3 cart_plus_button" data-name="${dino_data_item.name}">+</div>
              </div>
            </div>
          </div>
        </div>
      </li>`;
      }
    }
  }

  let final_code = ` 
  <div class="bill_info">
  <div class="bill_info_1">
    <div class="bill_info_1_1 cart_total_amount">Total Amount: ${total_amount()}$</div>
    <div class="bill_info_1_2">
      <a href="#/confirm_order"><div class="bill_info_1_2_1 confirm_order">Confirm Order</div></a>
       <div class="bill_info_1_2_2 clear_cart_button">Clear Cart</div>
    </div>
  </div>
</div>
  <ul class="dino_list_cart"> ${code}</ul>`;
  main_div.innerHTML = final_code;
};
let cart_page = () => {
  generate_cart();
  cart_plus_button_function();
  cart_minus_button_function();
  clear_cart_function();
};
let cart_plus_button_function = () => {
  let buttons = document.getElementsByClassName("cart_plus_button");
  buttons = Array.from(buttons);
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", (events) => {
      let bag = JSON.parse(localStorage.getItem("dino_data"));
      let name = events.currentTarget.getAttribute("data-name");
      let check_exist = false;
      for (let i = 0; i < bag.length; i++) {
        let bag_item = bag[i];
        if (bag_item.name == name) {
          bag_item.quantity++;
          check_exist = true;
        }
      }
      if (check_exist == false) {
        let object = {
          name: name,
          quantity: 1,
        };
        bag.push(object);
      }
      save_to_localStorage(bag);
      update_shown_info_cart();
    });
  }
};
let cart_minus_button_function = () => {
  let buttons = document.getElementsByClassName("cart_minus_button");
  buttons = Array.from(buttons);
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", (events) => {
      let bag = JSON.parse(localStorage.getItem("dino_data"));
      let name = events.currentTarget.getAttribute("data-name");
      let check_exist = false;
      for (let i = 0; i < bag.length; i++) {
        let bag_item = bag[i];
        if (bag_item.name == name && bag_item.quantity > 0) {
          bag_item.quantity--;
          check_exist = true;
        }
      }
      save_to_localStorage(bag);
      update_shown_info_cart();
    });
  }
};
let update_shown_info_cart = () => {
  let quantity = document.getElementsByClassName("cart_single_quantity");
  let bag = JSON.parse(localStorage.getItem("dino_data"));
  quantity = Array.from(quantity);
  for (let i = 0; i < quantity.length; i++) {
    let quantity_box = quantity[i];
    let name = quantity_box.getAttribute("data-name");
    let exists = false;
    for (let i = 0; i < bag.length; i++) {
      let bag_item = bag[i];
      if (name == bag_item.name) {
        quantity_box.innerHTML = bag_item.quantity;
        exists = true;
      }
    }
    if (exists == false) {
      quantity_box.innerHTML = 0;
    }
  }
  let bagpack_quantity = document.getElementsByClassName("bagpack_quantity")[0];
  let total_quantity = 0;
  for (let i = 0; i < bag.length; i++) {
    let bag_item = bag[i];
    total_quantity = total_quantity + bag_item.quantity;
  }
  bagpack_quantity.innerHTML = total_quantity;
  let cart_total_amount =
    document.getElementsByClassName("cart_total_amount")[0];
  cart_total_amount.innerHTML = `Total Amount: ${total_amount()}$`;
};
let homepage = () => {
  let bag = localStorage.getItem("dino_data");
  if (bag == null) {
    bag = [];
    localStorage.setItem("dino_data", JSON.stringify(bag));
  } else {
    bag = JSON.parse(bag);
  }
  generate_list(bag);
  plus_button_function(bag);
  minus_button_function(bag);
};
let router = () => {
  let route = () => {
    let page = document.location.hash;
    // console.log(page);
    if (page == "" || page == "#/") {
      homepage();
    }
    if (page == "#/cart") {
      cart_page();
    }
    if (page == "#/confirm_order") {
      confirm_order_function();
    }
  };
  window.addEventListener("hashchange", () => {
    route();
  });
  window.addEventListener("load", () => {
    route();
  });
};
let components = {
  generating_list: generate_list,
  plus_button_function: plus_button_function,
  minus_button_function: minus_button_function,
  update_shown_info: update_shown_info,
  bag_button_function: bag_button_function,
  router: router,
  cart_page: cart_page,
};
export default components;
