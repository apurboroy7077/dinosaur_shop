import components from "./components.js";
let generate_list = components.generating_list;
let plus_button_function = components.plus_button_function;
let minus_button_function = components.minus_button_function;
let update_shown_info = components.update_shown_info;
let bag_button_function = components.bag_button_function;
let router = components.router;
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
update_shown_info();
bag_button_function();
router();
