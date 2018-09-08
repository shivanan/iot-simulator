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
        return <div className='bottombar' />;
     }
}