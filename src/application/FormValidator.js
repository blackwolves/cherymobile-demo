import React, { Component, PropTypes } from 'react';
import moment from 'moment';

const defaultMessages = {
    // English language - Used by default
    en: {
        numbers: 'The field "{0}" must be a valid number.',
        email: 'The field "{0}" must be a valid email address.',
        required: 'The field "{0}" is mandatory.',
        date: 'The field "{0}" must be a valid date ({1}).',
        minlength: 'The field "{0}" length must be greater than {1}.',
        maxlength: 'The field "{0}" length must be lower than {1}.'
    },
    // French language
    zh: {
        numbers: '字段 "{0}" 必须是数字.',
        email: '字段 "{0}" 必须是合法的邮箱地址格式.',
        required: '"{0}" 是必填字段.',
        date: '字段 "{0}" 必须按照日期格式 ({1}) 填写.',
        minlength: '字段 "{0}" 长度不能少于{1}个字符.',
        maxlength: '字段 "{0}" 长度不能超过{1}个字符.'
    }
};

const defaultRules = {
    numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
    email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
    required: /\S+/,
    date(format = "YYYY-MM-DD", value) {
        const d = moment(value, format);
        if (d === null || !d.isValid()) return false;
        return true;
    },
    minlength(length, value) {
        if (value.length > length) {
            return true;
        }
        return false;
    },
    maxlength(length, value) {
        if (value.length > length) {
            return false;
        }
        return true;
    }
};

export default class FormValidator extends Component {
    constructor(props) {
        super(props);
        // array to store error on each fields
        // ex:
        // [{ fieldName: "name", messages: ["The field name is required."] }]
        this.errors = [];
        // Retrieve props
        this.deviceLocale = props.deviceLocale || 'zh'; // ex: en, fr
        this.rules = props.rules || defaultRules; // rules for Validation
        this.messages = props.messages || defaultMessages;
    }

    /*
    * Method validate to verify if each children respect the validator rules
    * Fields example (Array) :
    * fields = {
    *  input1: {
    *    required:true,
    *     numbers:true,
    *     maxLength:5
    *  }
    *}
    */
    validate(fields) {
        // Reset errors
        this._resetErrors();
        // Iterate over inner state
        for (const key of Object.keys(this.state)) {
            // Check if child name is equals to fields array set up in parameters
            const rules = fields[key];
            if (rules) {
                // Check rule for current field
                this._checkRules(key, rules, this.state[key]);
            }
        }
        return this.isFormValid();
    }

    // Method to check rules on a spefific field
    _checkRules(fieldName, rules, value) {
        for (const key of Object.keys(rules)) {
            const isRuleFn = (typeof this.rules[key] === "function");
            const isRegExp = (this.rules[key] instanceof RegExp);
            if ((isRuleFn && !this.rules[key](rules[key], value)) || (isRegExp && !this.rules[key].test(value))) {
                this._addError(fieldName, key, rules[key], isRuleFn);
            }
        }
    }

    // Add error
    // ex:
    // [{ fieldName: "name", messages: ["The field name is required."] }]
    _addError(fieldName, rule, value, isFn) {
        const errMsg = this.messages[this.deviceLocale][rule].replace("{0}", fieldName).replace("{1}", value);
        const [error] = this.errors.filter(err => err.fieldName === fieldName);
        // error already exists
        if (error) {
            // Update existing element
            const index = this.errors.indexOf(error);
            error.messages.push(errMsg);
            this.errors[index] = error;
        } else {
            // Add new item
            this.errors.push({
                fieldName,
                messages: [errMsg]
            });
        }
    }

    // Reset error fields
    _resetErrors() {
        this.errors = [];
    }

    // Method to check if the field is in error
    isFieldInError(fieldName) {
        return (this.errors.filter(err => err.fieldName === fieldName).length > 0);
    }

    isFormValid() {
        return this.errors.length === 0;
    }

    // Concatenate each error messages
    getErrorMessages(separator = "\n") {
        return this.errors.map((err) => err.messages.join(separator)).join(separator);
    }
}

// PropTypes for component
FormValidator.propTypes = {
    deviceLocale: PropTypes.string, // Used for language locale
    rules: PropTypes.object, // rules for validations
    messages: PropTypes.object // messages for validation errors
};
