import { List } from 'immutable';
import * as React from 'react';
import { IDevice } from './device';
import { createDeviceCard } from './iot-simulator';
export interface IStagingProps {
 devices:List<IDevice>;
}
export interface IStagingState {
    
}
export class Staging extends React.Component<IStagingProps,IStagingState> {
    constructor(props:IStagingProps) {
        super(props);
        this.state = {}
    }
    renderDevice(d:IDevice) {
        let el = createDeviceCard(d.type,{device:d});
        return <div key={d.id} className='device-card'>{el}</div>;
    }
    render() {
        return <div className='staging' >
        {
            this.props.devices.map(d => this.renderDevice(d))
        }
        </div>;
    }
}