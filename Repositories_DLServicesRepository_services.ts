import * as oracledb from 'oracledb';
import { boundMethod } from 'autobind-decorator';
import { inject, injectable } from 'tsyringe';
import { Cache, AbstractRepository } from '@tksolution/tks-datasource-api-core';
import { RegisteredCache, RegisteredOracleDb } from '~/src/tokens';
import { DeleteServices, InsertServices, SelectServices, UpdateServices } from '~/src/controllers/Services/types';
import { returnReponseServices, returnReponseServicesData } from './ServicesRepository';

@injectable()
export class DLServicesRepository extends AbstractRepository implements DLServicesRepository {
    constructor(@inject(RegisteredOracleDb) oracleDb: typeof oracledb, @inject(RegisteredCache) cache: Cache) {
        super(oracleDb, cache);
        this.repositoryDomain = 'services';
    }

    repositoryDomain: string;

    @boundMethod
    async getServices(aGetServices: SelectServices): Promise<returnReponseServicesData> {

        let getservices: any;
        let lsServicesReturn: returnReponseServicesData;

        const query = ` SELECT ID_SERVICO,
                              DS_SERVICO
                        FROM  SERVICO
                        WHERE ID_SERVICO ${aGetServices.id_servico ? '= :id_servico' : 'ID_SERVICO'}`;
        const binds = { id_servico: aGetServices.id_servico };
        getservices = await this.execute<ServicesQueryResult>(
            query,
            binds,
            {},
            {
                ttlInSecs: 3600,
                cacheEmptyQueryResult: false,
            },
        );

        if (getservices.length === 0) {
            lsServicesReturn = {
                status: "Error: Nenhum serviço a ser retornado pelos parâmetros passados!",
                data: []
            }
        }
        else {
            lsServicesReturn = {
                status: "OK",
                data: getservices
            }
        }
        return lsServicesReturn;
    }


    @boundMethod
    async postServices(aInsertServices: InsertServices): Promise<returnReponseServices> {

        let postservices: any;
        let lsServicesReturn: returnReponseServices;

        const query = ` INSERT INTO SERVICO
                        (ID_SERVICO, DS_SERVICO)
                        VALUES
                        (:id_servico, :ds_servico)`;

        const binds = {
            id_servico: aInsertServices.id_servico,
            ds_servico: aInsertServices.ds_servico
        };

        postservices = await this.execute<ServicesQueryResult>(
            query,
            binds,
            {},
            {
                ttlInSecs: 3600,
                cacheEmptyQueryResult: false,
            },
        );

        if (postservices.length === 0) {
            lsServicesReturn = {
                status: "Error: Nenhum serviço incluido com os parâmetros passados!",
                data: []
            }
        }
        else {
            lsServicesReturn = {
                status: "OK",
                data: postservices
            }
        }
        return lsServicesReturn;
    };

    @boundMethod
    async putServices(aUpdateServices: UpdateServices): Promise<returnReponseServices> {

        let putservices: any;
        let lsServicesReturn: returnReponseServices;

        const query = ` UPDATE SERVICO
                        SET   DS_SERVICO = :ds_servico 
                        WHERE ID_SERVICO = :id_servico`;

        const binds = {
            id_servico: aUpdateServices.id_servico,
            ds_servico: aUpdateServices.ds_servico
        };

        putservices = await this.execute<ServicesQueryResult>(
            query,
            binds,
            {},
            {
                ttlInSecs: 3600,
                cacheEmptyQueryResult: false,
            },
        );

        if (putservices.length === 0) {
            lsServicesReturn = {
                status: "Error: Nenhum serviço a ser alterado com os parâmetros passados!",
                data: []
            }
        }
        else {
            lsServicesReturn = {
                status: "OK",
                data: putservices
            }
        }
        return lsServicesReturn;
    };

    @boundMethod
    async deleteServices(aDeleteServices: DeleteServices): Promise<returnReponseServices> {
    
        let deleteservices: any;
        let lsDeletesReturn: returnReponseServices;
    
        const query = ` UPDATE SERVICOS_DEL
                        SET   DT_CANC = TRUNC(SYSDATE)
                        WHERE ID_PESSOA = :id_pessoa
                        AND   DT_POST   = :dt_post `;
    
        const binds = {
            id_pessoa: aDeleteServices.id_pessoa,
            dt_post: aDeleteServices.dt_post
        };
    
        deleteservices = await this.execute<ServicesQueryResult>(
            query,
            binds,
            {},
            {
                ttlInSecs: 3600,
                cacheEmptyQueryResult: false,
            },
        );
    
        if (deleteservices.length === 0) {
            lsDeletesReturn = {
                status: "Error: Nenhum serviço a ser excluído com os parâmetros passados!",
                data: []
            }
        }
        else {
            lsDeletesReturn = {
                status: "OK",
                data: deleteservices
            }
        }
        return lsDeletesReturn;
    };
}
    
export interface ServicesQueryResult {
    ID_SERVICO: string,
    DS_SERVICO: string,
}
