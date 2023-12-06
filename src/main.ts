import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "KAZ BUZZ";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
const Butest = document.createElement("button");
Butest.innerHTML = "🕷️";
const unitName = document.createElement("div");
unitName.id = "a";
unitName.innerHTML= "Nest ";
const numDislay = document.createElement("div");
numDislay.id = "lemme";

let clickCount = 0;

function trackButtonClick() {
  clickCount++;
  console.log(clickCount);
  updateClickCount();
}
function updateClickCount() {
  const clickCountElement = document.getElementById("lemme");
  if (clickCountElement) {
    clickCountElement.textContent = clickCount.toString();
  }
}
//track each click

Butest.addEventListener('click', trackButtonClick);

app.append(header,Butest,unitName, numDislay);


setInterval(() => {
  clickCount++;
  updateClickCount();
}, 1000);

