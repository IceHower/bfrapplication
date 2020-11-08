import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddForeingKeyToListTable1604607723532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Especificamos a foreign key
        await queryRunner.createForeignKey('lists', new TableForeignKey({
            name: 'UserId', // Define um nome para o foreign key
            columnNames: ['user_id'], // coluna da tabela das Listas que vai ser uma foreign key
            referencedColumnNames: ['id'], // coluna que referencia a foreing key
            referencedTableName: 'users', // tabela que referencia a foreign key
            onDelete: 'SET NULL', // Isso vai setar null o campo caso o usuario seja deletado
            onUpdate: 'CASCADE', // Isso caso o id seja alterado, vai alterar o id em todos os relacionamentos feitos.
        }));
    }
    // metodo down reverte tudo que foi feito no metodo up
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('lists', 'UserId'); // Deleta a foreign key
        await queryRunner.dropColumn('lists', 'user_id');
    }

}

