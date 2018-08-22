import * as React from 'react';
import { IDevice } from './device';
export interface ISideBarProps {
    onAddDevice:(device:IDevice) => void;
}
export interface ISideBarState {
    
}
export class SideBar extends React.Component<ISideBarProps,ISideBarState> {
    constructor(props:ISideBarProps) {
        super(props);
        this.state = {}
    }
    addDevice(d:IDevice) {
        this.props.onAddDevice(d);
    }
    render() {
        return <div className='sidebar' >
            <div onClick={this.addDevice.bind(this,{'id':new Date()+'',type:'temperature'})}>Temp</div>
        </div>;
    }
}