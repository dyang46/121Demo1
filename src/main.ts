import "./style.css";

let clickCount = 0;
let shopCount = 0;
let netGrowth = 0;

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
numDislay.innerHTML = `${clickCount}`;
numDislay.id = "num";

const message = document.createElement("msg");
message.innerHTML = "Nesting kid x1";
message.id = "message";

interface item{
  cost:number;
  growthRate:number;
  display:string;
  msgKey:string;
  id:string;
}

const itemList: item[] = [];

function addButton(cost:number, growthRate:number,display:string,msgKey:string,id:string){
  const newB=  document.createElement("button");
  newB.innerHTML = display;
  newB.id = id;
  newB.disabled = true;
  app.append(newB);
  itemList.push({cost,growthRate,display,msgKey,id});
}

app.append(header,Butest,unitName, numDislay,Shop);

addButton(10,0.1,"Work harder","New plan made","i1");
addButton(100,2.0,"Lay egg","New plan made","i2");
addButton(1000,50,"Build a spider house","New plan made","i3");
addButton(5000,100,"Start annul spider meeting","New plan made","i4");
addButton(10000,1000,"Internest","New plan made","i5");

function trackButtonClick() {
  clickCount++;
  if (clickCount==10){
    updateShop();
    //requestAnimationFrame(movediv);
  }
  //console.log(clickCount);
  updateClickCount();
}

function updateClickCount() {
  const clickCountElement = document.getElementById("num");
  if (clickCountElement) {
    clickCountElement.textContent = `${clickCount.toFixed(0)}`;
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

let lasttime:number = 0;

function movediv(time:number){
  //console.log("time:" + time);
  const passed = time - lasttime;
  lasttime = time;
  const toadd = passed*0.001*netGrowth;
  //console.log("this is to add:" + toadd);
  clickCount += toadd;
  //console.log(clickCount);
  updateClickCount();  
  requestAnimationFrame(movediv);
}
requestAnimationFrame(movediv);
function trackShopClick(){
  if (clickCount >=10){
  //console.log(clickCount);
  clickCount -= 10;  
  netGrowth += 1;
  //requestAnimationFrame(movediv);
  shopCount ++;
  updateShop();
  app.append(message);
  }
}


//track each click

Butest.addEventListener('click', trackButtonClick);
Shop.addEventListener('click', trackShopClick);




//requestAnimationFrame(movediv);
//Old Step 3 code

/*setInterval(() => {
  clickCount++;
  updateClickCount();
}, 1000);*/
