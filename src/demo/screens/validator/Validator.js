export const isValidName = (name) => {
    return /(^[\u4e00-\u9fa5]{1}[·\u4e00-\u9fa5]*$)|(^[A-Za-z]{1}[A-Za-z\s]*$)/.test(name);
};

export const isValidInput = (name) => {
    if (name === undefined) {
        return false;
    }
    return /(^[0-9a-zA-Z\u4e00-\u9fa5]+$)/.test(name);
};

export const isValidCardNo = (cardNo) => {
    return cardNo && cardNo.length > 6;
};

export const isValidAmount = (amount) => {
    if (amount && (amount.toString().charAt(0) === '.')) {
        return false;
    }

    const fNum = parseFloat(amount);
    if (isNaN(fNum)) {
        return false;
    }

    if (fNum < 0.01) {
        return false;
    }

    try {
        return amount.toString().split('.')[1].length <= 2;
    } catch ( e ) {
        return true;
    }
};

export const containsChinese = (input) => {
    if (input) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(input)) {
            return true;
        }
        return false;
    } else {
        return false;
    }
};

export const sTrim = (sourceStr) => {
    if (sourceStr) {
        return sourceStr.replace(/\s+/g, '');
    } else {
        return '';
    }
};

export const isCharacter = (value) => {
    const Regx = /^[A-Za-z]*$/;
    if (Regx.test(value)) {
        return true;
    } else {
        return false;
    }
};
