const colors = [
    "rgb(255, 99, 71)",
    "rgb(135, 206, 250)",
    "rgb(50, 205, 50)",
    "rgb(255, 215, 0)",
    "rgb(70, 130, 180)",
    "rgb(255, 69, 0)",
    "rgb(218, 112, 214)",
    "rgb(34, 139, 34)",
    "rgb(255, 160, 122)",
    "rgb(0, 255, 255)",
    "rgb(255, 105, 180)",
    "rgb(210, 180, 140)",
    "rgb(123, 104, 238)",
    "rgb(255, 140, 0)",
    "rgb(95, 158, 160)",
    "rgb(75, 0, 130)",
    "rgb(240, 128, 128)",
    "rgb(0, 191, 255)",
    "rgb(46, 139, 87)",
    "rgb(255, 20, 147)",
];
let contrastingColors = [];
const squares = document.querySelectorAll(".square");
const reset = document.querySelector("#reset");
const goal = document.querySelector("#goal");
const message = document.querySelector("#game-status");
const bodyColor = window.getComputedStyle(document.body)["backgroundColor"];
const wins = document.querySelector("#win-stat");
const losses = document.querySelector("#loss-stat");
let winCount = 0;
let targetColor;

const generateTargetColor = () => {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    goal.style.backgroundColor = targetColor.toString();
};

const luminanceGenerator = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return (r * 299 + g * 587 + b * 114) / 1000;
};

const randomRgbGenerator = () =>
    `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;

const getContrastingColors = (targetColor, numColors = 6, threshold = 128) => {
    contrastingColors = [];
    let targetLuminance = luminanceGenerator(targetColor);

    while (contrastingColors.length < numColors - 1) {
        let newColor = randomRgbGenerator();
        let newLuminance = luminanceGenerator(newColor);

        if (
            Math.abs(targetLuminance - newLuminance) >= threshold &&
            !contrastingColors.includes(newColor)
        ) {
            contrastingColors.push(newColor);
        }
    }
    contrastingColors.push(targetColor);
    shuffleArray(contrastingColors);

    squares.forEach((square, index) => {
        square.style.backgroundColor = contrastingColors[index].toString();
        square.style.boxShadow = "0px 0px 4px white";
    });
};

const shuffleArray = (array) => {
    let currentIndex = array.length;

    while (currentIndex > 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
};

generateTargetColor();
getContrastingColors(targetColor);

squares.forEach((square) => {
    square.addEventListener("click", () => {
        if (targetColor === square.style.backgroundColor) {
            confetti({
                particleCount: 150,
                spread: 90,
                startVelocity: 40,
                scalar: 1.2,
                gravity: 0.7,
                ticks: 200,
                origin: { y: 0.6 },
            });
            convertAll();
            winCount++;
            setTimeout(() => {
                nextRound();
            }, 1000);
        } else {
            textErrorVibration(square);
        }
        wins.textContent = winCount;
    });
});

const convertAll = () => {
    squares.forEach((square) => {
        square.style.backgroundColor = targetColor;
        message.textContent = "Correct!";
        message.style.backgroundColor = "green";
    });
};

const textErrorVibration = (square) => {
    square.classList.add("shake");
    square.style.backgroundColor = bodyColor
    square.style.boxShadow = "0px 0px 5px 4px red";
    message.textContent = "Wrong, try again!";
    message.style.backgroundColor = "red";
    setTimeout(() => {
        square.classList.remove("shake");
        square.style.boxShadow = "0px 0px 5px white";
        // message.textContent = "";
    }, 1000);
};

const nextRound = (square) => {
    generateTargetColor();
    getContrastingColors(targetColor);
    // message.textContent = "";
    square.style.boxShadow = "0px 0px 4px white";
};

reset.addEventListener("click", () => {
    targetColor = localStorage.getItem("initial target color");
    goal.style.backgroundColor = targetColor;
    contrastingColors = [];
    contrastingColors = JSON.parse(
        localStorage.getItem("initial contrasting colors")
    );
    squares.forEach((square, index) => {
        square.style.backgroundColor = contrastingColors[index].toString();
        square.style.boxShadow = "none";
    });
    message.textContent = "";
    message.style.backgroundColor = "transparent";
    winCount = 0;
    wins.textContent = winCount;
});

window.addEventListener("load", () => {
    if (
        !localStorage.getItem("initial target color") &&
        !localStorage.getItem("initial contrasting colors")
    ) {
        localStorage.setItem("initial target color", targetColor);
        localStorage.setItem(
            "initial contrasting colors",
            JSON.stringify(contrastingColors)
        );
    }
});
