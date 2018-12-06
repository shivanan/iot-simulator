import * as classNames from 'classnames';
import * as React from 'react';
import * as ReactSlider from 'react-slider';
import { IDevice } from '../device';
import { DeviceCardState } from '../device-card';
import { DeviceField, TopBootomArrow } from '../field';
import { string } from 'prop-types';

interface ILightSensorProps  {
    state:DeviceCardState;
    value:number;
    onIncrement:(by:number) => void;
    lightChange:(by:string) => void;
    sensorType: string;
    sensorName: string;
    sensorPict: string;
    sensorPictName: string;
    device:IDevice;
    active: boolean;
    onActiveChanged:() => void;
    tags?:string;
    toggleState:() => void;
    units: string;
    onDelete:() => void;
    transformValue?:(val:number) => string;
}

interface ILightSensorState {
   
}

export class LightSensorDevice extends React.Component<ILightSensorProps,{}> {  
    
    constructor(props:any) {
        super(props);
        this.state = {
                       
        };
      }

      handleChange = (value:any) => {
        this.setState({
          value,
        });
      }

   toggleActive() {
       this.props.onActiveChanged();
   }
    renderDelete() {
        return  <div className="delete" onClick={this.props.onDelete.bind(this)}></div>;

    }
    renderExpanded() {
        let url = `url(images/sensors/${this.props.sensorType}.svg`;
       
        let className = 'sensor-light-box'; 
        
      
        if(this.props.value == 50) {
            className += ' midmode';  
        }
        else if(this.props.value == 100) {
            className += ' fullmode';
        }
        else {
            className += ' lightoff';
        }

        console.log(className);
        
        return <div className='light-sensor'>
            <div className='title' style={{ backgroundImage: url }}>{this.props.sensorName}</div>
            {
                [this.renderDelete(),this.renderExpandCollapse()]
            }

            <div className='primary-value-box'>
                <div className={className}>
                        <div className='sensor-light'>
                            {this.props.sensorPictName}
                        </div>
                </div>
                 <DeviceField title='Sensor ID'>
                        {
                            this.props.device.id
                        }
                  </DeviceField>               
            </div>
            <div className='fields'>

                   <ReactSlider min={0} max={100} step={50} defaultValue={0}  onChange={this.props.lightChange.bind(this)}>    
                    <div className="slide_value">  
                            {            
                                this.props.value  
                            }    
                        </div>            
                    </ReactSlider>

                    <DeviceField title='Sensor Status'>
                        <div onClick={this.toggleActive.bind(this)} className={classNames('device-card-status', { 'online': this.props.active })}>
                            {
                                this.props.active ? 'Online' : 'Offline'
                            }
                        </div>
                    </DeviceField> 
               
            </div>
        </div>;
    }
   
    renderExpandCollapse()
    {
        return  <div className="expand-collapse" onClick={this.props.toggleState.bind(this)}></div>;
    }
    render() {
        
        console.log(this.props.value);

        if (this.props.state === DeviceCardState.expanded) {
            return this.renderExpanded();
        }
        
        let url = `url(images/sensors/${this.props.sensorType}.svg`;
       
        let className = 'sensor-light-box';       
        if(this.props.value == 50) {
            className += ' midmode';  
        }
        else if(this.props.value == 100) {
            className += ' fullmode';
        }
        else {
            className += ' lightoff';
        }

        console.log(className);
        
        return <div className='light-sensor'>
            <div className='title' style={{ backgroundImage: url }}>{this.props.sensorName}</div>

            <div className='primary-value-box'>

                <div className={className}>
                        <div className='sensor-light'>
                            {this.props.sensorPictName}
                        </div>
                </div>      
                
                <div className='sensor-top'>
                    <DeviceField title='Sensor ID'>
                        {
                            this.props.device.id
                        }
                    </DeviceField>                  
                </div>
            </div>

            <div className='fields'>

                  <ReactSlider min={0} max={100} step={50} defaultValue={0} onChange={this.props.lightChange.bind(this)}>  
                  <div className="slide_value">  
                        {            
                            this.props.value  
                        }    
                      </div>            
                </ReactSlider>

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

