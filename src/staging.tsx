import * as classNames from 'classnames';
import { List } from 'immutable';
import * as React from 'react';
import { IDevice } from './device';
import { DeviceCardState } from './device-card';
import { createDeviceCard } from './iot-simulator';
export interface IStagingProps {
 devices:List<IDevice>;
 collapsed: boolean;
 onDeviceStateChange:(device:IDevice,newState:DeviceCardState) => void;
 expandedDevice:IDevice;
 onDeviceDeleted:(device:IDevice) => void;
}
export interface IStagingState {
   
    
}
export class Staging extends React.Component<IStagingProps,IStagingState> {
    constructor(props:IStagingProps) {
        super(props);
      
    }
    renderDevice(d:IDevice) {
        let el = createDeviceCard(d.type,{
            device:d,
            state:d===this.props.expandedDevice?DeviceCardState.expanded:DeviceCardState.normal,
            onStateChange:(newState)=>this.deviceStateChange(d,newState),
            onDelete:()=>this.onDelete(d)
        });
        return <div key={d.id} className={this.props.expandedDevice===d?'device-card-expanded':'device-card'}>{el}</div>;
    }
    onDelete(d:IDevice) {
        this.props.onDeviceDeleted(d);
    }
    deviceStateChange(device:IDevice,newState:DeviceCardState) {
        this.props.onDeviceStateChange(device,newState);
    }
    renderSplashScreen(){
        return <div className='blank'>Add devices here</div>;
    }

    render() {


        return <div className={classNames('staging '+(this.props.devices.count()>0?'has-devices':''),{'sidebar-collapsed':this.props.collapsed})} 
        
        >
           
            {
                this.props.devices.count() > 0 ?
                (this.props.devices.map(d => this.renderDevice(d)))  : this.renderSplashScreen()
            }

        </div>
            ;
    }
}