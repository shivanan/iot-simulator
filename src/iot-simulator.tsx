import { List } from 'immutable';
import * as React from 'react';
import { BottomBar } from './bottombar';
import { IDevice } from './device';
import { IDeviceCardProps } from './device-card';
import { SideBar } from './sidebar';
import { Staging } from './staging';
import { TopBar } from './topbar';
interface IIoTSimulatorState {
    devices:List<IDevice>;
    collapse: boolean;//good
}
type DeviceCreator = (props:IDeviceCardProps) => JSX.Element;
const DeviceCardMap:{[name:string]:DeviceCreator} = {};
export function registerDeviceCard(name:string,f:DeviceCreator) {
    DeviceCardMap[name] = f;
}
export function createDeviceCard(name:string,props:IDeviceCardProps):JSX.Element {
    return DeviceCardMap[name](props);
}
export class IoTSimulator extends React.Component<{},IIoTSimulatorState> {
    constructor(props:any) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            devices:List(),
            collapse: false,
          };
    }
    toggle(collapsed:boolean) {
        this.setState({ collapse:collapsed });       
    }
    addDevice(device:IDevice) {
        this.setState({devices:this.state.devices.push(device)});
    }
    
    render() {
        return <div className='container'>
            <TopBar />
            <SideBar onSideBarCollapse={this.toggle.bind(this)} collapsed={this.state.collapse} onAddDevice={this.addDevice.bind(this)} />
            <Staging collapsed={this.state.collapse} devices={this.state.devices} />
            <BottomBar collapsed={this.state.collapse} />
        </div>
    }
}