import { API_URL } from "./config";

type body={
 email:string;
 username:string,
 name:string;
 phone:string;
}

  async function signUp({email,username,name,phone}:body){
    fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({email,username,name,phone})
    })
}
  function login() {
    
}