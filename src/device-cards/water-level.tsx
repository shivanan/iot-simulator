import * as React from 'react';
import { DeviceCard, DeviceCardState, IDeviceCardState } from '../device-card';
import { IExpandDevice } from '../expand-device';
import { registerDeviceCard } from '../iot-simulator';
import { Sensor } from '../sensor';
import { registerSensor } from '../sensor-manager';
import { WaterLevelSensor } from '../sensors/water-level';
import { AnalogSensorDevice } from './analog-sensor';

interface ITempState extends IDeviceCardState {
    value:number | string;
    active:boolean;
    
}

export class WaterLevelDevice extends DeviceCard<ITempState> {
    sensor:Sensor = null;

    toggleStatus() {
        this.setState({active:!this.state.active},()=>{
            this.sensor.active = this.state.active;
        });
    }
    toggleBtnStatus() {
        this.setState({active:!this.state.active},()=>{
            this.sensor.active = this.state.active;
        });
    }
    
    addDevice(d:IExpandDevice) {
        //this.state.onAddDevice(d);
    }
    constructor(props:any) {
        super(props);
        
        
        this.state = {value:0,active:true};
        this.sensor = new WaterLevelSensor(this.props.device.id+':wl',this.state.value);
        this.sensor.active = this.state.active;
        registerSensor(this.sensor,()=>{
            this.setState({value:this.sensor.computeValue()});
        });
        
    }
    onIncrement(val:number) {
        let newVal = Number(this.sensor.value) + val*0.2;
        newVal = Math.max(0,Math.min(newVal,1.0));
        this.sensor.forceValue(newVal);

        /* temporarily set next value until next sensor update */
        this.setState({value:newVal});
    }
   
    toggleState() {
        let state = this.props.state;
        let newState = state === DeviceCardState.expanded?DeviceCardState.normal:DeviceCardState.expanded;
        this.props.onStateChange(newState);
    }
    render() {
        return <AnalogSensorDevice 
         state={this.props.state}
         value={Number(this.state.value)}
        onIncrement={this.onIncrement.bind(this)}
        sensorType='waterlevel'
        sensorName='Water Level Sensor'
        device={this.props.device}
        active={this.state.active}
        onActiveChanged={this.toggleStatus.bind(this)}
        toggleState={this.toggleState.bind(this)}
        units=''
        transformValue={(val) => Math.round(val*100)+'%'}

        />;
    }
    
   
}

registerDeviceCard('waterlevel','Water Level Sensor',(props) => <WaterLevelDevice {...props} />);