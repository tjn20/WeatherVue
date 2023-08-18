/**
 * VARIABLES
 */
let search=document.querySelector(".search");
let clear=document.querySelector(".clear");





/**
 * METHODS
 */
search.onclick=function(){
    document.querySelector(".weather-search").classList.add("active");
    search.className="fa-solid fa-location-dot";
    document.getElementById("clickDown").style.display="none";
    document.getElementById("weather-content").classList.add("opened");
document.getElementById("weather-class").classList.add("active");
}


clear.onclick=function(){
    document.querySelector(".weather-search").classList.remove("active");
    search.className="search fa fa-search";
    document.getElementById("clickDown").style.display="flex";
    document.getElementById("weather-content").classList.remove("opened");
    document.getElementById("weather-class").classList.remove("active");
    document.querySelector(".weather-check").style.display="none";

}


let cityAdded="";
let tempAdded="";
let timeAdded="";
let feelsLikeAdded="";
let descAdded="";

document.getElementById("search").addEventListener("keydown",(event)=>{
if(event.keyCode === 13){
    const APIKey='395f84125ffe969d6e542e18468ff8ad';
    const city=document.querySelector("input").value;
    if(city==='')
    return;
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(res=>res.json()).then(data=>{


if(data.cod=='404'){
  document.getElementById('not-found').style.display="flex";
   document.getElementById('not-found').style.animationName="move404";
  return;
}
document.getElementById('not-found').style.animationName="move404Back";


document.getElementById('not-found').addEventListener("animationend", function(event) {
  if (event.animationName === "move404Back") {
    document.getElementById('not-found').style.display="none";

  }
});

 document.querySelector(".weather-check").style.display="flex"; 
 
const cityName=document.querySelector(".city-box h3");
const time=document.querySelector(".city span");
const image=document.querySelector(".weather-box img");
const temprature=document.querySelector(".weather-box .temprature");
const description=document.querySelector(".weather-box .description");
const humidity=document.querySelector(".weather-details .humidity span");
const wind=document.querySelector(".weather-details .wind span");
const feelsLike=document.querySelector(".weather-details .feels span");

switch(data.weather[0].main){
    case 'Clear': image.src="images/clear.png";break;
    case 'Rain': image.src="images/rain.png";break;
    case 'Snow': image.src="images/snow.png";break;
    case 'Clouds': image.src="images/cloud.png";break;
    case 'Haze': image.src="images/mist.png";break;
default: 
image.src='';
}

cityAdded=city;
tempAdded=parseInt(data.main.temp);
feelsLikeAdded=parseInt(data.main.feels_like);
descAdded=data.weather[0].description;


temprature.innerHTML=`${parseInt(data.main.temp)} <span>°C</span>`;
description.innerHTML=`${data.weather[0].description}`;
humidity.innerHTML=`${data.main.humidity}%`;
wind.innerHTML=`${parseInt(data.wind.speed)}Km/s`;
feelsLike.innerHTML=`${parseInt(data.main.feels_like)} <span>°C</span>`;
cityName.textContent=city+","+data.sys.country;

fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=D4JS61HI9DZ8&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`).then(res=>res.json()).then(data=>{
    data.formatted;
    let as="";
    as+= data.formatted.slice(0, 11);
    time.textContent=as;
    timeAdded=as;

});


const forcastCont=document.getElementById("forcasts");
console.log(localStorage);

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=51550be2c1374103fc9ee83cce877e74`).then(res=>res.json()).then(data=>{
console.log(data); 
if(forcastCont.hasChildNodes())
forcastCont.textContent="";
let currentDate="";
data.list.forEach(element=>{
    if(element!=data.list[0]){
        const forecastDiv=document.createElement("div");
        forecastDiv.className="forcast-div";
        const forecastDay=document.createElement("h3");
    const forecastTemp=document.createElement("p");
    let dateStringArray=(""+element.dt_txt).split(" ");
    if(currentDate!=dateStringArray[0]){
  currentDate=dateStringArray[0];
        const date=new Date(currentDate);
    const forecastdayName =date.toLocaleDateString('en-US',{weekday:'long'});
    forecastDay.textContent=forecastdayName;
    forecastTemp.textContent=Math.floor(element.main.temp_min-273.15)+"° C" +" | "+Math.floor(element.main.temp_max-273.15)+"° C";
    const forecastImg=document.createElement("img");
    forecastImg.src=`https://openweathermap.org/img/w/${element.weather[0].icon}.png`;
    
    forecastDiv.appendChild(forecastDay);
    forecastDiv.appendChild(forecastImg);
    forecastDiv.appendChild(forecastTemp);
    forcastCont.appendChild(forecastDiv);
    }
  }
    });
    
});
 

});

}
});


