import { Sensor } from "./sensor";

export type SensorCallback = (s:Sensor) => void;
const sensors:Array<[Sensor,SensorCallback]> = [];
export function registerSensor(sensor:Sensor,cb:SensorCallback) {
    sensors.push([sensor,cb]);
}

function tick() {
    for (let i = 0; i < sensors.length; i++) {
        const sensor = sensors[i][0];
        sensor.update();
        sensors[i][1](sensor);
    }
    setTimeout(tick,1000);
}
tick();