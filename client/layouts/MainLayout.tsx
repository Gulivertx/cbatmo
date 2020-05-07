import React from 'react';
import {Intent, Position, Toaster} from "@blueprintjs/core";
import { Flex } from 'reflexbox'

export const ContextMainLayout = React.createContext(undefined);
ContextMainLayout.displayName = 'MainLayout';

class MainLayout extends React.Component {
    private toaster: Toaster | undefined;

    private refHandlers = {
        toaster: (ref: Toaster) => (this.toaster = ref),
    };

    private addToast = (icon: any, msg: string, intent: Intent, timeout: number = 4000) => {
        // @ts-ignore
        this.toaster.show({icon: icon, message: msg, timeout: timeout, intent: intent});
    };

    public render() {
        return (
            <Flex flexWrap='wrap' style={{height: '100vh'}}>
                <ContextMainLayout.Provider
                    // @ts-ignore
                    value={{
                        addToast: this.addToast
                    }}
                >
                    {this.props.children}
                </ContextMainLayout.Provider>
                <Toaster autoFocus={false} usePortal={false} position={Position.TOP} ref={this.refHandlers.toaster} />
            </Flex>
        );
    }
}

export default MainLayout
