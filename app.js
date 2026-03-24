document.body.innerHTML = "<H1>Test</H1>";

setInterval( ()  => {
   fetch("http://192.168.178.2/s").then((r) => { return r.text(); }).then((x) => { document.querySelector("H1").innerHTML = x });
}, 2500);
