import React from 'react';
import KeyboardedInput from 'react-touch-screen-keyboard';

class VirtualKeyboardInput extends React.Component {
    render() {
        const keyLayout = [
            ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'è'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'é', '$'],
            ['y', 'x', 'c', 'v', 'b', 'n', 'm']
        ];

        return (
            <KeyboardedInput
                enabled
                type={this.props.type}
                onChange={this.props.onChange}
                value={this.props.value}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                name={this.props.name}
                inputClassName={this.props.className}
                placeholder={this.props.placeholder}
                defaultKeyboard={keyLayout}
                isFirstLetterUppercase={this.props.isFirstLetterUppercase} // optional, default is `false`
                isDraggable={false} // optional, default is `true`
                readOnly={this.props.readOnly} // optional
                opacity={1} // optional
            />
        );
    }
}
export default VirtualKeyboardInput;