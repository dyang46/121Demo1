import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "KAZ BUZZ";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const Butest = document.createElement("button");
Butest.innerHTML = "🕷️";

const unitName = document.createElement("div");

unitName.innerHTML= "Nest ";

const numDislay = document.createElement("div");
numDislay.id = "num";

app.append(header,Butest,unitName, numDislay);

let clickCount = 0;

function trackButtonClick() {
  clickCount++;
  console.log(clickCount);
  updateClickCount();
}

function updateClickCount() {
  const clickCountElement = document.getElementById("num");
  if (clickCountElement) {
    clickCountElement.textContent = clickCount.toString();
  }
}

//track each click

Butest.addEventListener('click', trackButtonClick);

//Old Step 3 code

/*setInterval(() => {
  clickCount++;
  updateClickCount();
}, 1000);*/
let k = 0;
function movediv(timestamp){
  //if (timestamp % 100 ==0){
    k++;
    if (k % 60 == 0){clickCount++;
    updateClickCount();}
  //}
  //clickCount++;
  
  requestAnimationFrame(movediv);
}
requestAnimationFrame(movediv);