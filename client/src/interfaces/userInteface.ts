export interface User {
    id: number;
    name: string;
    email: string;
  }
  
 export interface RegisterUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmpassword?:string
   
  }
  
 export interface UserLoginInput {
    email: string;
    password: string;
  }
  