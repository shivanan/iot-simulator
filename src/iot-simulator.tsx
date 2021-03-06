import * as ejs from 'electron-json-storage';
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
                pollingInterval:'2',
            }
          };

          ejs.get('settings',(err:any,data:any) => {
              console.log('got settings',data);
            if (!!err) {
                console.log('Error loading settings:',err);
                return;
            }
            if (!data.settings) data.settings = {};
            let newSettings = {
                host: data.settings.host || '',
                user: data.settings.user || '',
                password: data.settings.password || '',
                topicPrefix: data.settings.topicPrefix || '/iot-simulator',
                pollingInterval: data.pollingInterval || '2',
            };
            let loadedDevices = List<IDevice>();
            let savedDevices = data.devices|| [];
            for(var i=0;i<savedDevices.length;i++) {
                let d = savedDevices[i];
                let m:IDevice = {id:d.id,type:d.type};
                loadedDevices = loadedDevices.push(m);
            }
            this.setState({settings:newSettings,devices:loadedDevices},()=>{
                saveSettings(this.state.settings);
            });
          });
    }
    saveSettings() {
        let obj = {settings:this.state.settings,devices:this.state.devices.toJS()};
        console.log('Saving',obj);
        ejs.set('settings',obj,(err:any)=>{if (!!err)console.log('Error saving settings: ',err);});
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
                pollingInterval:settings.pollingInterval,
            },
            settingsActive: false
        }, () => {
            this.saveSettings();
            saveSettings(this.state.settings);
        });
    }

    removeDevice(device:IDevice) {
        this.setState({devices:List(this.state.devices.filter(x => x !==device))},()=>{
            this.saveSettings();
        });

    }
    addDevice(device:IDevice) {
        this.setState({devices:this.state.devices.push(device)},()=>{
            this.saveSettings();
        });
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
            <Staging onDeviceDeleted={this.removeDevice.bind(this)} expandedDevice={this.state.expandedDevice} collapsed={this.state.collapse} devices={this.state.devices} onDeviceStateChange={this.deviceStateChange.bind(this)} />
            <BottomBar onSideBarCollapse={this.toggle.bind(this)} collapsed={this.state.collapse} onActiveSettings={this.onCallSettings.bind(this)} settingsActived={this.state.settingsActive} />
            <Settings onSave={this.onSave.bind(this)}  settings={this.state.settings}  settingsActived={this.state.settingsActive} onClose={this.closeSettings.bind(this)}/>

            {/* <div visible={this.state.settings}>

                <Settings steps={Settings} onClose={this.closesettings.bind(this)} />

            </div> */}

        </div>
    }
}