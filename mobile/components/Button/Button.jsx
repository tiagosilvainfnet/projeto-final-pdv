import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const ButtonLocal = ({ style, mode, onPress, label, icon, disabled, value }) => {
    return <Button 
    disabled={disabled}
    icon={icon} 
    mode={mode}
    style={style}
    value={value}
    onPress={onPress}>
    {label}
</Button>
    
}

ButtonLocal.defaultProps = {
    mode: "contained",
    label: "",
    onPress: null,
    icon: null,
    style: {},
    disabled: false,
    value: null,
}

ButtonLocal.prototype = {   
    mode: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
    icon: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    value: PropTypes.any,
}

export default ButtonLocal;