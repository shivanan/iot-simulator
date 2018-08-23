import * as React from 'react';
export interface IBottomBarProps {
    
}
export interface IBottomBarState {
    
}
export class BottomBar extends React.Component<IBottomBarProps,IBottomBarState> {
    constructor(props:IBottomBarProps) {
        super(props);
        this.state = {}
    }
    render() {
        // return <div className='bottombar' />;
         return (
             <div className="bottombar">
                 <div className="footer">			
                     <div className="footer_lft">				   
                         <div className="play-btn"><a href="#"><img src="images/play-btn.svg" /></a></div>
                         <div className="play-duration"><span></span></div>
                         <div className="tick"><a href="#"><img src="images/Tick.svg"/></a></div>				  
                     </div>
                 </div> 
             </div>
           );
     }
}