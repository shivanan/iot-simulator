import * as classNames from 'classnames';
import * as React from 'react';
import { IIotSimulatorSettings } from "./iot-simulator-settings";

export interface ISettingsProps {
    settingsActived: boolean;
    settings:IIotSimulatorSettings;
    onSave:(settings:IIotSimulatorSettings) => void;
    onClose:() => void;
}
export interface ISettingsState {
    settings:IIotSimulatorSettings;
}

export class Settings extends React.Component<ISettingsProps, ISettingsState> {
    constructor(props: ISettingsProps) {
        super(props);
        this.state = {settings:props.settings};
    };

    
    changeSetting(key:keyof IIotSimulatorSettings,e:any) {
        let v = e.target.value;
        let settings = {...this.state.settings};
        settings[key] = v;
        this.setState({settings});
    }
    onSave() {
        this.props.onSave(this.state.settings);
    }
    render() {
        return (
            <div className={classNames('settingsDivPanel', { 'settingsShow': this.props.settingsActived })} >
                <div className="settingsPanel">

                    <h3>General Settings</h3>

                    <fieldset className="form-group">
                        <label>MQTT Server:</label>
                        <input type="text" value={this.state.settings.host} onChange={this.changeSetting.bind(this,'host')}  className="form-control" placeholder=" " />
                    </fieldset>

                    <fieldset className="form-group">
                        <label>User Name</label>
                        <input type="text" value={this.state.settings.user} onChange={this.changeSetting.bind(this,'user')}   className="form-control" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password</label>
                        <input type="text" value={this.state.settings.password} onChange={this.changeSetting.bind(this,'password')}   className="form-control" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Topic Prefix</label>
                        <input type="text" value={this.state.settings.topicPrefix} onChange={this.changeSetting.bind(this,'topicPrefix')}   className="form-control" />
                    </fieldset>
                    <div className="settings-footer">
                        <button onClick={this.onSave.bind(this)} className="settings-save">Save</button>
                        <button onClick={this.props.onClose.bind(this)} className="settings-close">Close</button>
                    </div>

                </div>
            </div>
        );
    }
}
