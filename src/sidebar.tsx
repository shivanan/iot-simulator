import * as UUID from 'node-uuid';
import * as React from 'react';
import { IDevice } from './device';

//import { SidebarCollapse } from './sidebar_collapse';


interface ISideBarProps {
    onAddDevice:(device:IDevice) => void;
}

interface ISideBarState {
    collapse: boolean;
}

export class SideBar extends React.Component<ISideBarProps,ISideBarState> {
    constructor(props:ISideBarProps) {     
        super(props);
       
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
          };
    }
    addDevice(d:IDevice) {
        this.props.onAddDevice(d);
    }

   
   

    toggle() {
        this.setState({ collapse: !this.state.collapse });
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
        
        let u = UUID.v1().substring(0,8);

        return   <div className='sidebar' style={{width: this.state.collapse ? '80px' : '300px'}} >
            <div onClick={this.addDevice.bind(this,{'id':u,type:'temperature'})} style={{display: this.state.collapse ? 'none' : 'block'}} >Temp</div>
            <div className="sensors-top">
				<h5 style={{display: this.state.collapse ? 'none' : 'block'}}>Sensors</h5>               
				<div className="sensors-icon" onClick={this.toggle}  style={{position: this.state.collapse ? 'absolute' : 'inherit', top: this.state.collapse ? '46%' : '0'}}></div>
			</div> 
            <div className="sensors-search" style={{display: this.state.collapse ? 'none' : 'block'}} >
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

            <div id="mount-point" style={{display: this.state.collapse ? 'none' : 'block'}} >
                <div className="sensors-recent">
                    <h6>Recent</h6>
                    <ul>{sensors_recent_list}</ul>
                </div>
            </div>
        </div>
     
        ;
    }
}