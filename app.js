document.body.innerHTML = "<H1>Test</H1>";

setInterval( ()  => {
  document.querySelector("H1").innerHTML = fetch("http://192.168.178.2/s").then((r) => { return r.text(); }).then((x) => { return x });
}, 2500);
