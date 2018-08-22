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
        return <div className='bottombar' />;
    }
}