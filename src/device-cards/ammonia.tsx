import * as React from 'react';
import { DeviceCard, DeviceCardState, IDeviceCardState } from '../device-card';
import { IExpandDevice } from '../expand-device';
import { registerDeviceCard } from '../iot-simulator';
import { Sensor } from '../sensor';
import { registerSensor, unregisterSensor } from '../sensor-manager';
import { AmmoniaSensor } from '../sensors/ammonia';
import { AnalogSensorDevice } from './analog-sensor';

interface ITempState extends IDeviceCardState {
    value:number | string;
    active:boolean;
    
}

export class AmmoniaDevice extends DeviceCard<ITempState> {
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
        
        
        this.state = {value:25,active:true};
        this.sensor = new AmmoniaSensor(this.props.device.id,this.state.value);
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

    onDelete() {
        unregisterSensor(this.sensor);
        this.props.onDelete();
    }

    render() {
        return <AnalogSensorDevice 
         state={this.props.state}
         value={Number(this.state.value)}
         onDelete={this.onDelete.bind(this)}

        onIncrement={this.onIncrement.bind(this)}
        sensorType='ammonia'
        sensorName='Ammonia Sensor'
        device={this.props.device}
        active={this.state.active}
        onActiveChanged={this.toggleStatus.bind(this)}
        toggleState={this.toggleState.bind(this)}
        units='ppm'

        />;
    }
}

registerDeviceCard('ammonia','Ammonia Sensor',(props) => <AmmoniaDevice {...props} />);