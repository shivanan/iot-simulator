import * as classNames from 'classnames';
import * as UUID from 'node-uuid';
import * as React from 'react';
import { IDevice } from './device';
// import { SideBarFilter } from './sidebar_filter';

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
    addDevice(type:string) {
        let id = UUID.v1().substring(0,8);
        let d:IDevice = {type,id};
        this.props.onAddDevice(d);
    }

    toggle() {
        this.props.onSideBarCollapse(!this.props.collapsed);
        // this.props.onScreenChanges(e);
    }
   
    render() {
        const sensors = [
            ['temperature','Temperature'],
            ['humidity','Humidity'],
            ['pressure','Pressure'],
        ];
      
        /* change to use props */
        return   <div className={classNames('sidebar',{'sidebar-collapsed':this.props.collapsed})} >           
            <div className="sensors-top">
				<h5 style={{display: this.props.collapsed ? 'none' : 'block'}} >Sensors</h5>               
				<div className="sensors-icon" onClick={this.toggle.bind(this)}  style={{position: this.props.collapsed ? 'absolute' : 'inherit', top: this.props.collapsed ? '46%' : '0'}}></div>
			</div> 
            <div className="sensors-search" style={{display: this.props.collapsed ? 'none' : 'block'}} >
                
                <ul className="sensors-search-list">
                {
                    sensors.map(v => <li 
                        style={{backgroundImage:`url(images/${v[0]}.svg)`}} 
                        onClick={this.addDevice.bind(this,v[0])}>{v[1]}
                            <span className="filter_add"/>
                        </li>)
                }
                </ul>
            </div>         

        </div>
     
        ;
    }
}