import { Sensor } from '../sensor';
export class Airconditioner extends Sensor {
   computeValue() {
        let val = Number(this.value);
      //  let rand = Math.random();
       // let variation = 0.05;
        return val ;
    }
}