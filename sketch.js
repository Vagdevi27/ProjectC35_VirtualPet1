//Create variables here
var dog,dogImage, happydogImage, database, foodS, foodStock;
function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database()
  
  dog = createSprite(250,250)
  dog.addImage(dogImage)
  dog.scale = 0.3

  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(rgb(46,139,87))
  drawSprites();

  textSize(20)
  fill ("yellow")
  text("PRESS UP ARROW key to Feed Drago Milk" , 60,50)

  text("Foods Remaining : " + foodS , 120, 80);
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStocks(foodS);
    dog.addImage(happydogImage);
    foodS = foodS - 1;
  }

}
function readStock(data){
   foodS = data.val();

}
function writeStocks(x){

  database.ref("/").update({
    "food" : x
  })
}


