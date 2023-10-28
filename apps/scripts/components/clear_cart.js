let clear_cart_function = () => {
  let button = document.getElementsByClassName("clear_cart_button")[0];
  button.addEventListener("click", () => {
    let bag = [];
    localStorage.setItem("dino_data", JSON.stringify(bag));
    location.reload();
  });
};
export default clear_cart_function;
