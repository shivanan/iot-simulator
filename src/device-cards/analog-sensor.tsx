import * as classNames from 'classnames';
import * as React from 'react';
import { IDevice } from '../device';
import { DeviceCardState } from '../device-card';
import { DeviceField, IncrementDecrement, TopBootomArrow } from '../field';


interface IAnalogSensorProps  {
    state:DeviceCardState;
    value:number;
    onIncrement:(by:number) => void;
    sensorType: string;
    sensorName: string;
    device:IDevice;
    active: boolean;
    onActiveChanged:() => void;
    tags?:string;
    toggleState:() => void;
    units: string;
    onDelete:() => void;
    transformValue?:(val:number) => string;
}

export class AnalogSensorDevice extends React.Component<IAnalogSensorProps,{}> {
    
   
   toggleActive() {
       this.props.onActiveChanged();
   }
    renderDelete() {
        return  <div className="delete" onClick={this.props.onDelete.bind(this)}></div>;

    }
    renderExpanded() {
        let url = `url(images/sensors/${this.props.sensorType}.svg`;
        
        return <div className='analog-sensor'>
            <div className='title' style={{ backgroundImage: url }}>
               <span className="analog-sensor-title">{this.props.sensorName}</span>
            </div>
            {
                [this.renderDelete(),this.renderExpandCollapse()]
            }

            <div className='primary-value-box'>
                <DeviceField title={this.props.sensorName}>
                    {
                        this.props.transformValue?this.props.transformValue(this.props.value):
                        Number(this.props.value).toFixed(2) + this.props.units
                    }
                </DeviceField>
                <IncrementDecrement onChange={this.props.onIncrement.bind(this)} />
               
            </div>
            <div className='fields'>
             
                    <DeviceField title='Sensor ID'>
                        {
                            this.props.device.id
                        }
                    </DeviceField>
                    
                                                    
          
                    <DeviceField title='Sensor Status'>
                        <div onClick={this.toggleActive.bind(this)} className={classNames('device-card-status', { 'online': this.props.active })}>
                            {
                                this.props.active ? 'Online' : 'Offline'
                            }
                        </div>
                    </DeviceField> 
                 
               
            </div>

               <div className='device-topic'>
                 <div className='publishing-topic'><label>Publishing Topic : </label>/iot-simulator/out/{this.props.device.id}/value</div>
                 <div className='receiving-topic'><label>Receiving Topic : </label>/iot-simulator/in/{this.props.device.id}/value</div>
            </div>
            
        </div>;
    }
   
    renderExpandCollapse()
    {
        return  <div className="expand-collapse" onClick={this.props.toggleState.bind(this)}></div>;
    }
    render() {
        if (this.props.state === DeviceCardState.expanded) {
            return this.renderExpanded();

        }
        let url = `url(images/sensors/${this.props.sensorType}.svg`;
        
        return <div className='analog-sensor'>
            <div className='title' style={{ backgroundImage: url }}>{this.props.sensorName}</div>
            <div className='primary-value-box'>
                <DeviceField title={'Value'}>
                    {
                        this.props.transformValue?this.props.transformValue(this.props.value):
                        Number(this.props.value).toFixed(2) + this.props.units
                    }
                </DeviceField>
                <IncrementDecrement onChange={this.props.onIncrement.bind(this)} />
            </div>

            <div className='fields'>
                <div className='sensor-top'>
                    <DeviceField title='Sensor ID'>
                        {
                            this.props.device.id
                        }
                    </DeviceField>
                   
                                                    
                </div>
                
                <div className='sensor-bot'>
                    <DeviceField title='Sensor Status'>
                        <div onClick={this.toggleActive.bind(this)} className={classNames('device-card-status', { 'online': this.props.active })}>
                            {
                                this.props.active ? 'Online' : 'Offline'
                            }
                        </div>
                    </DeviceField> 
             
                </div>
            </div>
            <div className="expand-collapsearrow">
                   {
                       this.renderExpandCollapse()
                   }
                    <TopBootomArrow onChange={this.props.onIncrement.bind(this)} />            
            </div>


        </div>;
    }
   
}

