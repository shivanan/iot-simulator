
import { IIotSimulatorSettings } from "./iot-simulator-settings";
import { Sensor } from "./sensor";
const {ipcRenderer} = (window as any).require('electron');

export type SensorCallback = (s:Sensor) => void;
const sensors:Array<[Sensor,SensorCallback]> = [];
export function registerSensor(sensor:Sensor,cb:SensorCallback) {
    sensors.push([sensor,cb]);
}
export function unregisterSensor(sensor:Sensor) {
    for(let i=0;i<sensors.length;i++) {
        if (sensor === sensors[i][0]) {
            sensors.splice(i,1);
            break;
        }
    }
}
let sensorPollingInterval = 2000;
ipcRenderer.on('message',(event:string,payload:any)=>{
    let {topic,message} = payload as {topic:string,message:any};

    if (!topic.startsWith('/iot-simulator/in/')) {
        /* unrecognized message */
        return;
    }

    let topicDeviceInfo = topic.substring('/iot-simulator/in/'.length);
    /* this should be device/value */
    let parts = topicDeviceInfo.split('/');
    if (parts.length < 2) return;
    var value:string = null;
    var status:string = null;
    try {

        const obj = JSON.parse(message);

        status = obj.status; 
        value = obj.value;

        if (typeof status === 'undefined') {
            status = null;
        }
        if (typeof value === 'undefined') {
            value = null;
        }

    } catch {
        console.log('Error parsing payload:',message);
        return;
    }
    
    let [device,parameter,..._rest] = parts;
    
    sensors.forEach(q => {
        let s = q[0];
        console.log('ZE QUEUE',s);
        if (s.device === device) {
            if (value !== null) {
                s.forceValue(value);
            }
            if (status !== null) {
                s.setActiveState(Number(status)===1);
            }
        }
    });

    console.log('got message',message);
});
export function saveSettings(settings:IIotSimulatorSettings) {
    ipcRenderer.send('settings',settings);
    let newInterval = Number(settings.pollingInterval);
    if (isNaN(newInterval)) {
        newInterval = 2;
    }
    sensorPollingInterval = newInterval*1000;
}
function publish(sensors:Sensor[]) {
    sensors.forEach(s => {
        let topic = `/iot-simulator/out/devices/${s.device}`;
        let value = '' + s.value;
        ipcRenderer.send('cov',{topic,message:{value,device:s.device}});
    });
}
function tick() {
    let toPublish:Sensor[] = [];
    for (let i = 0; i < sensors.length; i++) {
        const sensor = sensors[i][0];
        if (!sensor.active) {
            continue;
        }
        sensor.update();
        sensors[i][1](sensor);
        toPublish.push(sensor);
    }
    publish(toPublish);
    setTimeout(tick,sensorPollingInterval);
}
tick();
