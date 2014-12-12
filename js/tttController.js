angular
	.module('tttApp')
	.controller('tttController', tttControllerFunc);

	//tttControllerFunc.$inject = ['GameBoard'];
	tttControllerFunc.$inject = ['$firebase'];
	function tttControllerFunc($firebase)
	{
		this.title = "tic tac toe";
		this.gameBoard = new Array(9);
		this.setTile = setTile;
		this.getTile = getTile;
		this.currentPlayer = 1;
		this.gameSession = getGameSession();

		//this.gameSession.name = "ponlok";
		//this.gameSession.currentPlayer = 1;
		//this.gameSession.$save();

		//i = the index in the array. letter 'x' is pushed in from the index.html
		function setTile(letter, i)
		{
			if (this.gameSession.currentPlayer== 1) {
				this.gameSession.gameBoard[i] = 'x';
				this.gameSession.currentPlayer = 2 ;
				console.log(this.gameSession.gameBoard)
			}
			else{
				this.gameSession.gameBoard[i] = 'o';
				this.gameSession.currentPlayer= 1;
			}
			this.gameSession.$save();
		}

		function getTile(i)
		{
			return this.gameBoard[i];
		}

		function getGameSession()
		{
			var ref = new Firebase("https://tictactoefb.firebaseio.com/gameSession");
			var gameSession = $firebase(ref).$asObject();
			return gameSession;
		}
	}
