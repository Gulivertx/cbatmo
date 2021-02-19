import React, {CSSProperties, Fragment, ReactFragment} from 'react';
import removeAccents from 'remove-accents';
import {Flex} from 'reflexbox';
import {IMenuItemProps, Menu, MenuItem, Popover, Position} from "@blueprintjs/core";

import ModuleNetatmoNotReachable from '../components/ModuleNetatmoNotReachable/ModuleNetatmoNotReachable';

import netatmoStationIcon from '../img/netatmo_station.svg';
import netatmoOutdoorIcon from '../img/netatmo_outdoor_module.svg';
import netatmoIndoorIcon from '../img/netatmo_indoor_module.svg';
import netatmoRainIcon from '../img/netatmo_rain_module.svg';
import netatmoWindIcon from '../img/netatmo_wind_module.svg';
import wifiSignal1 from '../img/wifi_1.svg';
import wifiSignal2 from '../img/wifi_2.svg';
import wifiSignal3 from '../img/wifi_3.svg';
import wifiSignal4 from '../img/wifi_4.svg';
import radioSignal1 from '../img/signal_1.svg';
import radioSignal2 from '../img/signal_2.svg';
import radioSignal3 from '../img/signal_3.svg';
import radioSignal4 from '../img/signal_4.svg';
import radioSignal5 from '../img/signal_5.svg';
import batteryVeryLow from '../img/battery_very-low.svg';
import batteryLow from '../img/battery_low.svg';
import batteryMedium from '../img/battery_medium.svg';
import batteryHigh from '../img/battery_high.svg';
import batteryFull from '../img/battery_full.svg';
import batteryMax from '../img/battery_max.svg';
import {battery_level, radio_level, wifi_level} from "../apis/netatmo/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    label?: string
    reachable?: boolean
    last_seen?: number
    fill?: boolean
    vertical_divider?: boolean
    position?: 'fixed-bottom'
    icon?: 'station'|'outdoor'|'indoor'|'rain'|'wind'
    batteryLevel?: battery_level
    radioLevel?: radio_level
    number_of_additional_modules?: number
    onChangeSelectedInsideModule?: (module: number) => void
    selected_indoor_module?: number
    indoor_module_names?: string[]
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

    const moduleIconChooser = (icon: 'station'|'outdoor'|'indoor'|'rain'|'wind') => {
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

    const wifiIconChooser = (level: wifi_level) => {
        switch (level) {
            case "low":
                return wifiSignal1;
            case "medium":
                return wifiSignal2;
            case 'high':
                return wifiSignal3;
            case 'full':
                return wifiSignal4;
        }
    }

    const radioIconChooser = (level: radio_level) => {
        switch (level) {
            case "low":
                return radioSignal1;
            case "medium":
                return radioSignal2;
            case 'high':
                return radioSignal3;
            case 'full':
                return radioSignal4;
            case 'max':
                return radioSignal5;
        }
    }

    const batteryIconChooser = (level: battery_level) => {
        switch (level) {
            case "very-low":
                return batteryVeryLow;
            case "low":
                return batteryLow;
            case 'medium':
                return batteryMedium;
            case 'high':
                return batteryHigh;
            case 'full':
                return batteryFull;
            case "max":
                return batteryMax;
        }
    }

    const indoorSwitchMenuItem = (): ReactFragment => {
        const menuItems: IMenuItemProps[] = [];

        props.indoor_module_names?.map((name, index) => {
            menuItems.push({
                text: removeAccents(name),
                active: props.selected_indoor_module === index,
                onClick: () => props.onChangeSelectedInsideModule && props.onChangeSelectedInsideModule(index)
            });
        });

        return (
            <React.Fragment>
                {
                    menuItems.map(item => (
                    <MenuItem
                        {...item}
                        key={item.text as string}
                    />
                    ))
                }
            </React.Fragment>
        );
    }

    const indoorSwitchMenu = (): JSX.Element => {
        const children = indoorSwitchMenuItem();
        return (
            <Menu children={children}/>
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
                                    <Fragment>
                                        <img src={batteryIconChooser(props.batteryLevel as battery_level)} alt="Battery icon"
                                             style={{width: 18, height: 18, marginBottom: 0, marginTop: 0, paddingLeft: 0}}/>
                                        <img src={radioIconChooser(props.radioLevel as radio_level)} alt="Radio icon"
                                             style={{width: 18, height: 18, marginBottom: 0, marginTop: 0, paddingLeft: 0}}/>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <img src={wifiIconChooser(props.radioLevel as wifi_level)} alt="Wifi icon"
                                             style={{width: 18, height: 18, marginBottom: 0, marginTop: 0, paddingLeft: 0}}/>
                                    </Fragment>
                                )
                            }
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
