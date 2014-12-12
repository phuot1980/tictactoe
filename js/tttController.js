angular
	.module('tttApp')
	.controller('tttController', tttControllerFunc);

	tttControllerFunc.$inject = ['$firebase'];
	function tttControllerFunc($firebase)
	{
		var self = this

		self.title = "tic tac toe";
		self.gameBoard = new Array(9);
		self.setTile = setTile;
		self.getTile = getTile;
		self.currentPlayer = 1;
		self.newGame = newGame;

		self.gameSession = getGameSession();

		// self.gameSession.name = "ponlok";
		// self.gameSession.array = [];
		// self.gameSession.gameBoard = ["","","","","","","","",""]
		// self.gameSession.$save();

		//i = the index in the array. letter 'x' is pushed in from the index.html
		function setTile(letter, i)
		{
			if (self.currentPlayer == 1) 
			{
				self.gameSession.gameBoard[i] = 'x';
				self.currentPlayer = 2 ;
				console.log(self.gameSession.gameBoard);
			}
			else
			{
				self.gameSession.gameBoard[i] = 'o';
				self.currentPlayer = 1;
				console.log(self.gameSession.gameBoard);
			}
			self.gameSession.$save();
		}

		function getTile(i)
		{
			return self.gameBoard[i];
		}

		function newGame()
		{
			self.gameSession.gameBoard = ["","","","","","","","",""]
			self.gameSession.$save();
			console.log("game board clear")
		}

		function getGameSession()
		{
			var ref = new Firebase("https://tictactoefb.firebaseio.com/gameSession");
			var gameSession = $firebase(ref).$asObject();
			return gameSession;
		}
	}
