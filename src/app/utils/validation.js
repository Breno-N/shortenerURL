const util = require('util');
const moment = require('moment');

const getCurrentValue = (target = {}, path = '') => {
    path = path.split('.');
    let i = 0;
    for(i; i < path.length -1; i++) {
        const currentValue = target[path[i]];
        if(currentValue){
            target = currentValue;
        }
    }
    const currentValue = target[path[i]];
    if(currentValue !== undefined){
        return currentValue;
    }
    return null;
};

const isRequired = (target, attrs = []) => {

    let required = attrs.filter((attr) => {
        const value = getCurrentValue(target, attr);
        if(typeof value === 'number' && !Number.isNaN(Number(value))){
            return;
        }
        if(typeof value === 'string' && String(value)){
            return;
        }
        if(typeof value === 'boolean' && value !== undefined){
            return;
        }
        if(Array.isArray(value) && value.length){
            return;
        }
        if(
            typeof value === 'object' &&
            value !== null &&
            Object.keys(value).length
        ){
            return;
        }
        if(value === undefined || !value || !value.length){
            return attr;
        }
    });
    if(required && required.length){
        throw Error(`${required.join(', ')} ${required.length > 1 ? 'são obrigatórios' : 'é obrigatório'}`);
    }
};

const isExpiredTime = (createdAt) => {
    const createdAtMoment = moment(createdAt);
    const currentMoment = moment();
    const diff = currentMoment.diff(createdAtMoment, 'minutes');
    if(diff > process.env.APP_TIMEOUT_URL){
        throw Error('O tempo da url expirou, tente realizar um novo cadastro.'); 
    }
};

module.exports = { 
    getCurrentValue,
    isRequired,
    isExpiredTime
};