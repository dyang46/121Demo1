import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "KAZ NEST THE HOUSE";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.id = "header";

const Butest = document.createElement("button");
Butest.innerHTML = "🕷️";

const Shop = document.createElement("button");
Shop.innerHTML = "Lay egg: -10 m² per each";
Shop.disabled=true;
Shop.id = "shop";

const unitName = document.createElement("div");

unitName.innerHTML= "Nest (unit: m²)";

const numDislay = document.createElement("div");
numDislay.innerHTML = "0";
numDislay.id = "num";

const message = document.createElement("msg");
message.innerHTML = "Nesting kid x1";
message.id = "message";

app.append(header,Butest,unitName, numDislay,Shop);

let clickCount = 0;
let shopCount = 0;



function trackButtonClick() {
  clickCount++;
  if (clickCount==10){
    updateShop();
    //requestAnimationFrame(movediv);
  }
  console.log(clickCount);
  updateClickCount();
}

function updateClickCount() {
  const clickCountElement = document.getElementById("num");
  if (clickCountElement) {
    clickCountElement.textContent = clickCount.toString();
  }
  switch(clickCount){
    case 70:
      console.log("reached 100");
      updateGameName("header","KAZ NEST THE NEIGHBORHOOD");
      break;
    case 1000:
      updateGameName("header","KAZ NEST THE CITY");
      break;
    case 10000:
      updateGameName("header","KAZ NEST THE COUNTRY");
      break;
    case 1000000:
      updateGameName("header","KAZ NEST THE EARTH");
      break;
  }
}

function updateShop(){
  if(Shop.disabled == true){
    const Shopelement = document.getElementById("shop");
    if (Shopelement){
      Shop.disabled =false;
    }
  }else{
    const shopCountElement = document.getElementById("message");
    if (shopCountElement) {
      shopCountElement.textContent = "Nesting kids x"+shopCount.toString();
  }
  }
  
}

function updateGameName(t:string,j: string) {
  const GameName = document.getElementById(t);
  if (GameName) {
    GameName.textContent = j;
  }
}

function trackShopClick(){
  if (clickCount >=10){
  clickCount -= 10;  
  requestAnimationFrame(movediv);
  shopCount ++;
  updateShop();
  app.append(message);
  }
}


//track each click

Butest.addEventListener('click', trackButtonClick);
Shop.addEventListener('click', trackShopClick);
//Old Step 3 code

/*setInterval(() => {
  clickCount++;
  updateClickCount();
}, 1000);*/


let k = 0;

function movediv(){
    k++;
    if (k % 60 == 0){clickCount++;
    updateClickCount();
  }  
  requestAnimationFrame(movediv);
}
