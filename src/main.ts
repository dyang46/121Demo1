import "./style.css";

//add click and growth counter
let clickCount = 0;
let netGrowth = 0;

//add basic UI
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "KAZ NEST THE DESK";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.id = "header";

const Butest = document.createElement("button");
Butest.innerHTML = "🕷️";

const numDislay = document.createElement("div");
numDislay.innerHTML = `Current nest: 0.00 m²`;
numDislay.id = "num";

const growDislay = document.createElement("div");
growDislay.innerHTML = `Nest growth rate + 0.00 m²/sec`;
growDislay.id = "rate";

const message = document.createElement("msg");
message.innerHTML = "Nesting kid x1";
message.id = "message";

app.append(header,Butest, numDislay,growDislay);
//finish basics

//Adding shop buttons
interface item{
  cost:number;
  growthRate:number;
  total:number;
  display:string;
  msgKey:string;
  button:HTMLButtonElement;
  dim:boolean;
}

//Shop item list
const itemList: item[] = [
  {
    cost: 10,
    growthRate:0.1,
    total:0,
    display:"Work harder! -",
    msgKey:"Working 1 more hour per day!",
    button:document.createElement("button"),
    dim:true
  },
  {
    cost: 100,
    growthRate:2.0,
    total:0,
    display:"Lay egg! -",
    msgKey:"Nesting kid #1 is born",
    button:document.createElement("button"),
    dim:true
  },
  {
    cost: 1000,
    growthRate:50.0,
    total:0,
    display:"Annual meeting! -",
    msgKey:"New nesting plan has made",
    button:document.createElement("button"),
    dim:true

  },
  { 
    cost: 5000,
    growthRate:100.0,
    total:0,
    display:"Build Internest! -",
    msgKey:"12D nesting",
    button:document.createElement("button"),
    dim:true

  }
];

addButton(itemList);

function addButton(itemList: item[]){
  for(const i in itemList){
    const k = itemList[i].button;
    k.disabled = true;
    k.innerHTML = itemList[i].display+itemList[i].cost.toFixed(2);
    app.append(k);
    console.log(itemList[i].msgKey);
    k.addEventListener('click',()=>trackShop(itemList[i]));
  }

}

function updateClickCount() {  
  const clickCountElement = document.getElementById("num");
  if (clickCountElement) {
    clickCountElement.textContent = `Current nest: ${clickCount.toFixed(2)} m²`;
  }
  switch(clickCount.toFixed(0)){
    case '5':
      console.log("reached 100");
      updateGameName("header","KAZ NEST THE ROOM");
      break;
    case '50':
      updateGameName("header","KAZ NEST THE HOUSE");
      break;
    case '600':
      updateGameName("header","KAZ NEST THE BLOCK");
      break;
    case '1000000':
      updateGameName("header","KAZ NEST THE NEIGHBORHOOD");
      break;
  }
}


function updateGameName(t:string,j: string) {
  const GameName = document.getElementById(t);
  if (GameName) {
    GameName.textContent = j;
  }
}

function trackMainClick(itemList:item[]) {
  clickCount++;
  updateShop(itemList);  
  updateClickCount();

}

Butest.addEventListener('click', ()=>trackMainClick(itemList));



function updateShop(itemlist:item[]){
  for(const i in itemlist){
    if (clickCount >= itemlist[i].cost){      
      itemlist[i].button.disabled=false;
      console.log('click');
    }else{
      itemlist[i].button.disabled=true;
    }
  }  
}

function trackShop(i:item){      
    clickCount -= i.cost;
    i.cost = i.cost*1.15;
    i.button.innerHTML = i.display+i.cost.toFixed(2);
    netGrowth += i.growthRate;

    growDislay.innerHTML = `Nest growth rate + ${netGrowth.toFixed(2)} m²/sec`

    if(clickCount < i.cost){      
      i.button.disabled=true;
    }
}

let lasttime:number = 0;

function movediv(time:number){

  const passed = time - lasttime;
  lasttime = time;
  const toadd = passed*0.001* netGrowth;

  clickCount += toadd;
  updateClickCount();  
  updateShop(itemList);
  requestAnimationFrame(movediv);
}

requestAnimationFrame(movediv);
