import { Axios } from './axios';

const EXECUTE_CODE_URL = 'execute'
const HISTORY_URL = 'history'
const ONE_HISTORY_URL = (id : string) => `history/${id}`


export const executeCode = (code : string) => {
	return Axios().post(EXECUTE_CODE_URL, {
		code : code
	});
};

export const getHistory = () =>{
    return Axios().get(HISTORY_URL);
}

export const constGetOneHistory = (id : string)  => {
    return Axios().get(ONE_HISTORY_URL(id));
}