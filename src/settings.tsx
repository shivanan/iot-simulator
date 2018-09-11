import * as React from 'react';
import { settings } from 'cluster';
import { BottomBar } from './bottombar';


export interface ISettingsProps {
    collapsed: boolean;
    toggleState:() => void;
    value:number | string;
    active:boolean;
}
export interface ISettingsState {
    
}


export class Settings extends React.Component<ISettingsProps,ISettingsState> {
    constructor(props : any) {
      super(props);
     
    }
  

    render() {
      return (
          //   return <div className="settings" state={this.props.state} toggleState={this.toggleState.bind(this)}></div> ;
          <div className="settings">

                <form>
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                    </form>
                </div>
      );
    }
  }