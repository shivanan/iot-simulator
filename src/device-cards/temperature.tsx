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
        //<div className="device_card_configure"> {'Temp:' + this.state.value}</div>
    }
    render() {
        return <div className='temp'>
            <div className="device_card_icon"><img src="images/list_icon.svg" alt="Temp_Icon" /></div>
            <h4 className="device_card_title">Temperature Sensor</h4>
            <div className="configure-btn"><a href="#"><img className="settings_icon" src="images/settings.svg" alt="Settings" /> <span>Configure</span> </a></div>
        </div>
    }
}

registerDeviceCard('temperature',(props) => <TemperatureDevice {...props} />);