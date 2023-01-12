import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

const ButtonLocal = ({ style, mode, onPress, label, icon }) => {
    return <Button 
                icon={icon} 
                mode={mode}
                style={style}
                onPress={onPress}>
                {label}
            </Button>;
}

ButtonLocal.defaultProps = {
    mode: "contained",
    label: "",
    onPress: () => console.log(""),
    icon: null,
    style: {}
}

ButtonLocal.prototype = {   
    mode: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
    icon: PropTypes.string,
    style: PropTypes.object,
}

export default ButtonLocal;