import * as classNames from 'classnames';
import * as React from 'react';
import { settings } from 'cluster';
import { Settings } from './settings';
//import { createDeviceCard } from './iot-simulator';

export interface IBottomBarProps {
    /* change this to something simple */
    //onScreenChanges:(screenchange:ScreenChange)=> void;
    onSideBarCollapse:(collapsed:boolean) => void;
    collapsed: boolean;
}
export interface IBottomBarState {
    
}

export class BottomBar extends React.Component<IBottomBarProps,IBottomBarState> {
  

    constructor(props:IBottomBarProps) {
        super(props);
       
    }
    toggle() {
        this.props.onSideBarCollapse(!this.props.collapsed);
        // this.props.onScreenChanges(e);
    }
   

    render() {
        
        return  <div className={classNames('bottombar',{'sidebar-collapsed':this.props.collapsed})} >       
            <div className='sensors-nav'/> 
          
            <div className={classNames('settings-icon ' + ('has-devices'))}/>
        </div>;
     }
}