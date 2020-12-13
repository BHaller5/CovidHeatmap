"use strict";
var coordinates = [ [46.841360, -96.825129], [46.842503, -96.810404], [46.836942, -96.816957], [46.844706, -96.816929] ]

function initMap() {
  const myLatLng = {
    lat: 46.840560,
    lng: -96.817676
  };

  // var heatMapData = [
  //   {location: new google.maps.LatLng(46.841360, -96.825129), weight: .05},
  //   {location: new google.maps.LatLng(46.842503, -96.810404), weight: .05},
  //   {location: new google.maps.LatLng(46.836942, -96.816957), weight: .05},
  //   {location: new google.maps.LatLng(46.844706, -96.816929), weight: .05}
  // ];

  var heatMapData = []
  //let coordString = window.localStorage.getItem('coords')
  let coordString = window.localStorage.getItem('coords')
  console.log(coordString)
  let coordArray = coordString.split(' ')
  console.log(coordArray)
  let nestedArray = []
  for (let i = 0; i < coordArray.length; i++) {
    nestedArray.push(coordArray[i].split(','))
  }
  nestedArray = nestedArray.filter(n => n.length > 1)
  for (let i = 0; i < nestedArray.length; i++) {
    // do something
    let lat = parseFloat(nestedArray[i][0])
    let long = parseFloat(nestedArray[i][1])
    console.log(lat, long)
    heatMapData.push({location: new google.maps.LatLng(lat, long), weight: .05})
  }

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatLng,
    fullscreenControl: true,
    zoomControl: true,
    streetViewControl: false
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!"
  });

  console.log('heatmapdata', heatMapData)
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
  });

  heatmap.setMap(map);
}

function myFunction() {
  let value = document.getElementById('coords').value.split(/\n/)
  value = value.join(' ')
  if (window.localStorage.getItem('coords') == null) {
    console.log('in if statement')
    window.localStorage.setItem('coords', '46.841360,-96.825129 46.842503,-96.810404 46.836942,-96.816957 46.844706,-96.816929')
  }

  console.log('value', value)
  if (value == undefined) {
    location.reload()
  } else {
    console.log(window.localStorage.getItem('coords'))
    window.localStorage.setItem('coords', window.localStorage.getItem('coords') + ' ' + value)
    location.reload()
  }
}