const forestCont=document.getElementById("movableDiv");

forestCont.addEventListener("click",()=>{
    document.querySelector(".forcast-container").classList.toggle("active");
   document.getElementById("arrow").className=document.getElementById("arrow").className==="bx bxs-up-arrow"?"bx bxs-up-arrow bx-rotate-180":"bx bxs-up-arrow"; 
   document.getElementById("text").textContent=document.getElementById("text").textContent==="Open Forecast Weather"?"Close Forecast Weather":"Open Forecast Weather"; 
   document.getElementById("arrow").className==="bx bxs-up-arrow"?forestCont.style.backgroundColor="#5ea389":forestCont.style.backgroundColor="#7A7978"; 


});



const addBtn=document.getElementById("add");
addBtn.addEventListener("click",()=>{
    if(!check(cityAdded)){
    const weatherDiv=document.createElement("div");
    weatherDiv.className="weather-div";
    const  divWeather=document.createElement('div');
 divWeather.className="div-weather";
 const divCity=document.createElement("div");
 divCity.className="div-city";
 const cityNameh3=document.createElement("h3");
 cityNameh3.textContent=cityAdded;
 const cityTimeh6=document.createElement("h6");
 cityTimeh6.textContent=timeAdded;
 const cityTemph1=document.createElement("h1");
 cityTemph1.className="temp-deg";
 cityTemph1.textContent=tempAdded+"°";
 const divDetails=document.createElement("div");
 divDetails.className="div-details";
 const cityDesc=document.createElement("h5");
 cityDesc.className="desc";
 cityDesc.textContent=descAdded;
 const divPressure=document.createElement("div");
 divPressure.className="div-pressure";
 const cityPressure=document.createElement("h5");
 cityPressure.textContent="feels like";
 const cityPressure1=document.createElement("h5");
 cityPressure1.className="feelsLike";
 cityPressure1.textContent=feelsLikeAdded+"°";


deleteDiv=document.createElement("div");
deleteDiv.className="delete";
deleteIcon=document.createElement('i');
deleteIcon.className="bx bxs-trash-alt deleting";
deleteDiv.appendChild(deleteIcon);
 divPressure.appendChild(cityPressure);
 divPressure.appendChild(cityPressure1);
 
 divDetails.appendChild(cityDesc);
 divDetails.appendChild(divPressure);
 divCity.appendChild(cityNameh3);
 divCity.appendChild(cityTimeh6);
 divWeather.appendChild(divCity);
 divWeather.appendChild(cityTemph1);
 
 weatherDiv.appendChild(divWeather);
 weatherDiv.appendChild(divDetails);

 
 const transDiv=document.createElement("div");
 transDiv.className="trans";
 weatherDiv.appendChild(transDiv);
 weatherDiv.appendChild(deleteDiv);

 const weatherAdded=document.getElementById('weather-added');

 weatherAdded.appendChild(weatherDiv);

 document.querySelector(".weather-check").style.display="none";


/* showweahters();
 */

updateStorage(weatherAdded);

showweahters(weatherAdded);


    }
 

});
const weathers=document.getElementById('weather-added');

 window.addEventListener("load",()=>{
     weathers.innerHTML=localStorage.getItem("weathers");
 }); 

function updateStorage(weatherAdded){
    localStorage.setItem("weathers",weatherAdded.innerHTML);
    console.log(localStorage);
    }


    function showweahters(weatherAdded){
        weatherAdded.innerHTML=localStorage.getItem("weathers");
    }


