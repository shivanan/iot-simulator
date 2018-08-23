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
        const numbers = [1, 2, 3, 4, 5];
        const listItems = numbers.map((numbers) =>
        <li>{numbers}</li>
        );        

        return <div className='sidebar' >
            <div onClick={this.addDevice.bind(this,{'id':new Date()+'',type:'temperature'})}>Temp</div>
            <div id="mount-point">
                <ul>{listItems}</ul>
            </div>
        </div>;
    }
}