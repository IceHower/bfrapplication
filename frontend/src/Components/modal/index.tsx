import React from 'react';
import { Container, Content, ModalMain } from './styles';
import { useHistory } from 'react-router-dom';

// O children da tag vai para a variavel children.

const Modal: React.FC = ({ children }) => {
const history = useHistory();
return(
    <ModalMain>
    <Container>
        <button className='close'></button>
        <Content>
            {children}
        </Content>
    </Container>
    </ModalMain>
);

}


export default Modal;