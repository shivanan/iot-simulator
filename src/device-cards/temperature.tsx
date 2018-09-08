import * as classNames from 'classnames';
import * as React from 'react';
import { DeviceCard, DeviceCardState, IDeviceCardState } from '../device-card';
import { IExpandDevice } from '../expand-device';
import { DeviceField, IncrementDecrement, TopBootomArrow } from '../field';
import { registerDeviceCard } from '../iot-simulator';
import { Sensor } from '../sensor';
import { registerSensor } from '../sensor-manager';
import { TemperatureSensor } from '../sensors/temperature';

interface ITempState extends IDeviceCardState {
    value:number | string;
    active:boolean;
    //onAddDevice:(device:IExpandDevice) => void;
    
}
interface ITempProps {
    //onAddDevice:(device:IExpandDevice) => void;
   
}

export class TemperatureDevice extends DeviceCard<ITempState> {
    sensor:Sensor = null;

    toggleStatus() {
        this.setState({active:!this.state.active},()=>{
            this.sensor.active = this.state.active;
        });
    }
    toggleBtnStatus() {
        this.setState({active:!this.state.active},()=>{
            this.sensor.active = this.state.active;
        });
    }
    
    addDevice(d:IExpandDevice) {
        //this.state.onAddDevice(d);
    }
    constructor(props:any) {
        super(props);
        this.state = {value:25,active:true};
        this.sensor = new TemperatureSensor(this.props.device.id+':temp',this.state.value);
        this.sensor.active = this.state.active;
        registerSensor(this.sensor,()=>{
            this.setState({value:this.sensor.computeValue()});
        });
        
    }
    onIncrement(val:number) {
        let newVal = Number(this.sensor.value) + val;
        this.sensor.forceValue(newVal);

        /* temporarily set next value until next sensor update */
        this.setState({value:newVal});
    }
    
    renderExpanded() {
        let url = `url(images/sensors/temperature.svg`;
        
        return <div className='temperature'>
            <div className='title' style={{ backgroundImage: url }}>Temperature Sensor</div>
            {
                this.renderExpandCollapse()
            }
            <div className='primary-value-box'>
                <DeviceField title='Temperature'>
                    {
                        Number(this.state.value).toFixed(2) + 'C'
                    }
                </DeviceField>
                <IncrementDecrement onChange={this.onIncrement.bind(this)} />
            </div>
            <div className='fields'>
             
                    <DeviceField title='Sensor ID'>
                        {
                            this.props.device.id
                        }
                    </DeviceField>
                    <DeviceField title='On/Off' curved={true}>
                        <div onClick={this.toggleBtnStatus.bind(this)} className={classNames('on-off-status', { 'on': this.state.active })}>
                            {
                                this.state.active ? 'ON' : 'OFF'
                            }
                        </div>
                    </DeviceField>      
                                                    
          
                    <DeviceField title='Sensor Status'>
                        <div onClick={this.toggleStatus.bind(this)} className={classNames('device-card-status', { 'online': this.state.active })}>
                            {
                                this.state.active ? 'Online' : 'Offline'
                            }
                        </div>
                    </DeviceField> 
                    <DeviceField title='Tag'>
                            {
                                <div>Temp...</div>
                            }
                    </DeviceField>
               
            </div>
        </div>;
    }
    toggleState() {
        let state = this.props.state;
        let newState = state === DeviceCardState.expanded?DeviceCardState.normal:DeviceCardState.expanded;
        this.props.onStateChange(newState);
    }
    renderExpandCollapse()
    {
        return  <div className="expand-collapse" onClick={this.toggleState.bind(this)}></div>;
    }
    render() {
        if (this.props.state === DeviceCardState.expanded) {
            return this.renderExpanded();

        }
        let url = `url(images/sensors/temperature.svg`;
        
        return <div className='temperature'>
            <div className='title' style={{ backgroundImage: url }}>Temperature Sensor</div>
            <div className='primary-value-box'>
                <DeviceField title='Temperature'>
                    {
                        Number(this.state.value).toFixed(2) + 'C'
                    }
                </DeviceField>
                <IncrementDecrement onChange={this.onIncrement.bind(this)} />
            </div>

            <div className='fields'>
                <div className='sensor-top'>
                    <DeviceField title='Sensor ID'>
                        {
                            this.props.device.id
                        }
                    </DeviceField>
                    <DeviceField title='On/Off'  curved={true}>
                        <div onClick={this.toggleBtnStatus.bind(this)} className={classNames('on-off-status', { 'on': this.state.active })}>
                            {
                                this.state.active ? 'ON' : 'OFF'
                            }
                        </div>
                    </DeviceField>      
                                                    
                </div>
                
                <div className='sensor-bot'>
                    <DeviceField title='Sensor Status'>
                        <div onClick={this.toggleStatus.bind(this)} className={classNames('device-card-status', { 'online': this.state.active })}>
                            {
                                this.state.active ? 'Online' : 'Offline'
                            }
                        </div>
                    </DeviceField> 
                    <DeviceField title='Tag'>
                            {
                                <div>Temp...</div>
                            }
                    </DeviceField>
                </div>
            </div>
            <div className="expand-collapsearrow">
                   {
                       this.renderExpandCollapse()
                   }
                    <TopBootomArrow onChange={this.onIncrement.bind(this)} />            
            </div>


        </div>;
    }
   
}

registerDeviceCard('temperature',(props) => <TemperatureDevice {...props} />);