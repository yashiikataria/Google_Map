

var select = document.getElementById("selectNumber");

select.addEventListener('onchange', () => {
  console.log('hello click')
})

var options = ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];

for (var i = 0; i < options.length; i++) {
  var opt = options[i];
  // console.log(opt)
  var el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  select.appendChild(el);
  select.id = "pets"
  select.style.border = "1px solid black"
  select.style.margin = "10px"
}



async function getdata(cont) {
  // cont=document.getElementById('pets').value;
  // console.log(cont)
  const value = await fetch(`http://localhost:3000/${cont}`);
  const data = await value.json()
  // console.log(data)
  let location = data.country
  return location;
  //console.log(data.location)
}





function changeContinent() {
  let continent = document.getElementById('pets').value;
  // console.log(document.getElementById('selectNumber2'));
  document.getElementById('selectNumber2').innerHTML = null;
  getCountries(continent);
  // var select = document.getElementById("selectNumber2");
  // const cont=document.getElementById('pets').value;

  // var options= await getdata(cont);

  // console.log("heloo there")
  // for(var i = 0; i < options.length; i++) {
  //   var opt=options[i];
  //   var el = document.createElement("option");
  //   el.textContent = opt;
  //   el.value = opt;

  //   select.appendChild(el);

  //   select.id="pets1"
  //   select.style.border="1px solid black"
  //   select.style.margin="10px"
  //  }
  //  options=[]
}

async function getCountries(continent) {
  var options = await getdata(continent);
  let countrySelect = document.getElementById('selectNumber2');

  options.forEach(element => {
    let option = document.createElement("option");
    option.text = element;
    option.value = element;
    countrySelect.appendChild(option);
    countrySelect.style.border = "1px solid black"
    countrySelect.style.margin = "10px"

  })
}




// document.getElementById('selectNumber2').addEventListener(('click'),async(event)=>{
// var select = document.getElementById("selectNumber2");
// const cont=document.getElementById('pets').value;

// var options= await getdata(cont);

// // changecontinent(options,select);

// })







function addmarker(el, alert) {

  if (alert === 'green') {
    // console.log(alert)
    el.className = 'marker green'
    // console.log("green")
  }
  else if (alert === 'yellow') {
    el.className = 'marker yellow'
    // console.log("yellow")

  }
  else if (alert === 'red') {
    // console.log(alert)
    el.className = "marker red"
    //  console.log("red")

  }
  else if (alert === 'orange') {
    // console.log(alert)
    el.className = "marker orange"
    //  console.log("red")

  }

}

async function getCoordinates(area) {
  const conversionAPI = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${area}.json?access_token=pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA`)

  const obj = await conversionAPI.json()
  let coordinates = obj.features[0].center
  return coordinates;
}


document.getElementById('submit').addEventListener(('click'), async (event) => {

  // console.log('hello')
  const cont = document.getElementById('pets').value;
  // console.log(cont)
  let area = await getCoordinates(cont)
  // console.log(area)

  const value = await fetch(`http://localhost:3000/${cont}`);
  const data = await value.json()

  // console.log(data)
  let location = data.location;

  // console.log(data.alert)
  // const obj=Object.keys(data)
  mapboxgl.accessToken = 'pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: area,
    zoom: 3
  });
  let i = 0;
  location.map(async (items) => {
    // console.log('hello',items)
    // console.log(items)
    const conversionAPI = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${items},%20France.json?access_token=pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA`)
    const obj = await conversionAPI.json()
    let coordinates = obj.features[0].center

    const el = document.createElement('div');

    //  console.log(data.alert[i])
    addmarker(el, data.alert[i])
    //  let val=tsunami(data.tsunami[i])
    //  console.log(data.alert)

    // el.className = 'marker';
    new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `<h3>${data['title'][i]}</h3>`
        )
    ).addTo(map);
    i++;

  })
  location.map(async (items) => {

    const conversionAPI = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${items},%20France.json?access_token=pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA`)
    const obj = await conversionAPI.json()
    // console.log(obj)

    let coordinates = obj.features[0].center
    const el = document.createElement('div');


    //  el.className = 'marker';
    tsunamimarker(el, data.tsunami[i])
    // console.log(data.tsunami[i])


    let val = tsunami(data.tsunami[i])
    new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `<h3>${items}</h3><p>${data.title[i]}</p>

              <p>Has tsunami occured ? ${val}</p>`
        )
    ).addTo(map);
    i++;
  })

})



