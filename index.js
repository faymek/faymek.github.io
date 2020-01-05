async function getVerses() {
    const result = JSON.parse(localStorage.getItem("verses"));
    const verses = (await !result) ? INITIAL_VERSES : result;

    fetchVerses();
    return verses;
}

async function fetchVerses() {
    let res = await fetch("https://api.gushi.ci/all.json");
    let verses = await res.json();

    localStorage.setItem("verses", JSON.stringify(verses));
}

const INITIAL_VERSES = {
    author: "王维",
    content: "红豆生南国，春来发几枝。",
    origin: "相思"
};

let yScale = 200,
    font,
    canvas,
    verses,
    isMoving = true;

const mountains = [];

function preload() {
    font = loadFont("fonts/FZXiJinLJW.TTF");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);

    background(230);

    growMountains();
    mountains.forEach(m => m.display());

    if (isMoving) {
        loop();
    } else {
        noLoop();
    }
}

function draw() {
    background(230);

    mountains.forEach(m => m.display());
}

window.onload = function () {
    document.querySelector("#save").addEventListener("click", () => {
        saveCanvas(canvas, "jizhi-bg", "jpg");
    });

    const moveBtn = document.querySelector("#move");

    moveBtn.addEventListener("click", () => {
        isMoving = !isMoving;

        if (isMoving) {
            loop();
        } else {
            noLoop();
        }
    });

    getVerses().then(res => {
        verses = res;
        document.querySelector("#verses-content").innerHTML = verses.content;
        document.querySelector(
            "#verses-link"
        ).href = `https://www.google.com/search?q=${verses.author} ${verses.origin}`;
        document.querySelector("#title").innerHTML = `「 ${verses.origin} 」`;
        document.querySelector("#author").innerHTML = verses.author;
    });
};

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
