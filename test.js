var mqtt = require('mqtt');
c = mqtt.connect({host:'mqtt.lucyhq.com'});
while(true) {
	console.log(c.connected);
}
