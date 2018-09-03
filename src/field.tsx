import * as React from 'react';
export interface IDeviceFieldProps {
    title: string;
}
export interface IDeviceFieldState {
    
}
export class DeviceField extends React.Component<IDeviceFieldProps,IDeviceFieldState> {
    constructor(props:IDeviceFieldProps) {
        super(props);
        this.state = {}
    }
    render() {
        return <div className='device-field'>
            <div className='device-field-title'>{this.props.title}</div>
            <div className='device-field-value'>
            {this.props.children}
            </div>
        </div>;
    }
}