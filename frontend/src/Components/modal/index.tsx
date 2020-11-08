import React from 'react';
import { Container, ModalMain } from './styles';

// O children da tag vai para a variavel children.
interface ModalProps{
    onClose(): Promise<void>;
}
const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
return(
    <ModalMain>
    <Container>
        <button className='close' onClick={onClose}></button>
            {children}

    </Container>
    </ModalMain>
);

}


export default Modal;