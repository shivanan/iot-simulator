import { Sensor } from '../sensor';
export class HumiditySensor extends Sensor {
    computeValue() {
        let val = Number(this.value);
        let rand = Math.random();
        let variation = 3;
        return val += (variation*(rand - 0.5));
    }
}


