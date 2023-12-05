import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "KAZ BUZZ";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//set click counter 
let clickCount = 0;

function trackButtonClick() {
  clickCount++;
  updateClickCount();
}
//print #click
function updateClickCount() {
  const clickCountElement = document.getElementById('clickCount');
  if (clickCountElement) {
    clickCountElement.textContent = clickCount.toString();
  }
}
//track each click
const button = document.getElementById('trackButton');
if (button) {
  button.addEventListener('click', trackButtonClick);
}




