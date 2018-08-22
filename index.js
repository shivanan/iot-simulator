var settings = require('electron-json-storage');
var iviva = require('ivivacloud-node');
var uuid = require('node-uuid');

var AccountUrl = '';
var ApiKey = '';
var iVivaAccount = null;
var Connected = false;
var DeviceID = '';

function init() {
	initApp(function(){
		initPage();
	});
}
function initPage() {
	populateSensors();
	settings.get('iviva-settings',function(error,data){
		console.log('got data',error,data);
		if (!!error) {
			showSettings(true);
			return;
		}
		if (!data.url || !data.apikey) {
			showSettings(true);
			return;
		}
		AccountUrl = data.url;
		ApiKey = data.apikey;
		updateStatus('Testing connection to ' + AccountUrl);
		initAccount(AccountUrl,ApiKey,function(err,account){
			if (!!err) {
				updateError('Unable to connect to ' + AccountUrl + ":" + err);
				return;
			}
			updateStatus('Connected successfully');
			iVivaAccount = account;
			generateEvents();
			showDevices();
		});


	});
}
function bumpValue(el,increment) {
	var d = findAncestor(el,'th-group');
	var th = d.querySelector('.analog');
	var sensorId = th.id;
	var sensorValue = th.getAttribute('value');
	sensorValue= Number(sensorValue) + increment;
	th.setAttribute('value',sensorValue);
	var units = th.getAttribute('units');
	var ch = th.firstElementChild;
	ch.innerText = sensorValue + units;
	fireEvent(sensorId,sensorValue);
}
function populateSensors() {
	var items = document.getElementsByClassName('sensorid');
	for (var i = 0; i < items.length; i++) {
		var el = items[i];
		var sid = el.getAttribute('sensorid');
		el.innerText= DeviceID + '/' + sid;
	}
}
function generateEvents() {
	if (iVivaAccount == null) {
		return;
	}
	var parameters = {
		'EventID':'LucyDeviceSimulator.Event',
		'Description':'Lucy Device Simulator Event',
		'Parameters':JSON.stringify({'DeviceID':'The id of the device',
	'Value':'The current value of the device'}),
		'App':'Lucy'
	};
	iVivaAccount.executeService('System.EventRegister:RegisterEvent',
	parameters,function(err,cb){

	});
}
function initApp(cb) {
	settings.get('device-id',function(err,data){
		if (!!err || !data || !data.deviceid) {
			var deviceID = uuid.v1();
			console.log('Generating device id',deviceID);
			settings.set('device-id',{deviceid:deviceID},function(err){
				if (!!err) {
					alert('Error generating device id:' + err);
					return;
				}
				DeviceID = formatDeviceID(deviceID);
				cb();
			});
		} else {
			DeviceID = formatDeviceID(data.deviceid);
			cb();
		}
	});
}
function formatDeviceID(did) {
	if (did.length > 5) return did.substring(0,5);
	return did;
}
function updateError(txt) {
	var s = document.getElementById('status-line');
	s.classList.add('error');
	s.innerText = txt;
}
function updateStatus(txt) {
	var s = document.getElementById('status-line');
	s.classList.remove('error');
	s.innerText = txt;
}
function toggleDeviceID(show) {
	var d = document.getElementById('devid-container');
	if (show) {
		d.classList.remove('invisible');
	} else {
		d.classList.add('invisible');
	}
}
function showDevices() {
	// toggleDeviceID(true);
	var settings = document.getElementById('settings');
	var devices = document.getElementById('devices');
	settings.classList.add('invisible');
	devices.classList.remove('invisible');
	if (iVivaAccount==null) {
		updateError('No valid iVivaCloud credentials were found');
		return;
	}
	initiVivaConnection();
	var did = document.getElementById('deviceid');
	did.innerText = DeviceID;
}
function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}
function executeCommand(p) {
	var div = findAncestor(p,'control');
	var sensorel = div.getElementsByClassName('sensorid')[0];
	var sensorID = sensorel.innerText;
	var valueel = div.getElementsByClassName('value')[0];
	if (valueel.classList.contains('on')) {
		valueel.classList.remove('on');
	} else {
		valueel.classList.add('on');
		fireEvent(sensorID);
	}
}
function executeSingleCommand(p) {
	var div = findAncestor(p,'control');
	var pt = div.getAttribute('prompt');
	showPrompt(pt,(v)=>{
		var sensorel = div.getElementsByClassName('sensorid')[0];
		var sensorID = sensorel.innerText;
		fireEvent(sensorID,v);
	});
	
}
function showPrompt(text,callback) {
	var el = document.querySelector('.prompt-window');
	el.querySelector('.title').innerText = text;
	el.classList.add('show');
	el.callback = callback;
	el.querySelector('input').focus();
}
function fireEvent(sensorID,value) {

	console.log('Fired Event',sensorID);
	var parameters = {
		EventID:'LucyDeviceSimulator.Event'
		,'DeviceID':sensorID
		,'Value':value || 1
		,'LocationKey':0
	};
	if (iVivaAccount != null) {
		iVivaAccount.executeService('System.FireEvent',parameters,function(){});
	}
}
function digitalCommand(d) {
	var sensor = d.id;
	var val = getSensorValue(sensor);
	if (val==1) val =0;
	else if (val==0) val = 1;
	setSensorValue(sensor,val);
}
function getSensorValue(sensor) {
	var e = document.getElementById(sensor);
	if (!e) {
		console.log('Unable to find sensor',e);
		updateError('No such sensor:',e);
		return;
	}
	if (e.classList.contains('digital')) {
		if (e.classList.contains('on')) return 1;
		return 0;
	}
	if (e.classList.contains('analog')) {
		var ch = e.firstElementChild;
		return ch.innerText;
	}
	return '';
}
function setSensorValue(sensor,val) {
	var e = document.getElementById(sensor);
	if (!e) {
		console.log('Unable to find sensor',e);
		updateError('No such sensor:',e);
		return;
	}
	if (e.classList.contains('digital')) {
		e.classList.remove('off');
		e.classList.remove('on');
		if (Number(val)==1) {
			e.classList.add('on');
		}
		return;
	}

	if (e.classList.contains('analog')) {
		var units = e.getAttribute('units');
		var ch = e.firstElementChild;
		ch.innerText = val + units;
		e.setAttribute('value',val);
	}
}
function initiVivaConnection() {
	var mb = new iviva.MessageBus(iVivaAccount);
	updateStatus('Opening message bus connection...');
	mb.init(function(){
		updateStatus('Connected to ' + AccountUrl);
		mb.subscribe(DeviceID,function(channel,message){
			console.log('Received data',channel,message);
			try {
				var obj = JSON.parse(message);
				var sensor = obj.sensorID;
				var val = obj.value;
				setSensorValue(sensor,val);
			} catch (e) {
				console.log('Error in receiving from message bus:',e)
				updateError(e);
			}
		});
	});
}
function toggleSettings() {
	var settings = document.getElementById('settings');
	if (settings.classList.contains('invisible')) {
		showSettings();
	} else {
		showDevices();
	}
}
function showSettings() {
	// toggleDeviceID(false);
	var settings = document.getElementById('settings');
	var devices = document.getElementById('devices');
	settings.classList.remove('invisible');
	devices.classList.add('invisible');
	document.getElementById('ivivacloudurl').value = AccountUrl || '';
	document.getElementById('apikey').value = ApiKey || '';
}
function saveSettings(btn) {
	var url = document.getElementById('ivivacloudurl').value;
	var apikey = document.getElementById('apikey').value;
	if (!url) {
		alert('Please specify the url of a valid iVivaCloud account');
		return;
	}
	if (!apikey) {
		alert('Please enter the api key issued to you by the iVivaCloud account');
		return;
	}
	initAccount(url,apikey,function(err,account){
		if (!!err) {
			alert(err);
			return;
		}
		iVivaAccount = account;
		settings.set('iviva-settings',{url:url,apikey:apikey},function(err){
			if (!!err) {
				alert('Unable to save settings');
				return;
			}
			AccountUrl = url;
			ApiKey = apikey;
			showDevices();
		});

	});

}
function initAccount(url,apikey,cb) {
	var acct = new iviva.Account(url,apikey);
	acct.executeService('System.AvailableDateFormats',{},function(err,data){
		if (!!err) {
			cb('Unable to run services',null);
			return;
		}
		cb(null,acct);
	});
}
function confirmPrompt() {
	var el = document.querySelector('.prompt-window');
	var v = el.querySelector('input').value;
	var cb = el.callback;
	if (!!cb) {
		cb(v);
	}
	cancelPrompt();
}
function cancelPrompt() {
	var el = document.querySelector('.prompt-window');
	el.classList.remove('show');
	el.querySelector('input').value = '';
	el.callback = null;
}
init();