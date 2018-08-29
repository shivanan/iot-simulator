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
        const numbers = ["T1.BLDG01.FL23", "T1.BLDG01.FL23", "T2.BLDG01.FL23", "T2.BLDG01.FL23"];        
        const listItems = numbers.map((numbers) =>
        <li>{numbers}</li>
        ); 
        
       // var sensors_recent = ["T1.BLDG01.FL23", "T1.BLDG01.FL23", "T2.BLDG01.FL23", "T2.BLDG01.FL23"]; 
        
        var sensors_recent = [ <a href="#" className="temperature"></a>, <a href="#" className="humidity"></a>, <a href="#" className="pressure"></a> ]; 
        var sensors_recent_list = sensors_recent.map((sensors_recent) =>
        <li>{sensors_recent}</li>
        ); 
        
        

        return <div className='sidebar' >
            <div onClick={this.addDevice.bind(this,{'id':new Date()+'',type:'temperature'})}>Temp</div>
            <div className="sensors-top">
				<h5>Sensors</h5>
				<div className="sensors-icon"></div>
			</div>
            <div className="sensors-search">
                <input type="text" placeholder="Start Typing" id="myInput" />
                <div className="search-chkbox-cont">
						<div className="search-chkbox">
							<input type="checkbox" />
							<span className="checkmark"></span>
                            <p>Hit enter to add</p>
						</div>						
					</div>
                <ul className="sensors-search-list">{listItems}</ul>
            </div>

            

            <div id="mount-point">
                <div className="sensors-recent">
                    <h6>Recent</h6>
                    <ul>{sensors_recent_list}</ul>
                </div>
            </div>
        </div>;
    }
}