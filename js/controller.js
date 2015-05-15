angular
	.module('myApp')
	.controller('t3Controller',t3Controller);

t3Controller.$inject = ['$scope','$firebaseObject','$firebaseArray'];


function t3Controller($scope, $firebaseObject, $firebaseArray){


		var rootRef = new Firebase("https://t3firebase.firebaseio.com/");

		//sync with top level
		$firebaseObject(rootRef).$bindTo($scope, "game");
    	
		//variables for player turn
    	var player1=1;
    	var player2=-1;
		var currentPlayer;
		var drawCount=0;
		var htpFlag=false;
		//variables for chosen images
		$scope.p1pic=0;
		$scope.p2pic=1;
		$scope.clearpic=2;
		

		
		//switch turns to allow play of game
		$scope.changeBox = function(square){

			if($scope.game.t3boxes[square]==0)
			{
				if(currentPlayer == player1)
					document.getElementById('display').innerHTML = "Player 2 Turn To Play";
				else if(currentPlayer == player2)
					document.getElementById('display').innerHTML = "Player 1 Turn To Play";
				
				$scope.game.t3boxes[square] = currentPlayer;
				$scope.getImg(square);
				currentPlayer *= -1;
				$scope.checkWinner();
				drawCount +=1;
				if(drawCount>=9)
				{

					document.getElementById('display').innerHTML = "Tie game";
					currentPlayer =0;
				}

			}
			else
				document.getElementById('display').innerHTML = "Space Already Taken";
		
		};

		//get the picture value
		$scope.getImg = function(square) {
			if($scope.game.t3boxes[square]==1)
				return $scope.game.pics[$scope.p1pic];
			else if($scope.game.t3boxes[square]==-1)
				return $scope.game.pics[$scope.p2pic];
			else
				return $scope.game.pics[$scope.clearpic];
		};//end of getImg

		//get the player icon
		$scope.getIcon = function(square){
			return $scope.game.pics[square];
		};//end of getIcon

		//reset board values to 0
		$scope.clearAll = function(){
			for(var i=0; i< $scope.game.t3boxes.length; i++)
				$scope.game.t3boxes[i] = 0;

			drawCount=0;
			
			//random player start
			var randomNumber = Math.random();
			if (randomNumber <= 0.5) {
        		document.getElementById('display').innerHTML = "Player 1 Turn To Play";
        		currentPlayer = 1;
    		} 
    		else
    		{
    			document.getElementById('display').innerHTML = "Player 2 Turn To Play";
        		currentPlayer = -1;
    		}

		};//end of clearAll

		//clear wins
		$scope.clearWin = function(){
			$scope.game.player1Win = 0;
			$scope.game.player2Win = 0;
			document.getElementById('p1win').innerHTML = $scope.game.player1Win;
			document.getElementById('p2win').innerHTML = $scope.game.player2Win;

		};//end of clearWin

		//check if there is winner
		$scope.checkWinner = function(){
			//diagonal check
			var sumd1=$scope.game.t3boxes[0]+$scope.game.t3boxes[4]+$scope.game.t3boxes[8];
			var sumd2=$scope.game.t3boxes[2]+$scope.game.t3boxes[4]+$scope.game.t3boxes[6];
			//horizontal check
			var sumh1=$scope.game.t3boxes[0]+$scope.game.t3boxes[1]+$scope.game.t3boxes[2];
			var sumh2=$scope.game.t3boxes[3]+$scope.game.t3boxes[4]+$scope.game.t3boxes[5];
			var sumh3=$scope.game.t3boxes[6]+$scope.game.t3boxes[7]+$scope.game.t3boxes[8];
			//vertical check
			var sumv1=$scope.game.t3boxes[0]+$scope.game.t3boxes[3]+$scope.game.t3boxes[6];
			var sumv2=$scope.game.t3boxes[1]+$scope.game.t3boxes[4]+$scope.game.t3boxes[7];
			var sumv3=$scope.game.t3boxes[2]+$scope.game.t3boxes[5]+$scope.game.t3boxes[8];
			if(sumd1 == 3 || sumd2 == 3 || sumh1 == 3 || sumh2 ==3 || sumh3 ==3 || sumv1 ==3 || sumv2 ==3 || sumv3 ==3)
			{
				document.getElementById('display').innerHTML = "Player 1 Wins";
				$scope.game.player1Win += 1;
				document.getElementById('p1win').innerHTML = $scope.game.player1Win;
				currentPlayer=0;
				// winFlag=true;
				for(var i=0; i< $scope.game.t3boxes.length; i++)
				$scope.game.t3boxes[i] = 1;

			}
			else if(sumd1 == -3 || sumd2 == -3 || sumh1 == -3 || sumh2 == -3 || sumh3 == -3 || sumv1 == -3 || sumv2 == -3 || sumv3 == -3)

			{
				document.getElementById('display').innerHTML = "Player 2 Wins";
				$scope.game.player2Win += 1;
				document.getElementById('p2win').innerHTML = $scope.game.player2Win;
				currentPlayer=0;
				// winFlag=true;
				for(var i=0; i< $scope.game.t3boxes.length; i++)
				$scope.game.t3boxes[i] = -1;
			}
			
		};//end of checkWinner

		$scope.showDiv=function() {
			if(htpFlag == false){
   				document.getElementById('htp').style.display = "block";
   				htpFlag=true;
   			}
   			else if(htpFlag ==true)
   			{
   				document.getElementById('htp').style.display = "none";
   				htpFlag=false;
   			}

		}


}//end of t3Controller