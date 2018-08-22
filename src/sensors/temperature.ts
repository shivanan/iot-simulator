import { Sensor } from '../sensor';
export class TemperatureSensor extends Sensor {
    computeValue() {
        let val = Number(this.value);
        let rand = Math.random();

        return val += (0.1*rand-0.05);
    }
}