import React, {CSSProperties, ReactFragment} from 'react';
import removeAccents from 'remove-accents';
import {Flex} from 'reflexbox';
import {Menu, MenuItem, Popover, Position} from "@blueprintjs/core";

import ModuleNetatmoNotReachable from '../components/ModuleNetatmoNotReachable';

import netatmoStationIcon from '../img/netatmo_station.svg';
import netatmoOutdoorIcon from '../img/netatmo_outdoor_module.svg';
import netatmoIndoorIcon from '../img/netatmo_indoor_module.svg';
import netatmoRainIcon from '../img/netatmo_rain_module.svg';
import netatmoWindIcon from '../img/netatmo_wind_module.svg';
import {IIndoorModuleNames} from "../models/NetatmoNAMain";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    label?: string
    reachable?: boolean
    last_seen?: number
    fill?: boolean
    vertical_divider?: boolean
    position?: 'fixed-bottom'
    icon?: 'station'|'outdoor'|'indoor'|'rain'|'wind'
    batteryLevel?: '10'|'30'|'50'|'70'|'90'|'charging'
    radioLevel?: '1'|'2'|'3'|'4'
    number_of_additional_modules?: number
    onChangeSelectedInsideModule?: (module: number) => void
    selected_indoor_module?: number
    indoor_module_names?: IIndoorModuleNames
}

const ModuleLayout: React.FunctionComponent<IPropsFromState> = (props) => {
    const styles = (fill?: boolean, position?: 'fixed-bottom'): CSSProperties => {
        if (position === 'fixed-bottom') {
            return {
                //position: 'fixed',
                //bottom: 0,
                //left: 0,
                //right: 0,
                //zIndex: 100,
                backgroundColor: '#181818'

            }
        }

        if (fill) {
            return {
                flex: 1
            }
        }

        return {}
    }

    const iconChooser = (icon: 'station'|'outdoor'|'indoor'|'rain'|'wind') => {
        switch (icon) {
            case "station":
                return netatmoStationIcon;
            case "outdoor":
                return netatmoOutdoorIcon;
            case 'indoor':
                return netatmoIndoorIcon;
            case 'rain':
                return netatmoRainIcon;
            case 'wind':
                return netatmoWindIcon;
        }
    }
    const indoorSwitchMenuItem = (): ReactFragment => {
        let a = [];
        if (props.indoor_module_names?.indoor) {
            a.push({
                text: removeAccents(props.indoor_module_names?.indoor || ''),
                active: props.selected_indoor_module === 0,
                index: 0
            });
        }
        if (props.indoor_module_names?.indoor_second) {
            a.push({
                text: removeAccents(props.indoor_module_names?.indoor_second || ''),
                active: props.selected_indoor_module === 1,
                index: 1
            });
        }
        if (props.indoor_module_names?.indoor_third) {
            a.push({
                text: removeAccents(props.indoor_module_names?.indoor_third || ''),
                active: props.selected_indoor_module === 2,
                index: 2
            });
        }

        return (
            <React.Fragment>
                {a.map(item => (
                    <MenuItem
                        text={item.text}
                        active={item.active}
                        onClick={() => props.onChangeSelectedInsideModule && props.onChangeSelectedInsideModule(item.index)}/>
                ))}
            </React.Fragment>
        );
    }

    const indoorSwitchMenu = () => {
        let c = indoorSwitchMenuItem();
        return (
            <Menu children={c}/>
        );
    }

    return (
        <div className="module-container" style={styles(props.fill, props.position)}>
            <div className="item-label">
                {
                    <Popover content={indoorSwitchMenu()} position={Position.BOTTOM} disabled={props.icon !== 'indoor'}
                             minimal={true}>
                        <div className="label">{removeAccents(props.label ? props.label : '')}</div>
                    </Popover>
                }
                <div className="horizontal-top-divider"/>

                {
                    props.icon ? (
                        <Flex className="status" flexDirection='row' alignItems='flex-end'>
                            {
                                props.icon !== 'station' ? (
                                    <span className={`mdi mdi-battery-${props.batteryLevel} icon`}/>
                                ) : null
                            }
                            <span className={`mdi mdi-wifi-strength-${props.radioLevel} icon`}/>
                            {/*// @ts-ignore */}
                            <img src={iconChooser(props.icon)} alt="Icon"
                                 style={{width: 16, height: 16, marginBottom: 1, marginTop: 1, paddingLeft: 2}}/>
                        </Flex>
                    ) : null
                }
            </div>
            {
                props.reachable ? (
                    props.children
                ) : (
                    <ModuleNetatmoNotReachable last_seen={props.last_seen}/>
                )
            }
            {
                props.vertical_divider && (
                    <div className="vertical-right-divider"/>
                )
            }
        </div>
    )
};

export default ModuleLayout;
