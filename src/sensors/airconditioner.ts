import { Sensor } from '../sensor';
export class AirconditionerSensor extends Sensor {
    computeValue() {
        let val = Number(this.value);
        let rand = Math.random();
        let variation = 0.05;
        return val += (variation*(rand - 0.5));
    }
}