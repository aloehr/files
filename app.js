function getTimeString(unixEpochString) {
   var zeroPadded = (number) => { return number.toString().padStart(2, "0"); };
   
   var d = new Date(+unixEpochString * 1000);
   
   return zeroPadded(d.getHours()) + ":" + zeroPadded(d.getMinutes()) + ":" + zeroPadded(d.getSeconds);
}

setInterval( ()  => {
   document.title = "StromMonitor 0.1";
   
   fetch("http://192.168.178.2/s").then((r) => { return r.text(); }).then((x) => {
      var d = x.trimEnd().split(" ");
      
      document.body.innerHTML = "<p>Pulse ID: " + d[0].padStart(8) + 
         "; Zeit: " + getTimeString(d[1]) + 
         " Uhr; Pulse Länge: " + d[2].padStart(5) + 
         " ms; Pulse Intervall: " + d[3].padStart(8) + 
         " ms; Trigger Delta: " + d[4].padStart(6) + 
         " V; Max Pulse Volts: " + d[5].padStart(6) + 
         " V; Verbrauch: "  + (3600000 / +d[3]).toFixed(1).padStart(10) + " kWh</p>" + document.body.innerHTML; 
   });
}, 5000);
