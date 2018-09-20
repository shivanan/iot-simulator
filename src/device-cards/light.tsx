import * as React from 'react';
import { DeviceCard, DeviceCardState, IDeviceCardState } from '../device-card';
import { IExpandDevice } from '../expand-device';
import { registerDeviceCard } from '../iot-simulator';
import { AnalogSensorDevice } from './analog-sensor';

interface ITempState extends IDeviceCardState {
    value:number | string;
    active:boolean;
    
}

export class LightDevice extends DeviceCard<ITempState> {

    toggleStatus() {
        this.setState({active:!this.state.active},()=>{
            //this.sensor.active = this.state.active;
        });
    }
  
    
    addDevice(d:IExpandDevice) {
        //this.state.onAddDevice(d);
    }
    constructor(props:any) {
        super(props);
        
        
        this.state = {value:1,active:true};

        
    }
    onIncrement(val:number) {
        
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
        sensorType='light'
        sensorName='Light'
        device={this.props.device}
        active={this.state.active}
        onActiveChanged={this.toggleStatus.bind(this)}
        toggleState={this.toggleState.bind(this)}
        units=''

        />;
    }
    
   
}

registerDeviceCard('light','Light',(props) => <LightDevice {...props} />);