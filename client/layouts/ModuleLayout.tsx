import React, {CSSProperties} from 'react';
import removeAccents from 'remove-accents';
import { Flex } from 'reflexbox';

import ModuleNetatmoNotReachable from '../components/ModuleNetatmoNotReachable';

import netatmoStationIcon from '../img/netatmo_station.svg';
import netatmoOutdoorIcon from '../img/netatmo_outdoor_module.svg';
import netatmoIndoorIcon from '../img/netatmo_indoor_module.svg';
import netatmoRainIcon from '../img/netatmo_rain_module.svg';
import netatmoWindIcon from '../img/netatmo_wind_module.svg';

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
                return  netatmoIndoorIcon;
            case 'rain':
                return netatmoRainIcon;
            case 'wind':
                return netatmoWindIcon;
        }
    }

    return (
        <div className="module-container" style={styles(props.fill, props.position)}>
            <div className="item-label">

                <div className="label">{removeAccents(props.label? props.label : '')}</div>
                <div className="horizontal-top-divider" />

                {
                    props.icon ? (
                        <Flex className="status" flexDirection='row' alignItems='flex-end'>
                            {
                                props.icon !== 'station' ? (
                                    <span className={`mdi mdi-battery-${props.batteryLevel} icon`} />
                                ) : null
                            }
                            <span className={`mdi mdi-wifi-strength-${props.radioLevel} icon`} />
                            {/*// @ts-ignore */}
                            <img src={iconChooser(props.icon)} alt="Icon" style={{width: 16, height: 16, marginBottom: 1, marginTop: 1, paddingLeft: 2}}/>
                        </Flex>
                    ) : null
                }
            </div>
            {
                props.reachable ? (
                    props.children
                ) : (
                    <ModuleNetatmoNotReachable last_seen={props.last_seen} />
                )
            }
            {
                props.vertical_divider && (
                    <div className="vertical-right-divider" />
                )
            }
        </div>
    )
};

export default ModuleLayout;
