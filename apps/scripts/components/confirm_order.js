let confirm_order_function = () => {
  let main_div = document.getElementsByTagName("main")[0];
  main_div.style.backgroundImage =
    'url("apps/images/background/velociraptor.jpg")';
  main_div.innerHTML = `<div class="form_div">
  <form name="submit-to-google-sheet" class="form">
    <div class="username_div">
      <div class="username_div_1">Name</div>
      <div class="username_div_2">
        <input  placeholder="Name" name="Name" type="text" required class="username_input" />
      </div>
    </div>
    <div class="email_div">
      <div class="email_div_1">Email Address</div>
      <div class="email_div_2">
        <input placeholder="Email" name="Email" type="email" required class="email_input" />
      </div>
    </div>
    <div class="order_info">
      <div class="order_info_1">order_info</div>
      <div class="order_info_2">
        <input placeholder="order" name="Message" type="text" class="order_input" />
      </div>
    </div>
    <div class="submit_div">
      <button type="submit" class="place_order_button">
        Place Order
      </button>
    </div>
    <div id="msg"></div>
  </form>
</div>`;
  let bag = localStorage.getItem("dino_data");
  let order_info = document.getElementsByClassName("order_input")[0];
  order_info.value = bag;
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzDklBWeSE3PruliXpjdQhx75LGgTUkjjEFyI_gM4dDIWQLRP_JH819uzCNC59EOHni/exec";
  const form = document.forms["submit-to-google-sheet"];
  const msg = document.getElementById("msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        msg.innerHTML = "Order Place Successful";
        setTimeout(() => {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      })
      .catch((error) => {
        msg.innerHTML = "Sorry, Failed to Send";
        setTimeout(() => {
          msg.innerHTML = "";
        }, 3000);
      });
  });
};
export default confirm_order_function;
