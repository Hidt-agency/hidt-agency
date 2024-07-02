const textElement = document.getElementsByClassName('made-in');
const texts = ['Immersive web experiences\n Made in Ukraine', 'DIGITAL AGENCY\n Made in Ukraine'];
let currentIndex = 0;

function changeText() {
    textElement.textContent = texts[currentIndex];
    console.log(textElement.textContent);
    currentIndex = (currentIndex + 1) % texts.length;
    console.log(texts[currentIndex]);
}

setInterval(changeText, 5000);