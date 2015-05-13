angular
	.module("myApp")
	.controller("t3Controller", t3Controller);

	
	function t3Controller($scope){
    

	//contains pics for choice to use
	$scope.pics=[
		"cat.gif",
		"color.gif",
		"cloud.gif",
		"finn.gif",
		"pbnj.gif",
		"kirby.gif",
		"bmage.gif",
		"dcat.gif",
		"cow.gif"
	];

	//array for t3space
	$scope.t3box = [
	[$scope.pics[0],$scope.pics[1],$scope.pics[2]],
	[$scope.pics[3],$scope.pics[4],$scope.pics[5]],
	[$scope.pics[6],$scope.pics[7],$scope.pics[8]]
	];
	

	$scope.playTurn=0;
	$scope.player1Wins=0;
	$scope.player2Wins=0;

	//players and clear pic
	$scope.p1=$scope.pics[0];
	$scope.p2=$scope.pics[3];
	$scope.clearPic=$scope.pics[4];

	
	//get position on clicked button(testing)
	// $scope.boxItem=
	// function(row,col){
		
	// 	console.log(row + "," + col);
	// 	console.log($scope.t3box[row][col]);
	// }

	//change current box to "XO"(testing)
	//
	
	$scope.changeBox = function(row,col){
		if($scope.playTurn==0)
		{
			if($scope.t3box[row][col]==$scope.clearPic)
			{
				$scope.t3box[row][col]=$scope.p1;
				$scope.playTurn=1;
				$scope.checkWin();
			}
			else
			{
				document.getElementById("text").innerHTML = "space filled by " + $scope.t3box[row][col];
			}
		}
		else{
			if($scope.t3box[row][col]==$scope.clearPic)
			{
				$scope.t3box[row][col]=$scope.p2;
				$scope.playTurn=0;
				$scope.checkWin()
			}
			else
			{
				document.getElementById("text").innerHTML = "space filled by " + $scope.t3box[row][col];
			}
		}
	}
	$scope.clearBox=function(){
		for(var i=0;i<3;i++)
			for(var j=0;j<3;j++)
				$scope.t3box[i][j]=$scope.clearPic;
		document.getElementById("text").innerHTML = "";

	}
	//brute force checking for win
	$scope.checkWin=function(){
		
		//check for diagonal P1			
		if($scope.t3box[0][0]== $scope.p1 && $scope.t3box[1][1] ==$scope.p1 && $scope.t3box[2][2] ==$scope.p1)
			document.getElementById("text").innerHTML = "Weiner: P1";

		else if($scope.t3box[0][2]== $scope.p1 && $scope.t3box[1][1] ==$scope.p1 && $scope.t3box[2][0] ==$scope.p1)
			document.getElementById("text").innerHTML = "Weiner: P1";

		// check for horizontal P1
		else if($scope.t3box[0][0]== $scope.p1 && $scope.t3box[0][1] ==$scope.p1 && $scope.t3box[0][2] ==$scope.p1)
			document.getElementById("text").innerHTML = "Weiner: P1";
		else if($scope.t3box[1][0]== $scope.p1 && $scope.t3box[1][1] ==$scope.p1 && $scope.t3box[1][2] ==$scope.p1)
			document.getElementById("text").innerHTML = "Weiner: P1";
		else if($scope.t3box[2][0]== $scope.p1 && $scope.t3box[2][1] ==$scope.p1 && $scope.t3box[2][2] ==$scope.p1)
			document.getElementById("text").innerHTML = "Weiner: P1";

		// check for vertical P1
		else if($scope.t3box[0][0]== $scope.p1 && $scope.t3box[1][0] ==$scope.p1 && $scope.t3box[2][0] ==$scope.p1)
			document.getElementById("text").innerHTML = "Weiner: P1";
		else if($scope.t3box[0][1]== $scope.p1 && $scope.t3box[1][1] ==$scope.p1 && $scope.t3box[2][1] ==$scope.p1)
			document.getElementById("text").innerHTML = "Weiner: P1";
		else if($scope.t3box[0][2]== $scope.p1 && $scope.t3box[1][2] ==$scope.p1 && $scope.t3box[2][2] ==$scope.p1)
			document.getElementById("text").innerHTML = "Weiner: P1";

		//check for diagonal P2
		if($scope.t3box[0][0]== $scope.p2 && $scope.t3box[1][1] ==$scope.p2 && $scope.t3box[2][2] ==$scope.p2)
			document.getElementById("text").innerHTML = "Weiner: P2";

		else if($scope.t3box[0][2]== $scope.p2 && $scope.t3box[1][1] ==$scope.p2 && $scope.t3box[2][0] ==$scope.p2)
			document.getElementById("text").innerHTML = "Weiner: P2";

		// check for horizontal P2
		else if($scope.t3box[0][0]== $scope.p2 && $scope.t3box[0][1] ==$scope.p2 && $scope.t3box[0][2] ==$scope.p2)
			document.getElementById("text").innerHTML = "Weiner: P2";
		else if($scope.t3box[1][0]== $scope.p2 && $scope.t3box[1][1] ==$scope.p2 && $scope.t3box[1][2] ==$scope.p2)
			document.getElementById("text").innerHTML = "Weiner: P2";
		else if($scope.t3box[2][0]== $scope.p2 && $scope.t3box[2][1] ==$scope.p2 && $scope.t3box[2][2] ==$scope.p2)
			document.getElementById("text").innerHTML = "Weiner: P2";

		// check for vertical P2
		else if($scope.t3box[0][0]== $scope.p2 && $scope.t3box[1][0] ==$scope.p2 && $scope.t3box[2][0] ==$scope.p2)
			document.getElementById("text").innerHTML = "Weiner: P2";
		else if($scope.t3box[0][1]== $scope.p2 && $scope.t3box[1][1] ==$scope.p2 && $scope.t3box[2][1] ==$scope.p2)
			document.getElementById("text").innerHTML = "Weiner: P2";
		else if($scope.t3box[0][2]== $scope.p2 && $scope.t3box[1][2] ==$scope.p2 && $scope.t3box[2][2] ==$scope.p2)
			document.getElementById("text").innerHTML = "Weiner: P2";
	}


}//end of t3Controller