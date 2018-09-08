import * as classNames from 'classnames';
import * as React from 'react';

export interface IDeviceFieldProps {
    title: string;
    curved?:boolean;
}
export interface IDeviceFieldState {
    
}
export class DeviceField extends React.Component<IDeviceFieldProps,IDeviceFieldState> {
    constructor(props:IDeviceFieldProps) {
        super(props);
        this.state = {}
    }
    render() {
        return <div className='device-field'>
            <div className='device-field-title'>{this.props.title}</div>
            <div className={classNames('device-field-value',{'curved':this.props.curved===true})}>
            {this.props.children}
            </div>
        </div>;
    }
}
export interface IIncrementDecrementProps {
    onChange:(val:number) => void;
}
export class IncrementDecrement extends React.Component<IIncrementDecrementProps,{}> {

    render() {
        return <div className='device-increment-decrement'>
            <div className='decrement ib'  onClick={ ()=>this.props.onChange(-1)} />
            <div className='increment ib'  onClick={ ()=>this.props.onChange(1) } />
        </div>;
    }
}

export interface ITopBootomArrowProps {
    onChange:(val:number) => void;
}
export class TopBootomArrow extends React.Component<ITopBootomArrowProps,{}> {

    render() {
        return <div className='device-top-bottom-arrow'>
            <div className='top_arrow ib'  onClick={()=>this.props.onChange} />
            <div className='bottom_arrow ib'  onClick={()=>this.props.onChange} />
        </div>;
    }
}