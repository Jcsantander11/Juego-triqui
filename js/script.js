document.addEventListener('DOMContentLoaded', function () {
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const startButton = document.getElementById('start-btn');
    const gameContainer = document.getElementById('game-container');
    const board = document.getElementById('board');
    const turnDisplay = document.getElementById('turn');
    const resultPopup = document.getElementById('result-popup');
    const resultText = document.getElementById('result-text');
    const continueButton = document.getElementById('continue-btn');
    const clearButton = document.getElementById('clear-btn');
    const restartButton = document.getElementById('restart-btn');
    const cells = document.querySelectorAll('.cell');
  
    let currentPlayer = 'X';
  
    startButton.addEventListener('click', function iniciar_juego() {
      if (player1Input.value.trim() === '' || player2Input.value.trim() === '') {
        alert('Por favor ingresa los nombres de los jugadores.');
        return;
      }
  
      gameContainer.style.display = 'block';
      startButton.style.display = 'none';
      player1Input.style.display = 'none';
      player2Input.style.display = 'none';
      document.querySelectorAll('label').forEach(label => label.style.display = 'none');
  
      turnDisplay.textContent = `Turno de ${player1Input.value}`;
  
      cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', cellClickHandler);
      });
    });
  
    clearButton.addEventListener('click', function () {
      cells.forEach(cell => {
        cell.textContent = '';
      });
    });
  
    restartButton.addEventListener('click', function () {
      gameContainer.style.display = 'none';
      startButton.style.display = 'inline';
      player1Input.style.display = 'inline';
      player2Input.style.display = 'inline';
      document.querySelectorAll('label').forEach(label => label.style.display = 'block');
  
      player1Input.value = '';
      player2Input.value = '';
    });
  
    function cellClickHandler() {
      if (this.textContent === '') {
        this.textContent = currentPlayer;
        this.style.color = currentPlayer === 'X' ? 'rgb(43, 86, 150)' : 'rgb(228, 59, 59)';
        if (checkWinner()) {
          showResultPopup(`${currentPlayer === 'X' ? player1Input.value : player2Input.value} ha ganado!`);
        } else if (checkDraw()) {
          showResultPopup('¡Empate!');
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          turnDisplay.textContent = `Turno de ${currentPlayer === 'X' ? player1Input.value : player2Input.value}`;
        }
      } else {
        alert('Esta casilla ya está ocupada.');
      }
    }
    
  
    function checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
          return true;
        }
      }
  
      return false;
    }
  
    function checkDraw() {
      return Array.from(cells).every(cell => cell.textContent !== '');
    }
  
    function showResultPopup(message) {
      resultText.textContent = message;
      resultPopup.style.display = 'block';
      continueButton.addEventListener('click', continueGame);
    }
  
    function continueGame() {
      resultPopup.style.display = 'none';
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      turnDisplay.textContent = `Turno de ${currentPlayer === 'X' ? player1Input.value : player2Input.value}`;
      cells.forEach(cell => {
        cell.textContent = '';
      });
    }
  });
  