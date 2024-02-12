
var playerNames = [];
var cardSize = 4; 
var currentPlayerIndex = 0;
var turnCounter = 0;
var numbersCalled = [];
var playerCards = [];

function startGame() {
   var namesInput = document.getElementById('player-names');
   playerNames = namesInput.value.split(',').map(name => name.trim());
   cardSize = parseInt(document.getElementById('card-size').value);


   document.getElementById('main-menu').style.display = 'none';
   document.getElementById('game-board').style.display = 'block';


   for (var i = 0; i < playerNames.length; i++) {
      var card = generateRandomCard();
      playerCards.push(card);
      displayCard(card, i === 0);
      displayPlayerName(playerNames[i]);
   }
   updateCurrentPlayerDisplay();
}

function generateRandomCard() {
   var card = [];
   var numbers = [];

   for (var i = 1; i <= 50; i++) {
      numbers.push(i);
   }

   for (var row = 0; row < cardSize; row++) {
      var rowNumbers = [];
      for (var col = 0; col < cardSize; col++) {
         var randomIndex = Math.floor(Math.random() * numbers.length);
         var number = numbers.splice(randomIndex, 1)[0];
         rowNumbers.push(number);
      }
      card.push(rowNumbers);
   }

   return card;
}

function displayCard(card, highlight) {
   var cardContainer = document.getElementById('card-container');
   cardContainer.innerHTML = ''; 

   var cardSize = card.length; 

   var cellSize = 100 / cardSize; 

   for (var row = 0; row < cardSize; row++) {
      for (var col = 0; col < cardSize; col++) {
         var number = card[row][col];
         var cell = document.createElement('div');
         cell.classList.add('card');
         cell.style.width = cellSize + '%'; 
         cell.style.height = cellSize + '%'; 

         if (number === -1) {
            cell.textContent = 'X';
            cell.style.backgroundColor = 'gray'; 
         } else {
            cell.textContent = number; 
         }

         if (highlight && playerCards[currentPlayerIndex][row][col] === number) {
            cell.classList.add('highlight');
         }

         cardContainer.appendChild(cell);
      }
   }
}


function displayPlayerName(name) {
   var playerList = document.getElementById('player-list');
   var playerName = document.createElement('div');
   playerName.classList.add('player-name');
   playerName.textContent = name;
   playerList.appendChild(playerName);
}


function updateCurrentPlayerDisplay() {
   var currentPlayerDisplay = document.getElementById('current-player');
   currentPlayerDisplay.textContent = playerNames[currentPlayerIndex];
}


function drawNumber() {

   if (turnCounter === 25*playerNames.length) {
      checkWinCondition();
      var incompletePlayers = [];
      for (var i = 0; i < playerNames.length; i++) {
         var currentPlayerCard = playerCards[i];
         var isCardFull = currentPlayerCard.every(row => row.every(number => number === -1));
      
         if (!isCardFull) {
            incompletePlayers.push(playerNames[i]);
         }
      }
      
      document.getElementById('game-result').textContent += '\nJugadores incompletos: ' + incompletePlayers.join(', ');
      
         
      return;
   }

   var randomNumber;
   do {
      randomNumber = Math.floor(Math.random() * 50) + 1;
   } while (numbersCalled.includes(randomNumber));

   numbersCalled.push(randomNumber);

   document.getElementById('number-display').textContent = 'NUMERO: ' + randomNumber;

   var currentPlayerCard = playerCards[currentPlayerIndex];
   var numberFound = false;

   for (var row = 0; row < cardSize; row++) {
      for (var col = 0; col < cardSize; col++) {
         if (currentPlayerCard[row][col] === randomNumber) {
            currentPlayerCard[row][col] = -1; 
            numberFound = true;
            break;
         }
      }
      if (numberFound) {
         break;
      }
   }

   if (numberFound) {
      document.getElementById('result-display').textContent = 'EL NUMERO ESTA EN TABLERO!';
   } else {
      document.getElementById('result-display').textContent = 'EL NUMERO NO ESTA EN EL TABLERO!';
   }

   displayCard(currentPlayerCard, true);
   currentPlayerIndex = (currentPlayerIndex + 1) % playerNames.length;
   turnCounter++;
   updateCurrentPlayerDisplay();
   if (turnCounter === 25*playerNames.length) {
      checkWinCondition();
   }
}

function checkWinCondition() {
   var winners = [];

   for (var i = 0; i < playerNames.length; i++) {
      var currentPlayerCard = playerCards[i];
      var isCardFull = currentPlayerCard.every(row => row.every(number => number === -1));

      if (isCardFull) {
         winners.push(playerNames[i]);
      }
   }

   if (winners.length > 0) {
      alert('¡Felicidades! Los siguientes jugadores han ganado: ' + winners.join(', ') + ' su puntaje es de ' + card.length+5);
   } else {
      alert('Ningún jugador ha completado su cartón. ¡Sigue jugando! . Los puntajes son de 0pts');
   }
   resetGame();
}
function resetGame() {
   playerNames = [];
   cardSize = 4;
   currentPlayerIndex = 0;
   turnCounter = 0;
   numbersCalled = [];
   playerCards = [];

   document.getElementById('player-names').value = '';
   document.getElementById('card-size').value = '4x4';
   document.getElementById('card-container').innerHTML = '';
   document.getElementById('player-list').innerHTML = '';
   document.getElementById('current-player').textContent = '';
   document.getElementById('number-display').textContent = '';
   document.getElementById('result-display').textContent = '';
   
   document.getElementById('main-menu').style.display = 'block';
   document.getElementById('game-board').style.display = 'none';
}


