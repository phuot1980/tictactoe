$(document).ready(tictactoe)


function tictactoe()
{
	var gameBoard = new Array(9);
	
	//for-in loop to name the #box and add anEventListener to each div
	for (var i = 0; i<9; i++)
	{
		$('#box' + i).click(markBox);
		// console.log("#box"+i);
	}


	function markBox()
	{
		//gets div information
		var playerMove = $(this).attr('id').slice(-1);

		//set a player's move in the gameBoard
		gameBoard[playerMove] = 'x';

		console.log(gameBoard)
	}


	function switchPlayer()
	{

	}






	return;
};



