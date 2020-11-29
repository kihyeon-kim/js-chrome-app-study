const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.setAttribute("style", "position: absolute;top:0;left:0;width:100%;height:100%;z-index:-1")
    body.appendChild(image)
}

function genRandom() {
    return Math.floor(Math.random() * IMG_NUMBER);
}

function init() {
    paintImage(genRandom());
}

init();
