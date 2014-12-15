angular
	.module('tttApp')
	.controller('tttController', tttControllerFunc);

	//tttControllerFunc.$inject = ['GameBoard'];
	tttControllerFunc.$inject = ['$firebase'];
	function tttControllerFunc($firebase)
	{
		var self = this;
		var currentMarker; // varible used to prevent a player from making both 'x' and 'o'
		// set inital firebase variables
		self.gameSession = getGameSession(); // this is my firebase connection
		self.gameSession.message = "Player's One Turn!";
		self.gameSession.title = "tic tac toe";
		self.gameSession.currentPlayer = 1;
		self.gameSession.gameBoard = ["","","","","","","","",""];
		//declare functions
		self.setTile = setTile;
		self.getTile = getTile;
		self.newGame = newGame;
		//push variables to firebase
		self.gameSession.$save();

		//i = the index in the gameBoard array. 
		function setTile(i)
		{
			//this is player 1
			if (self.gameSession.currentPlayer == 1) 
			{
				// can only put an 'x' if the box is not occupied and player symbol is not 'o' 
				if (self.gameSession.gameBoard[i] == "" && currentMarker != 'o' )
				{
					currentMarker ='x'
					self.gameSession.gameBoard[i] = 'x';
					self.gameSession.currentPlayer = 2 ;
					self.gameSession.message = "Player's Two Turn!";
					// console.log(self.gameSession.gameBoard);
				}
			}
			//this is player 2
			else
			{
				// can only put an 'o' if the box is not occupied and player symbol is not 'o'
				if (self.gameSession.gameBoard[i] == "" && currentMarker != 'x')
				{
					currentMarker = 'o'
					self.gameSession.gameBoard[i] = 'o';
					self.gameSession.currentPlayer = 1;
					self.gameSession.message = "Player's One Turn!";
					// console.log(self.gameSession.gameBoard);
				}
			}
			// checkTie runs when there is no winner. 
			// if there is a winner then there can be no tie. 
			if (checkWin() == false)
			{
				if (checkTie() == true)
				{
					self.gameSession.message = "Cats Game!";
					//this is tie game
					// console.log('tie');
				}
			}
			else
			{
				self.gameSession.message = "You Won!";
				//display a winner
				// console.log('winner');
			}
			// saving player move into firebase. 
			self.gameSession.$save();
		}

		// get the value of a tile at index i
		function getTile(i)
		{
			return self.gameSession.gameBoard[i];
		}

		function newGame()
		{
			self.gameSession.gameBoard = ["","","","","","","","",""];
			self.gameSession.currentPlayer = 1;
			self.gameSession.$save();
			// console.log('game board clear')
		}

		function getGameSession() //firebase connection
		{
			var ref = new Firebase("https://tictactoefb.firebaseio.com/gameSession");
			var gameSession = $firebase(ref).$asObject();
			return gameSession;
		}

		function checkRow(x,y,z)
		{
			// needs to meet two condition. needs to be equal and not empty.
			if (((getTile(x) == getTile(y)) && (getTile(y) == getTile(z))) && 
				((getTile(x) != "") || (getTile(y) != "") || (getTile(z) != "")))
			{

				// console.log("winner");
				//winner found
				return true;
			}
			//no winner found
			return false;		
		}

		function checkWin()
		{
			if (
			//check horiztontal rows
			(checkRow(0,1,2)) ||
			(checkRow(3,4,5)) ||
			(checkRow(6,7,8)) ||
			//check vertical rows
			(checkRow(0,3,6)) ||
			(checkRow(1,4,7)) ||
			(checkRow(2,5,8)) ||
			//check diagonals
			(checkRow(0,4,8)) ||
			(checkRow(2,4,6)))
			{
				//winner is found
				return true;
			}
			//winner is not found 
			return false;
		}
		// checkTie checks for two condition: no winner and no more moves availble, bitch. 
		function checkTie()
		{
			for (var i = 0; i < self.gameSession.gameBoard.length; i++)
			{
				if (self.getTile(i) == "")
				{
					// console.log('not a tie')
					return false;
					//not a tie	
				}
			}
			//tie 
			// console.log('this is a tie')
			return true;
		}
	}// closing tag for tttControlerFunc
