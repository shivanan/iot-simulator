import { List } from 'immutable';
import * as React from 'react';
import { BottomBar } from './bottombar';
import { IDevice } from './device';
import { DeviceCardState, IDeviceCardProps } from './device-card';
import { IIotSimulatorSettings } from './iot-simulator-settings';
import { saveSettings } from './sensor-manager';
import { Settings } from './settings';
import { SideBar } from './sidebar';
import { Staging } from './staging';
import { TopBar } from './topbar';


interface IIoTSimulatorProps {
    settingsActived: boolean;   
    onActiveSettings:any;
}


interface IIoTSimulatorState {
    settingsActive: boolean;
    devices:List<IDevice>;
    collapse: boolean;
    expandedDevice:IDevice;
    settings:IIotSimulatorSettings;
   
}
type DeviceCreator = (props:IDeviceCardProps) => JSX.Element;
const DeviceCardMap:{[name:string]:[DeviceCreator,string]} = {};
export function registerDeviceCard(name:string,title:string,f:DeviceCreator) {
    DeviceCardMap[name] = [f,title];
}
export function getAllDevices():Array<[string,string]> {
    let r:Array<[string,string]> = [];
    for(let k in DeviceCardMap) {
        r.push([k,DeviceCardMap[k][1]]);
    }
    return r;
}
export function createDeviceCard(name:string,props:IDeviceCardProps):JSX.Element {
    return DeviceCardMap[name][0](props);
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
            settings:{
                host:'',
                user:'',
                password:'',
                topicPrefix:'/iot-simulator',
            }
          };
    }

    toggle(collapsed:boolean) {
        this.setState({ collapse:collapsed });       
    }
    onCallSettings(settingsActived:boolean){
        this.setState({ settingsActive : settingsActived });          
    }

    closeSettings() {
        this.setState({settingsActive:false});
    }
    onSave(settings:IIotSimulatorSettings) {
        this.setState({
            settings: {
                host: settings.host,
                user: settings.user,
                password: settings.password,
                topicPrefix: settings.topicPrefix,
            },
            settingsActive: false
        }, () => {
            saveSettings(this.state.settings);
        });
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
            <Settings onSave={this.onSave.bind(this)}  settings={this.state.settings}  settingsActived={this.state.settingsActive} onClose={this.closeSettings.bind(this)}/>

            {/* <div visible={this.state.settings}>

                <Settings steps={Settings} onClose={this.closesettings.bind(this)} />

            </div> */}

        </div>
    }
}