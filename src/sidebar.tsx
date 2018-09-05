import * as UUID from 'node-uuid';
import * as React from 'react';
import { IDevice } from './device';

//import { SidebarCollapse } from './sidebar_collapse';


interface ISideBarProps {
    onAddDevice:(device:IDevice) => void;
    /* change this to something simple */
    //onScreenChanges:(screenchange:ScreenChange)=> void;
    onSideBarCollapse:(collapsed:boolean) => void;
    collapsed: boolean;
}

interface ISideBarState {
    /* not required in state - let it belong to the master iot device state
    since we need to use it in 2 places - sidebar annd staging */
    //collapse: boolean;
}

export class SideBar extends React.Component<ISideBarProps,ISideBarState> {
    constructor(props:ISideBarProps) {     
        super(props);
       
    }
    addDevice(d:IDevice) {
        this.props.onAddDevice(d);
    }

    toggle() {
        this.props.onSideBarCollapse(!this.props.collapsed);
        // this.props.onScreenChanges(e);
    }
   

    render() {
        const numbers = ["T1.BLDG01.FL23", "T1.BLDG01.FL23", "T2.BLDG01.FL23", "T2.BLDG01.FL23"];        
        const listItems = numbers.map((numbers) =>
        <li>{numbers}</li>
        ); 
        
       // var sensors_recent = ["T1.BLDG01.FL23", "T1.BLDG01.FL23", "T2.BLDG01.FL23", "T2.BLDG01.FL23"]; 
        let u = UUID.v1().substring(0,8);

        var sensors_recent = [ <a onClick={this.addDevice.bind(this,{'id':u,type:'temperature'})} style={{display: this.props.collapsed ? 'none' : 'block'}} className="temperature"><span>Temperature</span></a>, 
        <a onClick={this.addDevice.bind(this,{'id':u,type:'humidity'})} style={{display: this.props.collapsed ? 'none' : 'block'}} className="humidity"><span>Humidity</span></a>, 
        <a onClick={this.addDevice.bind(this,{'id':u,type:'pressure'})} style={{display: this.props.collapsed ? 'none' : 'block'}} className="pressure"><span>Pressure</span></a> ]; 
        var sensors_recent_list = sensors_recent.map((sensors_recent) =>
        <li>{sensors_recent}</li>
        ); 
        

        /* change to use props */
        return   <div className='sidebar' style={{width: this.props.collapsed ? '80px' : '300px'}} >           
            <div className="sensors-top">
				<h5 style={{display: this.props.collapsed ? 'none' : 'block'}} >Sensors</h5>               
				<div className="sensors-icon" onClick={this.toggle.bind(this)}  style={{position: this.props.collapsed ? 'absolute' : 'inherit', top: this.props.collapsed ? '46%' : '0'}}></div>
			</div> 
            <div className="sensors-search" style={{display: this.props.collapsed ? 'none' : 'block'}} >
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

            <div id="mount-point" style={{display: this.props.collapsed ? 'none' : 'block'}} >
                <div className="sensors-recent">
                    <h6>Recent</h6>
                    <ul>{sensors_recent_list}</ul>
                </div>
            </div>
        </div>
     
        ;
    }
}