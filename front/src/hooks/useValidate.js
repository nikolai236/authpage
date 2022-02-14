export default function validate(values) {
    const keys = Object.keys(values);
    console.log(keys);

    const validator = (key) => {
        switch(key){
            case 'username':
                return (val) => {
                    return /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
                        .test(val);
                }
            case 'email':
                return (val) => {
                    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        .test(val);
                }
            case 'password':
                return (val) => {
                    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val);
                }
            case 'confirmPassword':
                return (val) => {
                    return (val === values.password);
                }
        }
    }

    for(let i = 0; i < keys.length; i++) {
        let val = values[keys[i]];
        console.log(val);
        if(!(validator(val) && val !== '')){
            console.log(val);
            return false;
        }
    }

    return true;
}