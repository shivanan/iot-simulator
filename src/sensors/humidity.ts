import { Sensor } from '../sensor';
export class HumiditySensor extends Sensor {
    computeValue() {
        let val = Number(this.value);
        let rand = Math.random();
        let variation = 3;
        val += (variation*(rand - 0.5));
        if (val > 100.0) val = 100.0;
        if (val < 0.0) val = 0.0;
        return val;
    }
}


