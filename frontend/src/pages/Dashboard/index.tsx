import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiPower, FiPlusCircle, FiTrash2, FiArrowUp, FiArrowDown, FiPlusSquare, FiArrowRight } from 'react-icons/fi';
import { Container, Header, HeaderContent, Profile, Body, EventList, ModalItens } from './styles';
import { useHistory } from 'react-router-dom';
import Modal from '../../Components/modal';
import Button from '../../Components/button';
import Input from '../../Components/input';
import { Form } from  '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import {useAuth} from '../../hooks/AuthContext';
import * as Yup from 'yup';



const Dashboard: React.FC = () => {

    const history = useHistory();
    const formRef = useRef<FormHandles>(null);
    const [showModal, setShowModal] = useState(false);
    const [today, setToday] = useState('');
    const [date, setDate] = useState('');
    const [lista, setLista] = useState([{}]);
    const { user } = useAuth();
    
    


    async function loadLista() {
        const response = api.get(`/list/${user}`);
        console.log(user);
        setLista([...lista, response]);
    }

    useEffect(() => {
        const date = new Date().toISOString().substr(0,10);
        setToday(date);

    }, []);

    useEffect(() => {
        loadLista();
    }, []);



    const handleAddEvent = useCallback(async (data: null) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome da lista obrigatório'),
                data: Yup.string().required('Data obrigatória'),
                type: Yup.string().required('Tipo da lista obrigatório'),
                candle: Yup.string().required('Candle obrigatório'),
                gale: Yup.string().required('Gale obrigatório'),
                delay: Yup.string().required('Delay obrigatório'),
                stopl: Yup.string().required('Stop lose obrigatório'),
                stopw: Yup.string().required('Stop win obrigatório'),
                list: Yup.string().required('Lista obrigatório'),
                observation: Yup.string(),
            })
            await schema.validate(data, {
                abortEarly: false,
            });
            await api.post('/list', data)
            console.log(data);
            setShowModal(false);

        } catch(err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, []);
    return(
        <Container>
            <Header>
                <HeaderContent>
                    <Profile>
                        <img src="https://avatars0.githubusercontent.com/u/5678023?s=400&u=dfdc2b3c239f20f288f063357aa497911bad9ade&v=4" alt="Vinicius"></img>
                        <div>
                            <span>Bem Vindo, </span>
                            <strong>Vinicius</strong>
                        </div>
                    </Profile>
                    <button type="button" onClick={() => history.push('/')}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Body>
                <strong>LISTAS</strong>
                <button type="button" onClick={() => setShowModal(true)}>
                    <FiPlusCircle size={32}/>
                </button>
            </Body>
            {showModal && 
            <Modal onClose={async () => setShowModal(false)}>
                <ModalItens>
                    <Form ref={formRef} onSubmit={handleAddEvent}>
                        <h1> Nova Lista </h1>
                            <div>
                                <Input name='name' placeholder='Nome da Lista'/>
                                <Input name='data' type='date' placeholder='Data' value={today}/>
                                <Input name='type' placeholder='Tipo'/>
                                <Input name='candle' placeholder='0M'/>
                                <Input name='gale' placeholder='0G'/>
                                <Input name='delay' placeholder='Delay'/>
                                <Input name='stopl' placeholder='Stop lose 100%'/>
                                <Input name='stopw' placeholder='Stop win 100%'/>
                            </div>
                        <Input name='list' placeholder='Lista'/>
                        <Input name='observation' placeholder='Observações'/>

                        <Button type='submit'> Criar </Button>
                    </Form>
                </ModalItens>
            </Modal>}
            <EventList>
                    <div>
                        <img src='https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_261/https://dermofit.com.br/wp-content/uploads/2019/07/local-icon.jpg'/>
                    </div>
                    <div>
                       
                    </div>
            <FiArrowRight size={20}/>
            </EventList>
        </Container>
    )

}


export default Dashboard;