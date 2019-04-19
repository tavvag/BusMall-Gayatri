'use strict';
Product.all = [];
var numDisplayTimes = 0;
var initialrandonArray=[];
var imgContainer = document.getElementById('image_placeholder');
var productImageNames = [];
var productImageShown=[];
var productImageClicked=[];

//Product Constructor
function Product(name,filepath){
  this.productname =name;
  this.filepath=filepath;
  this.numberOfClicks = 0;
  this.imageDisplayCounter=0;
  Product.all.push(this);
}
//Generate a random array with size 3
function generateRandomArraywithSize3(minimum,maximum){
  var objectIndexArray=[];
  console.log('initial array :'+initialrandonArray);
  while(objectIndexArray.length<3){
    var randomNumber = generateRandomNumber(minimum,maximum);

    if(objectIndexArray.includes(randomNumber) || initialrandonArray.includes(randomNumber)){
      //if randon number exists from the previoud display or it current display skip the number
    }else {
      objectIndexArray.push(randomNumber);
    }
    console.log('current array :'+objectIndexArray);
  }
  return objectIndexArray;
}

//Generate Randon number with in given min and max
function generateRandomNumber(minimum,maximum){
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

//Display randon images on page
function displayImages(){
  var arrayIndex = generateRandomArraywithSize3(0,Product.all.length-1);
  initialrandonArray=arrayIndex;
  var img1 = document.getElementById('first_image');
  img1.src = Product.all[arrayIndex[0]].filepath;
  Product.all[arrayIndex[0]].imageDisplayCounter++;
  var img2 = document.getElementById('second_image');
  img2.src = Product.all[arrayIndex[1]].filepath;
  Product.all[arrayIndex[1]].imageDisplayCounter++;
  var img3 = document.getElementById('third_image');
  img3.src = Product.all[arrayIndex[2]].filepath;
  Product.all[arrayIndex[2]].imageDisplayCounter++;
  //console.log('array' + arrayIndex);


}

//on click event
function imageClick(event) {
  displayImages();
  numDisplayTimes++;
  countNumberOfImageClicks(event.target.src);
  if(numDisplayTimes > 24) {
    imgContainer.removeEventListener('click', imageClick);
    storeData();
  }
}

function countNumberOfImageClicks(clickedImageSrc){
  for(var i=0;i<Product.all.length;i++){
    if(clickedImageSrc.match(Product.all[i].productname)){
      // console.log('inside click counter :'+Product.all[i].productname);
      Product.all[i].numberOfClicks++;
    }
  }

}

function storeData(){
  for(var s = 0; s < Product.all.length; s++) {
    productImageNames[s]= Product.all[s].productname;
    productImageShown[s]= Product.all[s].imageDisplayCounter;
    productImageClicked[s]= Product.all[s].numberOfClicks;
  }
  localStorage.setItem('names', JSON.stringify(productImageNames));
  localStorage.setItem('image-shown', JSON.stringify(productImageShown));
  localStorage.setItem('image-clicked', JSON.stringify(productImageClicked));
  console.log('localstorage : '+ JSON.parse(localStorage.getItem('names')));
  console.log('localstorage : '+ JSON.parse(localStorage.getItem('image-shown')));
  console.log('localstorage : '+ JSON.parse(localStorage.getItem('image-clicked')));
}


//create an instance of Products
new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');
console.log('object length' + Product.all.length);

//Add click event on image
displayImages();
imgContainer.addEventListener('click', imageClick);
