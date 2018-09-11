import { List } from 'immutable';
import * as React from 'react';
import { BottomBar } from './bottombar';
import { IDevice } from './device';
import { DeviceCardState, IDeviceCardProps } from './device-card';
import { SideBar } from './sidebar';
import { Staging } from './staging';
import { TopBar } from './topbar';
import { Settings } from './settings';


interface IIoTSimulatorProps {
    settingsActived: boolean;   
    onActiveSettings:any;
}


interface IIoTSimulatorState {
    settingsActive: boolean;
    devices:List<IDevice>;
    collapse: boolean;
    expandedDevice:IDevice;
   
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
        this.onCallSettings = this.onCallSettings.bind(this);
        this.state = {
            devices:List(),
            collapse: false,
            expandedDevice:null,
            settingsActive:false,
          };
    }



    //checkAndOnboardUser() {
   //     if (getLocalSetting(LocalSettingKey.Hidesettings) == '1') return;
   //     this.setState({ settings: true });
   // }
   // onboardUser() {
       // this.setState({ settings: true, activePanel: '' });
   // }

   // closesettings(hide: boolean) {
   //     if (hide) {
   //          setLocalSetting(LocalSettingKey.Hidesettings, '1');
   //     }
   //      this.setState({ settings: false });
   //  }

   

    toggle(collapsed:boolean) {
        this.setState({ collapse:collapsed });       
    }
    onCallSettings(settingsActived:boolean){
        this.setState({ settingsActive : settingsActived });          
    }

    addDevice(device:IDevice) {
        this.setState({devices:this.state.devices.push(device)});
    }
    deviceStateChange(device:IDevice,newState:DeviceCardState) {
        if (newState === DeviceCardState.expanded) {
            this.setState({expandedDevice:device});
        } else {
            this.setState({expandedDevice:null});
        }
    }
    
    render() {
        return <div className='container'>
            <TopBar />
            <SideBar onSideBarCollapse={this.toggle.bind(this)} collapsed={this.state.collapse} onAddDevice={this.addDevice.bind(this)} />
            <Staging expandedDevice={this.state.expandedDevice} collapsed={this.state.collapse} devices={this.state.devices} onDeviceStateChange={this.deviceStateChange.bind(this)} />
            <BottomBar onSideBarCollapse={this.toggle.bind(this)} collapsed={this.state.collapse} onActiveSettings={this.onCallSettings.bind(this)} settingsActived={this.state.settingsActive} />
            <Settings onActiveSettings={this.onCallSettings.bind(this)} settingsActived={this.state.settingsActive}/>

            {/* <div visible={this.state.settings}>

                <Settings steps={Settings} onClose={this.closesettings.bind(this)} />

            </div> */}

        </div>
    }
}