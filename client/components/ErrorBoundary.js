import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.debug(error, info);
    }

    render() {
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
