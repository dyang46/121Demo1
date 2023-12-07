import "./style.css";

//add click and growth counter
let clickCount = 0;
let netGrowth = 0;
let lasttime:number = 0;

//add basic UI
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "KAZ NESTS THE DESK";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.id = "header";

//spider button
const Butest = document.createElement("button");
Butest.style.borderRadius = '10000px';
Butest.style.fontSize = '2em';
Butest.style.opacity = '0.8';
Butest.innerHTML = "🕷️";

//click display
const numDislay = document.createElement("div");
numDislay.innerHTML = `Current nest: 0.00 m²`;
numDislay.id = "num";

//growth rate display
const growDislay = document.createElement("div");
growDislay.innerHTML = `Nest growth rate + 0.00 m²/sec`;
growDislay.id = "rate";

const message = document.createElement("msg");
message.innerHTML = "Nesting kid +1";
message.id = "message";

const nestpic = document.createElement("nest");
nestpic.innerHTML = "🕸️";

//add all to app
app.append(header,Butest, numDislay,growDislay,nestpic);


//Adding shop buttons
interface item{
  cost:number;
  growthRate:number;
  total:number;
  display:string;
  msgKey1:string;
  msgKey2:string;
  msgKey3:string;
  button:HTMLButtonElement;
  msg:HTMLElement;
  dim:boolean;
}

//Shop item list
const itemList: item[] = [
  {
    cost: 10,
    growthRate:0.1,
    total:0,
    display:"Work harder! -",
    msgKey1:" Working ",
    msgKey2:" more hour per day!",
    msgKey3:"  ⸜( *ˊᵕˋ* )⸝ Work harder",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true
  },
  {
    cost: 100,
    growthRate:2.0,
    total:0,
    display:"Lay egg! -",
    msgKey1:" Nesting kid #",
    msgKey2:" is born!",
    msgKey3:"  (╯✧▽✧)╯ Ask your kids to help",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true
  },
  {
    cost: 1000,
    growthRate:50.0,
    total:0,
    display:"Nesting meeting! -",
    msgKey1:" New nesting plan #",
    msgKey2:" has made!",
    msgKey3:"  <(￣︶￣)> ",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true

  },
  { 
    cost: 3000,
    growthRate:100.0,
    total:0,
    display:"Nest refactoring! -",
    msgKey1:" Efficient nest @",
    msgKey2:"  built!",
    msgKey3:"  (*꒦ິ꒳꒦ີ) ",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true

  },
  { 
    cost: 5000,
    growthRate:150.0,
    total:0,
    display:"INTERNEST INTERNEST! -",
    msgKey1:" ",
    msgKey2:"D nesting!",
    msgKey3:"  ☆*:.｡.o(≧▽≦)o.｡.:*☆",
    button:document.createElement("button"),
    msg:document.createElement("msg"),
    dim:true

  }
];

addButton(itemList);    // build shop
Butest.addEventListener('click', ()=>trackMainClick(itemList));    //track shop buttons
requestAnimationFrame(movediv);    //start time

//FUNCTIONS
//shop builder: add item from itemlist to game 
function addButton(itemList: item[]){
  for(const i in itemList){
    const k = itemList[i].button;
    k.disabled = true;
    k.innerHTML = itemList[i].display+itemList[i].cost.toFixed(2);
    app.append(k);
    k.addEventListener('click',()=>trackShop(itemList[i]));
  }

}

//controls click counter and game title display
function updateClickCount() {  
  const clickCountElement = document.getElementById("num");
  if (clickCountElement) {
    clickCountElement.textContent = `Current nest: ${clickCount.toFixed(2)} m²`;
  }
  switch(clickCount.toFixed(0)){
    case '5':
      console.log("reached 100");
      updateGameName("header","KAZ NESTS THE ROOM");
      break;
    case '50':
      updateGameName("header","KAZ NESTS THE HOUSE");
      break;
    case '600':
      updateGameName("header","KAZ NESTS THE BLOCK");
      break;
    case '10000':
      updateGameName("header","KAZ NESTS THE NEIGHBORHOOD");
      break;
  }
}

//change game name function
function updateGameName(t:string,j: string) {
  const GameName = document.getElementById(t);
  if (GameName) {
    GameName.textContent = j;
  }
}

//tracks click count number and connects shop and click display 
function trackMainClick(itemList:item[]) {
  clickCount++;
  updateShop(itemList);  
  updateClickCount();

}

//enable item from shop
function updateShop(itemlist:item[]){
  for(const i in itemlist){
    if (clickCount >= itemlist[i].cost){      
      itemlist[i].button.disabled=false;      
    }else{
      itemlist[i].button.disabled=true;
    }
  }  
}

//price keeper & shop display
function trackShop(i:item){      
    clickCount -= i.cost;
    i.cost = i.cost*1.15;
    i.button.innerHTML = i.display+i.cost.toFixed(2)+i.msgKey3;
    netGrowth += i.growthRate;
    i.total += 1;    
    if(i.dim == true){            
      app.append(i.msg);
      i.dim = false;
    }
    i.msg.textContent = i.msgKey1 + i.total + i.msgKey2;
    

    growDislay.innerHTML = `Nest growth rate + ${netGrowth.toFixed(2)} m²/sec`

    if(clickCount < i.cost){      
      i.button.disabled=true;
    }
}

//tracks time in second
////////////// This is inspired by Michael Long from CMPM121 Fall 2023
function movediv(time:number){

  const passed = time - lasttime;
  lasttime = time;
  const toadd = passed*0.001* netGrowth;

  clickCount += toadd;
  updateClickCount();  
  updateShop(itemList);
  requestAnimationFrame(movediv);
}
////////////////

