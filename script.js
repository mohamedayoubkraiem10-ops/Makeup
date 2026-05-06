// ================= USER SYSTEM =================
function register(e){
  e.preventDefault();

  let email = document.getElementById("regEmail").value;
  let pass  = document.getElementById("regPass").value;

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPass", pass);

  alert("Account created 🎉");
  window.location="login.html";
}

function login(e){
  e.preventDefault();

  let email = document.getElementById("loginEmail").value;
  let pass  = document.getElementById("loginPass").value;

  let savedEmail = localStorage.getItem("userEmail");
  let savedPass  = localStorage.getItem("userPass");

  if(email === savedEmail && pass === savedPass){
    localStorage.setItem("loggedIn","true");
    alert("Welcome back 💖");
    window.location="index.html";
  }else{
    alert("Wrong email or password");
  }
}

function logout(){
  localStorage.removeItem("loggedIn");
  location.href="index.html";
}

// ================= NAVBAR LOGIN STATE =================
window.addEventListener("load", ()=>{
  if(localStorage.getItem("loggedIn")){
    let btns = document.querySelectorAll(".loginBtn");
    btns.forEach(btn=>{
      btn.innerHTML="Logout";
      btn.onclick=logout;
    });
  }
});

// ================= CART SYSTEM =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, img){
  price = Number(price);

  cart.push({name, price, img});
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart 🛒");
}

function displayCart(){
  let container = document.getElementById("cartItems");
  if(!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, i)=>{
    total += item.price;

    container.innerHTML += `
      <div class="cartItem">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <button onclick="removeItem(${i})">❌</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "$" + total;
}

function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ================= WISHLIST =================
let wish = JSON.parse(localStorage.getItem("wish")) || [];

function addToWish(name, img){
  wish.push({name, img});
  localStorage.setItem("wish", JSON.stringify(wish));
  alert("Added to Wishlist ❤️");
}

function displayWish(){
  let box = document.getElementById("wishItems");
  if(!box) return;

  box.innerHTML = "";

  wish.forEach(item=>{
    box.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.name}</h3>
      </div>
    `;
  });
}

// ================= CHECKOUT =================
function placeOrder(e){
  e.preventDefault();

  alert("Order placed successfully 🎉");

  localStorage.removeItem("cart");
  window.location="index.html";
}

// ================= REVIEWS (MULTIPLE) =================
function addReview(){
  let txt = document.getElementById("reviewText");
  if(!txt) return;

  let text = txt.value;
  if(text === "") return;

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  reviews.push(text);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  txt.value = "";
  loadReviews();
}

function loadReviews(){
  let box = document.getElementById("reviewsList");
  if(!box) return;

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  box.innerHTML = "";

  reviews.forEach(r=>{
    box.innerHTML += `
      <div style="border-top:1px solid #eee;padding:10px">
        ⭐ ${r}
      </div>
    `;
  });
}