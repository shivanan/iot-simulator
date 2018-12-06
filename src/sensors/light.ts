import { Sensor, SensorValue } from '../sensor';
export class LightSensor extends Sensor {
    computeValue() {
        let val = Number(this.value);
        return val;
    }
    forceValue(val:SensorValue) {
        let m = Number(val);
        // if (m >1) m = 1;
        // if (m < 0) m = 0;
        this.value = m;
    }
}