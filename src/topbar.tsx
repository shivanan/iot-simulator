import * as React from 'react';
export interface ITopBarProps {
    
}
export interface ITopBarState {
    
}
export class TopBar extends React.Component<ITopBarProps,ITopBarState> {
    constructor(props:ITopBarProps) {
        super(props);
        this.state = {}
    }
    render() {
        // return <div className='topbar' />;
 
         return (
             <div className="topbar">
               <div className="iot_header">               
                  <div className="logo"><img src="images/logo.svg" alt="logo" /></div>
                  <div className="header_m-logo"><img src="images/M_logo.svg" /></div>
               </div>             
             </div>
           );
     }
}