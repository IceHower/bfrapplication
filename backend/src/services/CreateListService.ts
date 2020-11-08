import List from '../models/List';
import  { startOfHour } from 'date-fns';
import { getRepository } from 'typeorm';

/**
 * Recebimento das informações
 * Tratativa de erros/excessões
 * Acesso ao repositório
 */

 interface RequestDTO { //DTO dos dados recebidos
    user_id: string;
    name: string;
    date: Date;
    type: string;
    candles: string;
    gale: string;
    delay: number;
    stoploss: number;
    stopwin: number;
    listitens: string;
    observation?: string;
 }


class CreateAppointmentService {
    public async execute({user_id, name, date, type, candles, gale, delay, stoploss, stopwin, listitens, observation}: RequestDTO): Promise<List> {
        const listRepository = getRepository(List);
        const appointmentDate = startOfHour(date); //Seta o agendademento de hora em hora. // Aqui é uma regra de negócio.


         const list = listRepository.create({ // O metodo create só cria uma instancia no banco de dados, mas não salva.
         user_id,
         name,
         date: appointmentDate,
         type,
         candles,
         gale,
         delay,
         stoploss,
         stopwin,
         listitens,
         observation,

        });

        await listRepository.save(list); // Salva o registro appointment no banco de dados.

        return list;
    }
}


export default CreateAppointmentService;
