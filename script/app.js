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

// Récupération des canvas dans le HTML
const birdCanvas = document.getElementById('bird-canvas');
const pipeCanvas = document.getElementById('pipe-canvas');

// On récupère le contexte 2d de nos deux canvas.
const birdCtx = birdCanvas.getContext("2d");
const pipeCtx = pipeCanvas.getContext("2d");

// console.log(birdCtx); // DEBUG
// console.log(pipeCtx); // DEBUG

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

if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substring(0, 5))) {
    document.addEventListener("click", () => {
        if (!gameStarted) {
            startGame();
        } else {
            moveUp();
        }
    });
}

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