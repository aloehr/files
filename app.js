document.title = "StromMonitor 0.1";
document.body.innerHTML = '<div id="status">Aktuelle Zeit: <span id="current_time">00:00:00</span> Uhr<br>letzter Pulse vor: <span id="last_pulse_seconds">NO DATA</span><br>Aktueller Verbrauch: <span id="current_consumption">NO DATA</span></div><div id="pulse_data"></div>';

var status = document.getElementById("status");
var pulse_data = document.getElementById("pulse_data");

var last_pulse_id = -1;
var last_pulse_time = -1;
var last_pulse_interval = -1;
var last_update = -1;
function update_status() {
  // current time
  document.getElementById("current_time").innerHTML = getTimeString(Math.floor(Date.now() / 1000));

  if (last_pulse_time >= 0 && last_pulse_interval >= 0) {
    // seconds since lat pulse
    document.getElementById("last_pulse_seconds").innerHTML = "" + Math.floor(Date.now() / 1000) - last_pulse_time + "s";

    // current power consumption
    var kwh = 3600 * 1000 / last_pulse_interval;

    if (last_pulse_time * 1000 + last_pulse_interval + 5000 < Date.now())
      kwh = 3600 * 1000 / (Date.now() - (last_pulse_time * 1000));

    document.getElementById("current_consumption").innerHTML = kwh.toFixed(1) + " Watt";
  }
}

setInterval(update_status, 1000);

function getTimeString(unixEpochString) {
  var zeroPadded = (number) => { return number.toString().padStart(2, "0"); };

  var d = new Date(+unixEpochString * 1000);

  return zeroPadded(d.getHours()) + ":" + zeroPadded(d.getMinutes()) + ":" + zeroPadded(d.getSeconds());
}

setInterval(() => {
  fetch("http://192.168.178.2/s").then((r) => { return r.text(); }).then((x) => {
    var d = x.trimEnd().split(" ");

    if (last_pulse_id == +d[0]) return;

    last_update = Date.now();
    last_pulse_id = +d[0];
    last_pulse_time = +d[1];
    last_pulse_interval = +d[3];


    pulse_data.innerHTML = "<p>Pulse ID: " + d[0].padStart(8) +
       "; Zeit: " + getTimeString(d[1]) +
       " Uhr; Pulse Länge: " + d[2].padStart(5) +
       " ms; Pulse Intervall: " + d[3].padStart(8) +
       " ms; Trigger Delta: " + d[4].padStart(6) +
       " V; Max Pulse Volts: " + d[5].padStart(6) +
       " V; Verbrauch: "  + (3600000 / +d[3]).toFixed(1).padStart(10) + " Watt</p>" + pulse_data.innerHTML;
  });
}, 5000);
