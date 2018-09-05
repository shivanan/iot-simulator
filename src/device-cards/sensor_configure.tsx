import * as React from 'react';
import { IDeviceCardState } from '../device-card';

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
      
       {}
      
        </>
		)
	}
}


