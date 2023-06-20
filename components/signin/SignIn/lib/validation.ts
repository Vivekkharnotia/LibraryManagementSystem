export function validateEmail(mail: string){
  const re =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const res = re.test(mail);
  return res;
}
export function validateName(name: string){
  const re = /^[A-Za-z]+$/;
  const res = re.test(name);
  return res;
}
export function validatePassword(pswd: string){ 
  let re = /^(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const res = re.test(pswd);
  return res;
}
export function validateConfirmPassword(pswd: string, cpswd: string){
  if(pswd === cpswd) return true;
  return false;
}