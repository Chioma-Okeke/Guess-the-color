const squares = document.querySelectorAll(".square")
const headerTexts = document.querySelector("header h1")
var color = []
const reset = document.querySelector("#reset")
var winColor, winInde
const goal = document.querySelector("#goal")
const message = document.querySelector("#message")
const numSquare = 6
const bodyColor = window.getComputedStyle(document.body)['backgroundColor']
const header = document.querySelector("header")
setSquareColor(numSquare)
const blurred = document.querySelector(".blur")
const gameOverCard = document.querySelector(".game-over")
let count = 0


squares.forEach(square => {
    square.addEventListener("click", () => {
        if (winColor === square.style.backgroundColor) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: {y: 0.6}
            })
            convertAll()
        } else {
            count = count + 1
            console.log(document)
            textErrorVibration()
            if (count === 5) {
                square.style.backgroundColor = bodyColor
                blurred.classList.toggle('active')
                gameOverCard.classList.toggle('active')
                return
            }
            square.style.backgroundColor = bodyColor
            message.textContent = "Try again!"
        }
    })
})

function rgbGenerator() {
    let red = Math.floor(Math.random()*256)
    let green = Math.floor(Math.random()*256)
    let blue = Math.floor(Math.random()*256)

    let generatedColor = `rgb(${red}, ${green}, ${blue})`
    return generatedColor
}

function convertAll () {
    squares.forEach(square => {
        square.style.backgroundColor = winColor.toString()
        header.style.backgroundColor = winColor.toString()
        reset.textContent= "Play Again?"
        message.textContent = "Correct!"
    })
}

function setSquareColor (numSquare) {
    header.style.backgroundColor = "steelblue"

    color.length = numSquare

    // to generate the 6 colors
    for(let i = 0; i<numSquare; i++) {
        color[i] = rgbGenerator()
    }

    // to set the color for each quare
    for(let i = 0; i<numSquare; i++) {
        squares[i].style.backgroundColor = color[i].toString()
    }
    winIndex = Math.floor(Math.random()*(color.length))
    goal.textContent = color[winIndex]
    winColor = color[winIndex]
    message.textContent = ""
}

function textErrorVibration () {
    headerTexts.classList.add("shake")

    setTimeout(() => {
        headerTexts.classList.remove("shake") 
    }, 500);
}

function resetGame() {
    count = 0
    blurred.classList.toggle('active')
    gameOverCard.classList.toggle('active')
    setSquareColor(numSquare)
    reset.textContent = "New Colors"
}

reset.addEventListener("click", () => {
    count = 0
    setSquareColor(numSquare)
    reset.textContent = "New Colors"
})