document.getElementById("clickDown").addEventListener("click",()=>{
    document.getElementById("weather-content").classList.toggle("opened");
    document.getElementById("clickDown").className=document.getElementById("clickDown").className==="bx bxs-hand-up bx-rotate-180"?"bx bxs-hand-up":"bx bxs-hand-up bx-rotate-180"; 
    document.getElementById("weather-class").classList.toggle("active");

});



const parentElement = document.getElementById('weather-added');
const childElements = parentElement.getElementsByClassName('weather-div');
function check(content){
    let exist=false;
    for(let i=0;i<childElements.length;i++){
            if(childElements[i].querySelector('h3').textContent===content){
            exist=true;
            break;
            }
    }
    
return exist;
}





     const apiKey = '51550be2c1374103fc9ee83cce877e74';

async function fetchWeather(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching weather data for ${location}:`, error);
    return null;
  }
}

// Function to update the weather forecast display for a specific child element
function updateForecast(childElement, weatherData) {

    const descriptionElement = childElement.querySelector('.div-details h5');
    const feelsLikeElement = childElement.querySelector('.div-pressure .feelsLike');
    const tempElement = childElement.querySelector('h1');
    const newDate=childElement.querySelector('h6');
  if (weatherData) {
    descriptionElement.textContent=weatherData.weather[0].description;
    tempElement.textContent=parseInt(weatherData.main.temp)+"°";
    feelsLikeElement.textContent=parseInt(weatherData.main.feels_like)+"°";
    fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=D4JS61HI9DZ8&format=json&by=position&lat=${weatherData.coord.lat}&lng=${weatherData.coord.lon}`).then(res=>res.json()).then(data=>{
      data.formatted;
      let as="";
      as+= data.formatted.slice(0, 11);
      newDate.textContent=as;
    
    });
  
  }
  updateStorage(document.getElementById('weather-added'));

  showweahters(document.getElementById('weather-added'));
  
  
}

// Function to refresh the weather forecast for all child elements
async function refreshForecast() {
  for (let i = 0; i < childElements.length; i++) {
    const childElement = childElements[i];
    const locationElement = childElement.querySelector('h3');
    const location = locationElement.textContent;


    const weatherData = await fetchWeather(location);
    updateForecast(childElement, weatherData);
  }
}

// Initial forecast update
 refreshForecast(); 

// Set interval to refresh the forecast periodically (e.g., every 30 mins) // main
 setInterval(refreshForecast,3600000);


 document.querySelector(".weather-added").addEventListener('click', function(event) {
    // Check if the event target has the desired class name

    if (event.target.className==='weather-div' || event.target.className==='trans') {
      if(event.target.className==='weather-div'){
        document.getElementById("search").value=event.target.querySelector('h3').textContent;
      }
      else{
        document.getElementById("search").value=event.target.parentElement.querySelector('h3').textContent;

      }
      const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 13,
        code: "Enter",
        which: 13,
        bubbles: true
      });  
// Dispatch the event to the input field
document.getElementById("search").dispatchEvent(enterEvent);
document.querySelector(".weather-search").classList.add("active");
    search.className="fa-solid fa-location-dot";
    document.getElementById("clickDown").style.display="none";
    document.getElementById("weather-content").classList.add("opened");
document.getElementById("weather-class").classList.add("active");


    }

    else if(event.target.className==='bx bxs-trash-alt deleting'){
     const temp=event.target.parentElement.parentElement.parentElement;
     event.target.parentElement.parentElement.remove();
      updateStorage(temp);
      showweahters(temp);
    }
  });

 
  document.getElementById('notFound').addEventListener('click',()=>{
    document.getElementById('not-found').style.animationName="move404Back";

      document.getElementById('not-found').addEventListener("animationend", function(event) {
        if (event.animationName === "move404Back") {
          document.getElementById('not-found').style.display="none";
      document.getElementById('weather-added').style.display="flex";
        }
      });
  });

  document.getElementById('weather').addEventListener('click',()=>{
    document.querySelector('.weather-check').style.display="none";
    document.getElementById('weather-added').style.display="flex";
  });


