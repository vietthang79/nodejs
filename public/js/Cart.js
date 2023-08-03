let OpenShopping = document.querySelector(".shopping");
let CloseShopping = document.querySelector(".closeshopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector(".body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

OpenShopping.addEventListener("click", () => {
  body.classList.add("active");
});

CloseShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

// let products = [
//     {
//         Name : TenSP,
//         Price : GiaSP,
//         Hinh : 'pro_shose2.png'
//     }
// ]

let products = [
  {
    id: 1,
    Name: "TenSP",
    Price: "2000000",
    Hinh: "pro_shose2.png",
  },
  {
    id: 2,
    Name: "TenSP2",
    Price: "3000000",
    Hinh: "pro_shose2.png",
  },
  {
    id: 3,
    Name: "TenSP3",
    Price: "1000000",
    Hinh: "pro_shose2.png",
  },
  {
    id: 4,
    Name: "TenSP4",
    Price: "4000000",
    Hinh: "pro_shose2.png",
  },
  {
    id: 5,
    Name: "TenSP5",
    Price: "5000000",
    Hinh: "pro_shose2.png",
  },
];

let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<img src = "/${value.Hinh}"/>
    <h2 class="card-title">${value.TenSP}</h2>
    <p style="padding-top: 15px;font-weight: bold ;color: red;
                    font-size: 20px;"
                    class="card-text">${s.GiaSP}.đ</p>
    
    `;
    list.appendChild(newDiv);
  });
}
initApp();