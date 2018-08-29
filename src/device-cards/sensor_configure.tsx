import * as React from 'react';
import { DeviceCard, IDeviceCardState } from '../device-card';
import { registerDeviceCard } from '../iot-simulator';
import { Sensor } from '../sensor';
import { registerSensor } from '../sensor-manager';
import { TemperatureSensor } from '../sensors/temperature';
import { TemperatureDevice } from './temperature';

interface ITempState extends IDeviceCardState {
    value:number | string;
}
interface IAppState {
    shown: boolean;
}
export class Sensor_configure extends React.Component<{}, IAppState> {
	constructor(props: any) {
        super(props);
        
		this.state = {
			shown: true,
		};
	}	
	
	toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}
		
	render() {
		var shown = {
			display: this.state.shown ? "block" : "none"
		};
		
		var hidden = {
			display: this.state.shown ? "none" : "block"
		}
		
		return ( <> 
      
        <div className='temp' style={ shown }>
            <div className="device_card_icon"></div>
            <h4 className="device_card_title">Temperature Sensor</h4>
            <div className="configure-btn"><a onClick={this.toggle.bind(this)} href="#">Configure</a></div>
        </div>
        <div className='sensor' style={ hidden }>
            <div className="sensor-lft">
                <div className="device_card_icon"></div>
                <h4 className="device_card_title">Temperature Sensor</h4>
            </div>
            <div className="sensor-rht">
               <div className="sensor-rht-list"><label>Sensor ID</label><div className="configure-btn sensor_id-btn"><a href="#"><span>#00-012-abcd</span> </a></div></div> 
               <div className="sensor-rht-list"> <label>Tag</label><div className="configure-btn"><a href="#"><span>Temp..</span> </a></div></div>    
               <div className="sensor-rht-list"><label>Sensor Status</label><div className="configure-btn"><a href="#"><em className="on_off offline"></em> <span>Offline</span> </a></div></div>                               
            </div>  
            <div className="configure-settings" onClick={this.toggle.bind(this)}></div>
        </div>
      
        </>
		)
	}
}


