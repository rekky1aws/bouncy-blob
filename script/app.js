// Si une touche est pressé, on peut savoir laquelle c'est
document.addEventListener("keydown", (e) => {
    // On vérifie le code de la touche pressée.	
    // console.log(e.code);

    // En fonction de la touche pressée, on execute ce a quoi ca correspond.
    switch (e.code) {
        // Si on passe en plein ecran, on rechange la taille des canvas.
        case "F11":
            sizeCanvas();
            break;

            // Si on appuie sur Entrée, on démarre le jeu.
        case "Enter":
            if (!gameStarted) {
                // console.log("Start"); // DEBUG
                startGame();
            }
            break;

            // Si on appuie sur Espace ou la flèche du haut, on fait remonter l'oiseau.
        case "Space":
            moveUp();
            break;

        case "ArrowUp":
            moveUp();
            break;
    }
});

// Récupération des canvas dans le HTML
const birdCanvas = document.getElementById('bird-canvas');
const pipeCanvas = document.getElementById('pipe-canvas');

// On récupère le contexte 2d de nos deux canvas.
const birdCtx = birdCanvas.getContext("2d");
const pipeCtx = pipeCanvas.getContext("2d");

// console.log(birdCtx); // DEBUG
// console.log(pipeCtx); // DEBUG

// CONSTANTES GLOBALES
// On génère nos médias afin de pouvoir les importer dans les canvas.
// Images
const birdImg = new Image();
const pipeDown = new Image();
const pipeUp = new Image();

// On leur associe les bonnes sources.
birdImg.src = "/media/images/bird.png";
pipeDown.src = "/media/images/pipe-down.png";
pipeUp.src = "/media/images/pipe-up.png";

// Numbers
// Valeurs à modifier pour regler la taille et l'espacement des tuyaux.
const xSize = 700;
const ySize = 700;
const gap = 350;

// Constante permettant de définir le temps d'apparition entre chaque paire de tuyaux.
const timeGap = 3000;

// VARIABLES GLOBALES.
let birdPosition = (birdCanvas.height / 2) - (birdImg.height / 2);
let downSpeed = 0;
let gameStarted = false;
let leftSpeed = 0;
let pipeArr = [
    new Pipe(-300)
];

console.log(pipeArr);

// Initialisation de la taille du canvas.
function sizeCanvas() {
    // On récupère la hauteur et la largeur de l'ecran.
    const windowHeight = window.screen.height;
    const windowWidth = window.screen.width;

    // On affecte les bonnes dimensions au canvas.
    birdCanvas.height = windowHeight;
    pipeCanvas.height = windowHeight;
    pipeCanvas.width = windowWidth;
}

// Fonction dessinant les elements
function drawBird(y) {
    // console.log(birdImg);
    birdCtx.clearRect(0, 0, birdCanvas.width, birdCanvas.height);
    birdCtx.drawImage(birdImg, 5, y, 130, 100);
}

function drawPipes(pipe) {
    // On dessine les deux tuyaux avec l'espace entre les deux
    pipeCtx.drawImage(pipeUp, pipe.x, pipe.y, xSize, ySize);
    pipeCtx.drawImage(pipeDown, pipe.x, gap + pipe.y + ySize, xSize, ySize);
}

// Joue un son
function playSound(vol) {
    // Nouveau objet son
    const flySound = new Audio();
    // Source son
    flySound.src = "/media/sounds/fly.mp3";
    // Volume du son
    flySound.volume = vol;
    // Action de jouer un son
    flySound.play();
}

let volume = document.getElementById('volume');

// Fonctions faisant bouger l'oiseau.
function moveUp() {
    // Si la fonction startGame a déja été executée.
    if (gameStarted) {
        playSound(volume.value);
        birdPosition -= 50;
        downSpeed = 0;
        drawBird(birdPosition);
    }
}

function moveDown() {
    birdPosition += downSpeed;
    drawBird(birdPosition);
    gravite();
}

// Les fonctions "moveLeft" et "scroling" permettent de faire avancer les pipes
function moveLeft() {
    pipeCtx.clearRect(0, 0, pipeCanvas.width, pipeCanvas.height);
    pipeArr.forEach((element) => {
        element.x -= leftSpeed;
        drawPipes(element);
        if (element.x < (window.screen.width) * -1) {
            pipeArr.shift();
        }
    });
    scroling();
    // console.log(pipeArr);
}

function scroling() {
    if (leftSpeed < 5) {
        leftSpeed++;
    }
}

// Fonction permettant de faire tomber l'oiseau avec une légère accélération au début.
function gravite() {
    if (downSpeed < 8) {
        downSpeed++;
    }
}

// Fonction permettant de lancer le jeu.
function startGame() {
    // On indique dans notre variable globale que le jeu a commencé.
    gameStarted = true;

    // On cache le message qui nous indique comment jouer.
    document.getElementById('tuto').style.display = "none";

    // On fait en sorte que l'oiseau tombe.
    setInterval(moveDown, 30);

    // Exècute la fonction "moveLeft" avec un interval
    setInterval(moveLeft, 30);

    // Genere des tuyaux à chaque intervalle de timeGap ms
    setInterval(generatePipe, timeGap);
}

function randInt(min, max) {
    if (min !== Math.floor(min) || max !== Math.floor(max)) {
        console.warn("You should use integer, the funtion will retuen a result between", Math.floor(min), "and", Math.floor(max));
    }

    if (min === max) {
        console.error("Parameters can't be equal");
        return undefined;
    } else if (max < min) {
        console.error("First parameter should be less than the second");
        return undefined;
    } else {
        return Math.floor(min) + Math.floor(Math.random() * (max - min))
    }
}

function generatePipe(minY = 50 - ySize, maxY = window.innerHeight - ySize - gap - 50) {
    pipeArr.push(new Pipe(randInt(minY, maxY)));
}

// Fonction qui s'execute au chargement de la page.
function loader() {
    // Au chargement de la page on charge la bonne taille pour les canvas et on place l'oiseau au bon endroit.
    sizeCanvas();
    drawBird(birdPosition);

    // Ces lignes démontrent que l'on peut afficher les pipes dans le canvas, elle sont tempraires.
    // drawPipes(500, -300);
    // drawPipes(700, -200);

    pipeArr.forEach((element) => {
        drawPipes(element);
    })
}