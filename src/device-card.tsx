import * as React from 'react';
import { IDevice } from './device';
export interface IDeviceCardProps {
    device:IDevice;
}
export interface IDeviceCardState {

}

export class DeviceCard<T extends IDeviceCardState> extends React.Component<IDeviceCardProps,T> {
    constructor(props:IDeviceCardProps) {
        super(props);
        
    }
    render() {
        return <div />;
    }
}
