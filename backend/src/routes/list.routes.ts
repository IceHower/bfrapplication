import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import { parseISO } from 'date-fns'; // parseISO e isEqual do date-fns
import CreateListService from '../services/CreateListService';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import List from '../models/List';


//A função parseISO vai converter uma string para o formato date do js
//A funçao startOfHour vai pega o começo da hora de uma data

//Rota deve ta preocupada em receber a requisição, chamar outro arquivo, devolver uma resposta.
//Sempre que tiver algo alem disso, provalvemente devemos abstrair do arquivo de rotas.

const listRouter = Router(); // define uma variavel para inicializar o router

listRouter.use(ensureAuthenticated) // Aplica o middleware em todas as rotas de appointments.

listRouter.post('/', async (request : Request, response : Response) => { // Metodo post da rota appointments que retorna um Json

        const { name, date, type, candles, gale, delay, stoploss, stopwin, listitens, observation } = request.body; // Pega o nome do provider e a data do body da aplicação.
        const  user_id  = request.user.id;
        const parsedDate = parseISO(date); //pega a data transforma em Date do js. // Aqui só transforma um dado.

        const createList = new CreateListService(); //Passa a instancia  do repository como parametro no constructor do service.
        const list = await createList.execute({user_id, name, date: parsedDate, type, candles, gale, delay, stoploss, stopwin, listitens, observation}); // Destruramos para passar o date e o provider e passamos como parametro no metodo execute do service.
        return response.json(list); // retorna um json com as informações cadastradas


});

listRouter.get('/:id', async (request: Request, response: Response) => { // Lista os itens cadastrados
    const appointmentsRepository = getRepository(List);
    const  user_id  = request.user.id;
    const appointment = await appointmentsRepository.find({user_id: user_id});

    return response.json(appointment); // retorna um json com o resultado obtido.
});

export default listRouter; // exporta a variavel
