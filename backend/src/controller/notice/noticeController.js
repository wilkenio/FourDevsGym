import { msgJson } from "../../utils/responseJson.js"
import { knex } from "../../database/connection/dbConnection.js";
import { formatDates } from "../../service/noticeService.js";

export const register = async (req, res) => {
    const { body } = req
    const dataExpiracao = new Date(body.data_expiracao);
    try {
        const [ noticeInfo ] = await knex('aviso').insert({...body, data_expiracao: dataExpiracao}).returning('*')

        const formattedDates = formatDates(noticeInfo.data_criacao,noticeInfo.data_atualizacao,noticeInfo.data_expiracao,3);
        
        noticeInfo.data_criacao = formattedDates.data_criacao;
        noticeInfo.data_atualizacao = formattedDates.data_atualizacao;
        noticeInfo.data_expiracao = formattedDates.data_expiracao;

        msgJson(201, res, noticeInfo, true)
    } catch (error) {
        msgJson(500, res, 'Erro interno do servidor ao cadastrar aviso.', false)
    }
}

export const update = async (req, res) => {
    const { params: { id: id_aviso }, body} = req

    try {
        const idInfo = await knex('aviso').where({ id_aviso }).returning('*');
        if (!idInfo || idInfo.length === 0 ) return msgJson(404, res, 'Aviso não encontrado.')

        const [ noticeInfo ] = await knex('aviso').update({...body}).where({ id_aviso }).returning('*')

        const formattedDates = formatDates(noticeInfo.data_criacao,noticeInfo.data_atualizacao,noticeInfo.data_expiracao,3);
        
        noticeInfo.data_criacao = formattedDates.data_criacao;
        noticeInfo.data_atualizacao = formattedDates.data_atualizacao;
        noticeInfo.data_expiracao = formattedDates.data_expiracao;

        msgJson(201, res, noticeInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao cadastrar academia.', false)
    }
}

export const deleteNotice = async(req, res) => {
    const { params: { id: id_aviso }} = req

    try {
        let noticeInfo = await knex('aviso').where({ id_aviso }).first().returning('*');
        if (!noticeInfo || noticeInfo.length === 0 ) return msgJson(404, res, 'Aviso não encontrado.')

        const formattedDates = formatDates(noticeInfo.data_criacao,noticeInfo.data_atualizacao,noticeInfo.data_expiracao,3);
        
        noticeInfo.data_criacao = formattedDates.data_criacao;
        noticeInfo.data_atualizacao = formattedDates.data_atualizacao;
        noticeInfo.data_expiracao = formattedDates.data_expiracao;

        await knex('aviso').where({ id_aviso }).del().returning('*');

        msgJson(201, res, noticeInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar avisos.', false)
    }
}


export const getNoticeById = async(req, res) => {
    const { params: { id: id_aviso }} = req

    try {
        const noticeInfo = await knex('aviso').where({ id_aviso }).first().returning('*');
        if (!noticeInfo || noticeInfo.length === 0 ) return msgJson(404, res, 'Aviso não encontrado.')

        const formattedDates = formatDates(noticeInfo.data_criacao,noticeInfo.data_atualizacao,noticeInfo.data_expiracao,3);
        
        noticeInfo.data_criacao = formattedDates.data_criacao;
        noticeInfo.data_atualizacao = formattedDates.data_atualizacao;
        noticeInfo.data_expiracao = formattedDates.data_expiracao;

        msgJson(201, res, noticeInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar aviso.', false)
    }
}

export const getAllNotice = async(req, res) => {
    try {
        const noticeInfo = await knex('aviso').select('*');
        const formattedNoticeInfo = noticeInfo.map(notice => {
            const formattedDates = formatDates(notice.data_criacao,notice.data_atualizacao,notice.data_expiracao,3);

            return {
                ...notice,
                data_criacao: formattedDates.data_criacao,
                data_atualizacao: formattedDates.data_atualizacao,
                data_expiracao: formattedDates.data_expiracao
            };
        });

        msgJson(201, res, formattedNoticeInfo, true)
    } catch (error) {
        console.error(error)
        msgJson(500, res, 'Erro interno do servidor ao detalhar avisos.', false)
    }
}