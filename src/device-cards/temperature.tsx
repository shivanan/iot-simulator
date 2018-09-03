import * as classNames from 'classnames';
import * as React from 'react';
import { DeviceCard, IDeviceCardState } from '../device-card';
import { DeviceField } from '../field';
import { registerDeviceCard } from '../iot-simulator';
import { Sensor } from '../sensor';
import { registerSensor } from '../sensor-manager';
import { TemperatureSensor } from '../sensors/temperature';

interface ITempState extends IDeviceCardState {
    value:number | string;
    active:boolean;
}
export class TemperatureDevice extends DeviceCard<ITempState> {
    sensor:Sensor = null;

    toggleStatus() {
        this.setState({active:!this.state.active},()=>{
            this.sensor.active = this.state.active;
        });
    }
    constructor(props:any) {
        super(props);
        this.state = {value:25,active:true};
        this.sensor = new TemperatureSensor(this.props.device.id+':temp',this.state.value);
        this.sensor.active = this.state.active;
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
                    <div onClick={this.toggleStatus.bind(this)} className={classNames('device-card-status',{'online':this.state.active})}>
                    {
                        this.state.active?'Online':'Offline'
                    }
                    </div>
                </DeviceField>
            </div>
        </div>;
    }
   
}

registerDeviceCard('temperature',(props) => <TemperatureDevice {...props} />);