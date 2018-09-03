import * as React from 'react';
import { DeviceCard, IDeviceCardState } from '../device-card';
import { DeviceField } from '../field';
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
        let url = `url(images/sensors/temperature.svg`;
        return <div className='temperature'>
            <div className='title' style={{backgroundImage:url}}>Temperature Sensor</div>
            <div className='fields'>
                <DeviceField title='ID'>
                {
                    this.props.device.id
                }
                </DeviceField>
                <DeviceField title='Value'>
                {
                    Number(this.state.value).toFixed(2) + 'C'
                }
                </DeviceField>
                <DeviceField title='Status'>
                    <div className='device-card-status online'>Online</div>
                </DeviceField>
            </div>
        </div>;
    }
   
}

registerDeviceCard('temperature',(props) => <TemperatureDevice {...props} />);