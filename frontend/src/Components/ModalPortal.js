import React, {useMemo} from "react";
import ReactDOM from "react-dom";


/**
 * 
 * @param {elementId} : modal이 렌더링될 부모 노드 ex) 'modal-portal' 
 */
const ModalPortal = ({children, elementId}) => {
    const el = useMemo(() => document.getElementById(elementId),[
        elementId,
    ])
    return ReactDOM.createPortal(children,el);
}

export default ModalPortal;