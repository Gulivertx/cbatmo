import React from 'react';
import { Position, Toaster } from "@blueprintjs/core";

export const ContextMainLayout = React.createContext();
ContextMainLayout.displayName = 'MainLayout';

class MainLayout extends React.Component {
    setToasterRef = ref => {
        this.toaster = ref;
    };

    addToast = (icon, msg, intent, timeout = 4000) => {
        this.toaster.show({icon: icon, message: msg, timeout: timeout, intent: intent});
    };

    render() {
        return (
            <div className="main-layout">
                <ContextMainLayout.Provider
                    value={{
                        addToast: this.addToast
                    }}
                >
                    {this.props.children}
                </ContextMainLayout.Provider>
                <Toaster autoFocus={false} usePortal={false} position={Position.TOP} ref={this.setToasterRef} />
            </div>
        );
    }
}

export default MainLayout
