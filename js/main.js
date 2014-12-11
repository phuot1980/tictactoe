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

	//tracking player movement 
	function markBox()
	{
		//gets div information and returns number
		var playerMove = $(this).attr('id').slice(-1);

	
		//change player from x to o
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

		checkWinCondition()

		console.log(gameBoard)
	}
	//check win condition in rows, column and diagnols
	function checkWinCondition()
	{
				// check every single row
		if (((gameBoard[0] == gameBoard[1]) && (gameBoard[1] == gameBoard[2])) && 
			((gameBoard[0] != undefined) || (gameBoard[1] != undefined) || (gameBoard[2] != undefined)))
		{
			console.log('winner');
		}
		else if (((gameBoard[3] == gameBoard[4]) && (gameBoard[4] == gameBoard[5])) && 
			((gameBoard[3] != undefined) || (gameBoard[4] != undefined) || (gameBoard[5] != undefined)))
		{
			console.log('winner');
		}
		else if (((gameBoard[6] == gameBoard[7]) && (gameBoard[7] == gameBoard[8])) && 
			((gameBoard[6] != undefined) || (gameBoard[7] != undefined) || (gameBoard[8] != undefined)))
		{
			console.log('winner');
		}
		// check every column
		else if (((gameBoard[0] == gameBoard[3]) && (gameBoard[3] == gameBoard[6])) && 
			((gameBoard[0] != undefined) || (gameBoard[3] != undefined) || (gameBoard[6] != undefined)))
		{
			console.log('winner');
		}
		else if (((gameBoard[1] == gameBoard[4]) && (gameBoard[4] == gameBoard[7])) && 
			((gameBoard[1] != undefined) || (gameBoard[4] != undefined) || (gameBoard[7] != undefined)))
		{
			console.log('winner');
		}
		else if (((gameBoard[2] == gameBoard[5]) && (gameBoard[5] == gameBoard[8])) && 
			((gameBoard[2] != undefined) || (gameBoard[5] != undefined) || (gameBoard[8] != undefined)))
		{
			console.log('winner');
		}
		//check diagnols
		else if (((gameBoard[0] == gameBoard[4]) && (gameBoard[4] == gameBoard[8])) && 
			((gameBoard[0] != undefined) || (gameBoard[4] != undefined) || (gameBoard[8] != undefined)))
		{
			console.log('winner');
		}
		else if (((gameBoard[2] == gameBoard[4]) && (gameBoard[4] == gameBoard[6])) && 
			((gameBoard[2] != undefined) || (gameBoard[4] != undefined) || (gameBoard[6] != undefined)))
		{
			console.log('winner');
		}

	}// function checkWinCOndition
	return;
};




