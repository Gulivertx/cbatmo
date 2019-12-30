import React from 'react';

interface IState {
    hasError: boolean
}

class ErrorBoundary extends React.Component {
    public state: IState = { hasError: false };

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.error(error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div className='text-center'>
                <p className='error'>Something went wrong !!!</p>
                <p>Please reload the app</p>
            </div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary
