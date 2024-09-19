let socket=io();

//console.log("hey hi!");

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
    },(Error)=>{
        console.error(Error);
        
    },
    {
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    } 
);

};

   const map=L.map("map").setView([0,0],16)      //set view is the where to start from [0,0] means center of the earth  10 means zooms
  
   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"OpenStreetMap"
   }).addTo(map)


   const markers={};

   socket.on("recieve-location",(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
   });

socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id]
    }
});