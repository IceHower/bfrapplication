import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLists1604535923364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'lists',
                columns: [
                    {
                        name: 'id', // Define o nome da coluna
                        type: 'uuid', // Define o tipo do dado da coluna
                        isPrimary: true, // Essa flag diz se a primary key ou não
                        generationStrategy: 'uuid', // Essa flag define o metodo de geração como uuid para o id
                        default: 'uuid_generate_v4()' // define a função para gerar o uuid v4
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: false, // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false, // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone', // Esse tipo só tem no postgres, fala que o tipo é timestamps e ainda pega o fuso horario.
                        isNullable: false // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false, // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'candles',
                        type: 'varchar',
                        isNullable: false, // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'gale',
                        type: 'varchar',
                        isNullable: false, // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'delay',
                        type: 'int',
                        isNullable: false, // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'stoploss',
                        type: 'int',
                        isNullable: false, // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'stopwin',
                        type: 'int',
                        isNullable: false, // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'listitens',
                        type: 'varchar',
                        isNullable: false, // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'observation',
                        type: 'varchar',
                        isNullable: true, // Essa flag diz se o valor pode ser nulo ou não
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                ],
            }),
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('lists'); // deleta a tabela de appointments
    }

}
