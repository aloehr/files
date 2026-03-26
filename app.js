setInterval( ()  => {
   fetch("http://192.168.178.2/s").then((r) => { return r.text(); }).then((x) => {
      d = x.split(" ");
      
      document.body.innerHTML +="<p>" + d.join("; ") + "</p"; 
   });
}, 2500);