document.getElementById('submit2').addEventListener(('click'), async (event) => {

  // console.log('hello2')
  const country = document.getElementById('selectNumber2').value;
  console.log(country)
  const value = await fetch(`http://localhost:3000/country/${country}`);

  const data = await value.json()
  let location = data.location;
  let area = await getCoordinates(country)
  // console.log('data',data)

  // const obj=Object.keys(data)

  mapboxgl.accessToken = 'pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: area,
    zoom: 4
  });
  let i = 0;
  location.map(async (items) => {

    // console.log('items here',items);

    const conversionAPI = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${items},%20France.json?access_token=pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA`)
    const obj = await conversionAPI.json()
    let coordinates = obj.features[0].center

    const el = document.createElement('div');
    addmarker(el, data.alert[i])
    // let val=tsunami(data.tsunami[i])
    // el.className = 'marker';
    new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `<h3>${data.title[i]}</h3>`
        )
    ).addTo(map);
    i++;
  })

  location.map(async (items) => {

    const conversionAPI = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${items},%20France.json?access_token=pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA`)
    const obj = await conversionAPI.json()
    // console.log(obj)
    let coordinates = obj.features[0].center
    const el = document.createElement('div');


    //  el.className = 'marker';
    tsunamimarker(el, data.tsunami[i])
    // console.log(data.tsunami[i])


    let val = tsunami(data.tsunami[i])
    new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `<h3>${items}</h3><p>${data.title[i]}</p>

              <p>Has tsunami occured ? ${val}</p>`
        )
    ).addTo(map);
    i++;
  })

})


async function fetchdata() {


  const value = await fetch(`http://localhost:3000`);
  const data = await value.json()
  // console.log(data)
  let location = data.location;

  // const obj=Object.keys(data)
  mapboxgl.accessToken = 'pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    zoom: 0.4
  });


  let i = 0;
  location.map(async (items) => {

    const conversionAPI = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${items},%20France.json?access_token=pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA`)
    const obj = await conversionAPI.json()
    // console.log(obj)
    let coordinates = obj.features[0].center
    const el = document.createElement('div');

    // console.log(data.alert[i])
    //  el.className = 'marker';
    addmarker(el, data.alert[i])

    // console.log(data.tsunami[i])

    let val = tsunami(data.tsunami[i])
    new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `<h3>${items}</h3><p>${data.title[i]}</p>`
        )
    ).addTo(map);
    // console.log(data.tsunami[i])
    i++;
  })



  location.map(async (items) => {

    const conversionAPI = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${items},%20France.json?access_token=pk.eyJ1IjoicmFraGkyMjA3IiwiYSI6ImNsZWNvd2RzZDAwZ3QzcnBodXduMjI0Zm4ifQ.M8IVXBJ9TetScihLa7yXRA`)
    const obj = await conversionAPI.json()
    // console.log(obj)
    let coordinates = obj.features[0].center
    const el = document.createElement('div');


    //  el.className = 'marker';
    tsunamimarker(el, data.tsunami[i])
    // console.log(data.tsunami[i])


    let val = tsunami(data.tsunami[i])
    new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `<h3>${items}</h3><p>${data.title[i]}</p>

                  <p>Has tsunami occured ? ${val}</p>`
        )
    ).addTo(map);
    i++;
  })
}


// }

fetchdata()

function tsunamimarker(el, tsunmai) {
  if (tsunmai === '1') {

    el.className = 'marker tsunmai'
    // console.log("tsunami")
  }

}


function tsunami(val) {
  // console.log("value",val)
  if (val === '0') {
    return false;

  }
  else if (val === '1') {
    return true;
  }
}









