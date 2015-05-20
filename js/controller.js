angular
	.module('myApp')
	.controller('t3Controller',t3Controller);

//inject $scope and $firebaseObject for use in function
t3Controller.$inject = ['$scope','$firebaseObject'];


function t3Controller($scope, $firebaseObject){

		//references my firebase database for use 
		var rootRef = new Firebase("https://t3firebase.firebaseio.com/");

		//sync with top level of firebase database and automatically save changes by bindTo
		//with through use of $scope. Top object name is "game"
		$firebaseObject(rootRef).$bindTo($scope, "game");
    	
		//set icons so no bad image loading would occur with blank 
		$scope.p1pic=0;
		$scope.p2pic=1;
		$scope.clearpic=2;
		//create a local variable flag for instruction div to appear
		var htpFlag=false;
		
		//new game function that handles turn switching and checking the winner. 
		// Does nothing if there is a winner
		$scope.changeBox = function(square){
			if ($scope.game.winner) return;
			if($scope.game.playerTurn != player) return;
			if($scope.game.t3boxes[square]==0)
			{	
				//html display message is blank			
				$scope.takenMsg = "";
				$scope.game.t3boxes[square] = $scope.game.playerTurn;
				//switch to other player
				$scope.game.playerTurn *= -1;
				$scope.checkWinner();
			} 
			else
			{
				//html appears when someone tries to click a taken space
				$scope.takenMsg = "Space Already Taken";
			}
		};//end of changeBox function

		//get the picture value for the box. 
		//Will go out of function if database has not loaded
		$scope.getImg = function(square) {
			if (!$scope.game) { return; }
			if($scope.game.t3boxes[square]==1)
				return $scope.game.pics[$scope.p1pic];
			else if($scope.game.t3boxes[square]==-1)
				return $scope.game.pics[$scope.p2pic];
			else
				return $scope.game.pics[$scope.clearpic];
		};//end of getImg

		//get the player icon. 
		//Will go out of function if database has not loaded
		$scope.getIcon = function(square){
			if (!$scope.game) { return; }
			return $scope.game.pics[square];
		};//end of getIcon

		//rstarts a new game. Set board values and game winner to 0. 
		//Chooses random starting player
		$scope.clearAll = function(){
			for(var i=0;i<$scope.game.t3boxes.length;i++) $scope.game.t3boxes[i] =0;
			$scope.game.winner = 0;
			var randomNumber = Math.random();
			$scope.game.playerTurn = ( randomNumber <= 0.5 ) ? 1 : -1;
		};//end of clearAll

		//clear wins 
		$scope.clearWin = function(){
			$scope.game.player1Win = 0;
			$scope.game.player2Win = 0;
		};//end of clearWin

		//check if there is winner, brute force method for all available wins
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
				$scope.game.winner = 1;
				$scope.game.player1Win += 1;
			}
			else if(sumd1 == -3 || sumd2 == -3 || sumh1 == -3 || sumh2 == -3 || sumh3 == -3 || sumv1 == -3 || sumv2 == -3 || sumv3 == -3)

			{
				$scope.game.winner = -1;
				$scope.game.player2Win += 1;
			}	
		};//end of checkWinner

		//displays and disappears the instruction div
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
		};//end of showDiv
		//check if all spaces are empty. Will go out of function if database has not loaded
		$scope.isEmpty = function(){
			if (!$scope.game) return;
			for(var k=0;k<$scope.game.t3boxes.length;k++) {
				if ($scope.game.t3boxes[k] === 0) {
					return true;
				}
			}
			return false;
		}//end of isEmpty

		//testing for single computer lockout
		var player;
		$scope.connect = function(){
    		if ($scope.game.p1Connect === false) {
      			$scope.game.p1Connect = true;     
      			player = 1;
    		} 
    		else if ($scope.game.p2Connect === false) {
      			$scope.game.p2Connect=true;
      			player = -1;
    		}
    	}

    	$scope.disconnect = function(){
    		$scope.game.p1Connect = false; 
    		$scope.game.p2Connect = false; 
    		player=undefined;
    	}



}//end of t3Controller