import { ISensorValue } from './sensor-data';
export  class Sensor {
    device:string;
    value:string|number
    active:boolean;
    constructor(d:string,v:string|number) {
        this.device = d;
        this.value = v;
        this.active = true;
    }
    get():ISensorValue {
        let device = this.device;
        let value = this.value;
        return {
            device,value,timestamp:new Date()
        };
    }
    computeValue() {
        return this.value;
    }
    update() {
        this.value = this.computeValue();
    }
}