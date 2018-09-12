import * as classNames from 'classnames';
import * as React from 'react';

export interface ISettingsProps {   
    settingsActived:boolean ;
   //hideSettings:boolean;   
}
export interface ISettingsState {
    value:any;   
}

export class Settings extends React.Component<ISettingsProps,ISettingsState> {
    constructor(props:ISettingsProps) {           
        super(props);  
             
};
    
    render() { 
         return (
             <div  className={classNames('settingsDivPanel',{'settingsShow':this.props.settingsActived})} >
                   <div className="settingsPanel">

                           <h3>General Settings</h3> 
                            
                            <fieldset className="form-group">
                                <label>Send data:  </label>
                                <input type="text" className="form-control"  placeholder=" "  />                               
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Sec:  </label>
                                <input type="text" className="form-control" />                               
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Choose service type:  </label>
                                <select>
                                <option value="blue">MQIT</option>
                                <option value="red">Web Services</option>
                                <option value="purple">MQIT</option>
                                <option value="orange">MQIT</option>
                                </select>                               
                            </fieldset>

                            <fieldset className="form-group">
                                <label>User Name: </label>                               
                                <input type="text" className="form-control" />
                            </fieldset>
                            
                            <fieldset className="form-group">
                                <label>Password:  </label>
                                <input type="password" className="form-control" />                               
                            </fieldset>

                            <div className="settings-footer">
                                <button className="settings-save">Save</button>
                                <button className="settings-close">Close</button>
                            </div>

                   </div>    
             </div>
           );
     }
}
