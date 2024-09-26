const emailValidator = (email)=>{
    if(email.search(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === -1) {
        return {isValid: false, reason: "email formation is invalid"}
    }

    return {isValid: true}
}

export default emailValidator
 