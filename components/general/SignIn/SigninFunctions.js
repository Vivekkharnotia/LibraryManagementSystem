export function validateEmail(mail){
    const re =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const res = re.test(mail);
    return res;
}
export function validateName(name){
    const re = /^[A-Za-z]+$/;
    const res = re.test(name);
    return res;
}
export function validatePassword(pswd){ 
    let re = /^(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const res = re.test(pswd);
    return res;
}
export function validateConfirmPassword(pswd, cpswd){
    if(pswd === cpswd) return true;
    return false;
}

export function handleClear(){
    document.getElementById('pswd').value = '';
    document.getElementById('email').value = '';
}

export function handleClear2(setErr){
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('mail').value = '';
    document.getElementById('pswrd').value = '';
    document.getElementById('cpswd').value = '';
    setErr({
        email_err: false,
        fname_err: false,
        lname_err: false,
        password_err: false,
        cPassword_err: false,
      });
}