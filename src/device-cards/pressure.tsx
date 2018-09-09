import * as React from 'react';
import { DeviceCard, DeviceCardState, IDeviceCardState } from '../device-card';
import { IExpandDevice } from '../expand-device';
import { registerDeviceCard } from '../iot-simulator';
import { Sensor } from '../sensor';
import { registerSensor } from '../sensor-manager';
import { PressureSensor } from '../sensors/pressure';
import { AnalogSensorDevice } from './analog-sensor';

interface IPressureState extends IDeviceCardState {
    value:number | string;
    active:boolean;
    
}

export class PressureDevice extends DeviceCard<IPressureState> {
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
        this.state = {value:12,active:true};
        this.sensor = new PressureSensor(this.props.device.id+':h',this.state.value);
        this.sensor.active = this.state.active;
        registerSensor(this.sensor,()=>{
            this.setState({value:this.sensor.computeValue()});
        });
        
    }
    onIncrement(val:number) {
        let newVal = Number(this.sensor.value) + val;
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
        sensorType='pressure'
        sensorName='Pressure Sensor'
        device={this.props.device}
        active={this.state.active}
        onActiveChanged={this.toggleStatus.bind(this)}
        toggleState={this.toggleState.bind(this)}
        units='pa'

        />;
    }
    
   
}

registerDeviceCard('pressure',(props) => <PressureDevice {...props} />);