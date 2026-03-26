setInterval( ()  => {
   fetch("http://192.168.178.2/s").then((r) => { return r.text(); }).then((x) => {
      d = x.trimEnd().split(" ");
      
      document.body.innerHTML ="<p>" + d.join("; ") + "</p>" + document.body.innerHTML; 
   });
}, 2500);
