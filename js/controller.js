angular
	.module("myApp")
	.controller("t3Controller", t3Controller);

	function t3Controller(){
	
	this.t3box = [
	[1,2,3],
	[4,5,6],
	[7,8,9]
	];
	
	//get position on clicked button
	this.boxItem=boxItem;
	function boxItem(row,col){
		
		console.log(row + "," + col);
		console.log(this.t3box[row][col]);
	}


}//end of t3Controller