'use strict';
Product.all = [];
var numDisplayTimes = 0;
var initialrandonArray=[];
var productImageNames = [];
var productImageShown=[];
var productImageClicked=[];
var imgContainer = document.getElementById('image_placeholder');
var canvas = document.getElementById('chart');
var ctx = canvas.getContext('2d');
var button = document.getElementById('button');
var form = document.getElementById('chart_form');
var chartbackgroundColor=['#000000', '#230f5b', '#5b0e27', '#5b0e27','#42d1f4','#45e860','#e89945','#e86245','#c145e8','#8845e8','#45bfe8','#45e8c4','#7be845','#e8e245','#e84f45','#6d45e8','#7c2e2e','#2e637c','#762e7c'];

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
    document.getElementById('button').style.display = 'block';
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

function buttonClick(event){
  chart.style.display = 'block';
  displayChart();
}
//Create chart
function displayChart(){
var chart = new Chart(ctx, {
  type: 'bar',
  title:{
    text: "User Favourite Things "  
    },
  data:

  {
      labels: JSON.parse(localStorage.getItem("names")),
      datasets: [{
          label: 'User Clicks',
          data: JSON.parse(localStorage.getItem("image-clicked")),
          backgroundColor: chartbackgroundColor
      },
      {
        label: 'Image Displayed',
        data: JSON.parse(localStorage.getItem("image-shown")),
        backgroundColor: chartbackgroundColor
    }]
  },
  options: {}
});
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
imgContainer.addEventListener('click', imageClick);
button.addEventListener('click', buttonClick);
