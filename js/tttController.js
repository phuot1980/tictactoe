angular
	.module('tttApp')
	.controller('tttController', tttControllerFunc);

	//tttControllerFunc.$inject = ['GameBoard'];
	tttControllerFunc.$inject = ['$firebase'];
	function tttControllerFunc($firebase)
	{
		var self = this

		// set inital firebase variables
		self.gameSession = getGameSession();
		self.gameSession.title = "tic tac toe";
		self.gameSession.currentPlayer = 1;
		// self.gameSession.gameBoard = new Array(9);
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
				//i can only put an x if the box is not occupied. 
				if (self.gameSession.gameBoard[i] == "")
				{
					self.gameSession.gameBoard[i] = 'x';
					self.gameSession.currentPlayer = 2 ;
					console.log(self.gameSession.gameBoard);
				}
				
			}
			//this player 2
			else
			{
				//i can only put an o if the box is not occupied. 
				if (self.gameSession.gameBoard[i] == "")
				{
					self.gameSession.gameBoard[i] = 'o';
					self.gameSession.currentPlayer = 1;
					console.log(self.gameSession.gameBoard);
				}
			}
			// checkTie runs when there is no winner. 
			// if there is a winner then there can be no tie. 
			if (checkWin() == false)
			{

				if (checkTie() == true)
				{
					console.log('tie');
				}
			}
			else
			{
				//display a winner
				console.log('winner');
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
			console.log('game board clear')
		}

		function getGameSession()
		{
			var ref = new Firebase("https://tictactoefb.firebaseio.com/gameSession");
			var gameSession = $firebase(ref).$asObject();
			return gameSession;
		}

		function checkRow(x,y,z)
		{
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
	}
