$(document).ready(function(){

	function Player(Name, Symbol) {
		this.Name = Name;
		this.Symbol = Symbol;
	}

	function Cell(Player, Element) {
		this.Player = Player;
		this.Element = Element;
	}

	function Board() {
		this.Cells = [];
		this.AddPin = function(index, player) {
			this.Cells[index].Element.html(player.Symbol);
			this.Cells[index].Player = player;
		}
	}

	/* <MAIN> */

	function Game(){			
		
		this.CurrentPlayer = function() {
			return this.Players[this.CurrentPlayerIndex];
		};
		
		this.ChangeTurn = function() {
			if ( Game.CurrentPlayerIndex == Game.Players.length -1 ) {				
				Game.CurrentPlayerIndex = 0;
			} else {				
				Game.CurrentPlayerIndex++;
			}
		}

		this.Move = function(index) {
			if ( this.Board.Cells[index].Player == null ) {
				this.Board.AddPin(index, this.CurrentPlayer());
				this.ChangeTurn();
			}
		}
		
		this.Start = function() {

			// Create players and add them to the game
			this.Players = [];
			var Player1 = new Player("Jonatan", "X");
			var Player2 = new Player("Enemy", "0");
			this.Players.push(Player1);
			this.Players.push(Player2);

			// Create the board
			this.Board = new Board([]);
			this.Board.Cells = [];
			for (var i=0; i < 9; i++) {
				this.Board.Cells.push(new Cell(null, $(".cell:eq(" + i + ")")));
			}

			// Set the initial player and append click functions
			this.CurrentPlayerIndex = 0;

			$(".cell").click(function(){
				Game.Move($(this).index());
			});			

		};
	}

	/* </MAIN> */

	var Game = new Game();
	Game.Start();

});