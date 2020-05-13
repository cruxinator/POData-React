export const isFunction = value => typeof value === 'function';
export const isEmpty = obj => {
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};