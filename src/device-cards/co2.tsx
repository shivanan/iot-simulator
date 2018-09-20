import * as React from 'react';
import { DeviceCard, DeviceCardState, IDeviceCardState } from '../device-card';
import { IExpandDevice } from '../expand-device';
import { registerDeviceCard } from '../iot-simulator';
import { Sensor } from '../sensor';
import { registerSensor } from '../sensor-manager';
import { CO2Sensor } from '../sensors/co2';
import { AnalogSensorDevice } from './analog-sensor';

interface ITempState extends IDeviceCardState {
    value:number | string;
    active:boolean;
    
}

export class CO2Device extends DeviceCard<ITempState> {
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
        this.sensor = new CO2Sensor(this.props.device.id+':co2',this.state.value);
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
        sensorType='co2'
        sensorName='CO2 Sensor'
        device={this.props.device}
        active={this.state.active}
        onActiveChanged={this.toggleStatus.bind(this)}
        toggleState={this.toggleState.bind(this)}
        units='ppm'

        />;
    }
}

registerDeviceCard('co2','CO2 Sensor',(props) => <CO2Device {...props} />);