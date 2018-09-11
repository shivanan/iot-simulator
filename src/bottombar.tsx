import * as classNames from 'classnames';
import * as React from 'react';
import { settings } from 'cluster';
import { Settings } from './settings';


export interface IBottomBarProps {
    
    onSideBarCollapse:(collapsed:boolean) => void;
    collapsed: boolean;
    onActiveSettings:(settingsActived:boolean)=> void;
    settingsActived:boolean 

    
}
export interface IBottomBarState {
   
}

export class BottomBar extends React.Component<IBottomBarProps,IBottomBarState> {
    constructor(props:IBottomBarProps) {
        super(props);
        this.state = {           
            collapse: false,
            expandedDevice:null,
            settingsActive:false,
          };
       
    }
    toggle() {
        this.props.onSideBarCollapse(!this.props.collapsed);
        // this.props.onScreenChanges(e);
    }
    onCallSettings(){
        this.props.onActiveSettings(!this.props.settingsActived);
    }

    render() {
        
        return  <div className={classNames('bottombar',{'sidebar-collapsed':this.props.collapsed})} >       
            <div className='sensors-nav' style={{display: this.props.settingsActived ? 'none' : 'block'}}/> 
          
            <div onClick={this.onCallSettings.bind(this)} className="settings-icon"/>
        </div>;
     }
}