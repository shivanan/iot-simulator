import * as React from 'react';
import { DeviceCard, DeviceCardState, IDeviceCardState } from '../device-card';
import { IExpandDevice } from '../expand-device';
import { registerDeviceCard } from '../iot-simulator';
import { Sensor } from '../sensor';
import { LightSensorDevice } from './light-sensor';
import { registerSensor, unregisterSensor } from '../sensor-manager';
import {LightSensor } from '../sensors/light';


interface ITempState extends IDeviceCardState {
    value:number | string;
    active:boolean;
    
}

export class LightDevice extends DeviceCard<ITempState> {
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
       // this.state.onAddDevice(d);
    }
    constructor(props:any) {
        super(props);
        
        this.state = {value:0,active:true};
        this.sensor = new LightSensor(this.props.device.id,this.state.value);
        this.sensor.active = this.state.active;
        registerSensor(this.sensor,()=>{
            this.setState({value:this.sensor.computeValue()});
        });

        
    }
    onIncrement(val:number) {
         let newVal = Number(this.sensor.value) + val*0.05;
         newVal = Math.max(0,Math.min(newVal,1.0));
         this.sensor.forceValue(newVal);        
    }

    lightChange(val:string) {      
        this.sensor.forceValue(val);
        this.setState({value: this.sensor.computeValue()});
    }
   
    toggleState() {
        let state = this.props.state;
        let newState = state === DeviceCardState.expanded?DeviceCardState.normal:DeviceCardState.expanded;
        this.props.onStateChange(newState);
    }
    onDelete() {
        this.props.onDelete();
    }
    render() {
        return <LightSensorDevice 
        onDelete={this.onDelete.bind(this)}

        state={this.props.state}
        value={Number(this.state.value)}
        onIncrement={this.onIncrement.bind(this)}
        lightChange={this.lightChange.bind(this)}
        sensorType='light'
        sensorName='Light Sensor'
        sensorPict='light-pict'
        device={this.props.device}
        active={this.state.active}
        onActiveChanged={this.toggleStatus.bind(this)}
        toggleState={this.toggleState.bind(this)}
        units=''
        //transformValue={(val) => Math.round(val*100) + ' ' + 'm/s'}
        />;
    }   
}

registerDeviceCard('light','Light Sensor',(props) => <LightDevice {...props} />);