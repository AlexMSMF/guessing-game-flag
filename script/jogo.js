



(function () {     // assim todas as variaveis criadas aqui so corre neste scrip e nao afecta outros

    let number;
    let moves;
    let timer; //Temos de criar uma variavel para dizer ao Countdown que quando chegar a 0 ele tem de parar!!!
    let level;
    let lives;

    let newGameButton;
    let addNumberButton;
    let userInput;
    let helpImage;
    let gameList;
    let statusContent;
    let timeContent;

    function init() {
        createElements();
        createListener();
    }

    
function createElements () {
    newGameButton = document.querySelector('#newGameButton');
    addNumberButton = document.querySelector('#addNumberButton');
    userInput = document.querySelector('#userInput');
    helpImage = document.querySelector('#helpImage');
    gameList = document.querySelector('#gameList');
    statusContent = document.querySelector('#statusContent');
    timeContent = document.querySelector('#timeContent');

}

function createListener() {
    newGameButton.addEventListener("click", startGame);   // funcao para o botao arrancar igual ao "onclick", onlick é usado no html 
    addNumberButton.addEventListener("click", play);  

}

    function startGame () {
        level = document.querySelector('input[name=level]:checked').value; //Definimos o nivel e o input que vamos meter
        number = Math.floor(Math.random() * 100) + 1;    // florr. arredonda para baixo gera ate ao 99 dai ser preciso meter o  +1 random cria numer ate ao 100, 
        moves = [];

        helpImage.setAttribute('src','images/question.png');
        statusContent.innerHTML = '';
        gameList.innerHTML = ''; 

        
        let time; //Countdown primeiro temos de colocar em HTML
        
        switch (level) {
            case "1":
                time = 120;
                lives = 20;
            break;
            case "2":
                time = 60;
                lives = 10
            break;
            case "3":
                time = 30;
                lives = 5;
            break;
        }
        
        startTimer(time);

    }

    function startTimer(time) {
        clearInterval(timer);
        timer = setInterval(function() { //Colocamos aqui o timer variavel para definir que é igual ao nosso intervalo até 0
            time--;
            timeContent.textContent = time;

            if (time <= 0) {
                endGame(false); // Aqui dizemos que caso o count seja 0 ou menos o jogo não é ganho, dai ser endGame(false)
            }
        }, 1000);
    }

    function play () {
        helpImage.setAttribute('src', '');
        const move = parseInt(userInput.value);   // nº de jogadas que vai pegar nas jogadas feitas pelo o utilizador
        moves.push(move);    // addiciona a seguinte jogada ao resumo das jogadas com o push

        if (isWinner(move)) {
            endGame(true);
      } else {
          if (moves.length == lives) {
              endGame(false);
          } else {
              help(move);
          }
      }

      userInput.value = "";

    }

    function endGame (win) { //  "win assume o resultado da funcão
        clearInterval(timer);
    if (win) {
        helpImage.setAttribute('src', 'images/happy.png');
        statusContent.innerHTML = `<h1>Ganhou em ${moves.length}} `;
    } else {
        helpImage.setAttribute('src', 'images/sad.png');
        statusContent.innerHTML = `<h1>Perdeu.O número era o ${number}`;
    }

    }

    function isWinner (move) {
        return move == number;


    }

    function help (move) {
        if (move > number){
            helpImage.setAttribute('src', 'images/down.png') ;    //forma de adicionar uma foto por JS
        } else {
            helpImage.setAttribute('src', 'images/up.png');
        }

        const listItem = document.createElement('li');
        listItem.textContent = isNaN(move) ? 'jogada invalida' : move;
        
        const playImage = document.createElement('img');
        playImage.setAttribute('src', helpImage.getAttribute('src')); //Ir buscar o caminho da imagem que temos lá em
        playImage.style.width = "10px";
        
        listItem.appendChild(playImage);
        gameList.appendChild(listItem);




    }

    window.addEventListener('load', init);

} )();