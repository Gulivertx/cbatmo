import React, {CSSProperties} from 'react';
import removeAccents from 'remove-accents';

import ModuleNetatmoNotReachable from '../components/ModuleNetatmoNotReachable';

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    label?: string
    reachable?: boolean
    last_seen?: number
    fill?: boolean
    vertical_divider?: boolean
    position?: 'fixed-bottom'
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

    return (
        <div className="module-container" style={styles(props.fill, props.position)}>
            <div className="item-label">
                <div className="label">{removeAccents(props.label? props.label : '')}</div>
                <div className="horizontal-top-divider" />
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
