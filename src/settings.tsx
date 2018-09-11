  import * as classNames from 'classnames';
  import * as React from 'react';
  //import { settings } from 'cluster';
  //import { BottomBar } from './bottombar';
  //import { Form, Text } from 'react-form';


export interface ISettingsProps {
    //onSideBarCollapse:(collapsed:boolean) => void;
    //collapsed: boolean;
    onActiveSettings:(settingsActived:boolean)=> void;
    settingsActived:boolean 
}
export interface ISettingsState {
    
}

export class Settings extends React.Component<ISettingsProps,ISettingsState> {
    constructor(props:ISettingsProps) {
        super(props);      
        this.state = {
           
        }
    }
    render() {  
      
 
         return (
             <div  className={classNames('settings',{'settingsShow':this.props.settingsActived})}>
                   <div className="settingsPanel">
                               
                 


                   </div>    
             </div>
           );
     }
}