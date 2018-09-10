import { ISensorValue } from './sensor-data';
export declare type SensorValue= number|string;
export  class Sensor {
    device:string;
    value:SensorValue
    active:boolean;

    constructor(d:string,v:SensorValue) {
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

    forceValue(val:SensorValue) {
        this.value = val;
    }
}