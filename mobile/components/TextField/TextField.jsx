import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

const TextInputLocal = ({ secureTextEntry, iconRight, iconLeft, style, mode, label, value, onChangeText, disabled, multiline, numberOfLines }) => {
    return <TextInput
                label={label}
                mode={mode}
                value={value}
                onChangeText={onChangeText}
                disabled={disabled}
                multiline={multiline}
                numberOfLines={numberOfLines}
                style={style}
                secureTextEntry={secureTextEntry}
                left={iconLeft ? <TextInput.Icon icon={iconLeft} /> : null}
                right={iconRight ? <TextInput.Icon icon={iconRight} /> : null}
            />;
}

TextInputLocal.defaultProps = {
    mode: "outlined",
    label: "",
    value: null,
    onChangeText: () => console.log(""),
    disabled: false,
    multiline: false,
    numberOfLines: 5,
    style: {},
    iconLeft: null,
    iconRight: null,
    secureTextEntry: false,
}

TextInputLocal.prototype = {   
    mode: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    style: PropTypes.object,
    iconLeft: PropTypes.string,
    iconRight: PropTypes.string,
    secureTextEntry: PropTypes.bool,
}

export default TextInputLocal;