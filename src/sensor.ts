import { ISensorValue } from './sensor-data';
export declare type SensorValue= number|string;
export declare type ActiveStateChange = (newState:boolean) => void;
export  class Sensor {
    device:string;
    value:SensorValue
    active:boolean;
    onActiveStateChange:ActiveStateChange;

    constructor(d:string,v:SensorValue,onActiveStateChange?:ActiveStateChange) {
        this.device = d;
        this.value = v;
        this.active = true;
        this.onActiveStateChange = onActiveStateChange;
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
    setActiveState(active:boolean) {
        this.active = active;
        if (this.onActiveStateChange != null) {
            this.onActiveStateChange(this.active);
        }
    }
}