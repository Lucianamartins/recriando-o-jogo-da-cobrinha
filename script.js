/*
 Bugs encontrados:
 1) a cobra não aparece ao atravessar a parede inferior;
 
 2) as comidinhas conseguem aparecer no corpo da cobra;
 
 3) a cobra consegue andar numa pequena "margem invisível"
    nas bordas do quadro verde antes de aparecer na parede
    contrária;
*/

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];

snake [0] =  {
    x: 8 * box,
    y: 8 * box
}

let direction = "rigth";

let food = {
    x: Math.floor(Math. random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0,  16 * box, 16 * box);
}
/* aqui eu escondo a cobra */
function criarCobrinha() {

    for (i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box ); 
    }

}

 function drawfood(){

     context.fillStyle = "red";
     context.fillRect(food.x, food.y, box, box );

 }

document.addEventListener('keydown' , update );
function update (event){
if(event.keyCode == 37 && direction != "rigth") direction = "left";
if(event.keyCode == 38 && direction != "down") direction = "up";
if(event.keyCode == 39 && direction != "left") direction= "rigth";
if(event.keyCode == 40 && direction != "up") direction= "down";
}

function resetarJogo() {

    snake = [];
    snake.push({
        x: 8 * box,
        y: 8 * box
    })

    direction = "rigth";
    food = {
        x: food.x = Math.floor(Math.random() * 15 + 1) * box,
        y: food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    jogo = null;

}

/* aqui é os movimentos, da cobra faz ela andar entre as paredes  */
function iniciarJogo(){

     if(snake[0].x > 15 * box && direction == "rigth" ) snake[0].x = 0;
     if(snake[0].x < 0 && direction == "left" ) snake[0].x = 16 * box;
     if(snake[0].y > 15 * box && direction == "down")snake.y = 0;
     if(snake[0].y <  0 && direction == "up") snake[0].y = 16 * box;

     for(i = 1; i < snake.length; i++){
         if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
             clearInterval(jogo);
             alert('Game Over :(' );
             resetarJogo();
         }
     }
    /* aqui eu chamo as funcoes*/
    criarBG(); 
    criarCobrinha();
    drawfood();

    let snakeX = snake[0].x;
    let snakeY= snake[0].y;

    if(direction == "rigth" ) snakeX += box;
    if(direction == "left" ) snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;


    if(snakeX != food.x || snakeY != food.y)
        snake.pop();
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}


let jogo;
criarBG();

document.addEventListener('keydown', () => {
    if(!jogo)
        jogo = setInterval(iniciarJogo, 75);    
});
 