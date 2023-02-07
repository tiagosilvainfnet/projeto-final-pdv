import Cupom from "../components/Cupom/Cupom";

const CupomItem = ({
    route
}) => {
    const cupom = route.params;

    return <Cupom cupom={cupom}/>
}


export default CupomItem;