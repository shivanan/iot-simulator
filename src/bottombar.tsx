import * as React from 'react';
export interface IBottomBarProps {

    collapsed: boolean;
}
export interface IBottomBarState {
    
}

export class BottomBar extends React.Component<IBottomBarProps,IBottomBarState> {
    constructor(props:IBottomBarProps) {
        super(props);
       
    }
    render() {
        // return <div className='bottombar' />;
         return (
             <div className="bottombar" style={{left: this.props.collapsed ? '80px' : '277px'}}>
                 <div className="footer">			
                     <div className="footer_lft">				   
                         <div className="play-btn"><a href="#"></a></div>
                         <div className="play-duration"><span></span></div>
                         <div className="tick"><a href="#"></a></div>				  
                     </div>
                 </div> 
             </div>
           );
     }
}