import * as React from 'react';
import { DeviceCard, IDeviceCardState } from '../device-card';
import { registerDeviceCard } from '../iot-simulator';
import { Sensor } from '../sensor';
import { registerSensor } from '../sensor-manager';
import { TemperatureSensor } from '../sensors/temperature';
interface ITempState extends IDeviceCardState {
    value:number | string;
}
export class TemperatureDevice extends DeviceCard<ITempState> {
    sensor:Sensor = null;

    constructor(props:any) {
        super(props);
        this.state = {value:25};
        this.sensor = new TemperatureSensor(this.props.device.id+':temp',this.state.value);
        registerSensor(this.sensor,()=>{
            this.setState({value:this.sensor.computeValue()});
        });

    }
    render() {
        return <div className='temp'>
        {'Temp:' + this.state.value}
        </div>
    }
}

registerDeviceCard('temperature',(props) => <TemperatureDevice {...props} />);