$(document).ready(tictactoe)


function tictactoe()
{
	var gameBoard = new Array(9);
	var currentPlayer = 1;

	//for-in loop to name the #box and add anEventListener to each div
	for (var i = 0; i<9; i++)
	{
		$('#box' + i).click(markBox);
		console.log("#box"+i);
	}

	function markBox()
	{
		//gets div information and returns number
		var playerMove = $(this).attr('id').slice(-1);

		//set a player's move in the gameBoard
		// gameBoard[playerMove] = 'x';

		if (currentPlayer == 1) 
		{
			gameBoard[playerMove] = 'x';
			currentPlayer = 2;
		}
		else 
		{
			gameBoard[playerMove] = 'O';
			currentPlayer = 1;
		}



		console.log(gameBoard)
	}

	return;
};



