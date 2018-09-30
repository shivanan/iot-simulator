import * as React from 'react';
import { IDevice } from './device';
export enum DeviceCardState {
    normal,
    expanded
}
export interface IDeviceCardProps {
    device:IDevice;
    state:DeviceCardState;
    onStateChange:(newState:DeviceCardState) => void;
    onDelete: () => void;

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
