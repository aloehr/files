setInterval( ()  => {
   fetch("http://192.168.178.2/s").then((r) => { return r.text(); }).then((x) => {
      d = x.trimEnd().split(" ");
      da = new Date(+d[1] * 1000);
      document.body.innerHTML ="<p>Pulse ID: " + d[0] + 
         "; Zeit: " + da.getHours() + ":" da.getMinutes() + ":" + da.getSeconds() + 
         " Uhr; Pulse Länge: " + d[2] + 
         " ms; Pulse Intervall: " + d[3] + 
         " ms; Trigger Delta: " + d[4] + 
         " V; Max Pulse Volts: " + d[5] + 
         " V; Verbrauch: " (3600000 / +d[3]) + " kWh</p>" + document.body.innerHTML; 
   });
}, 2500);
