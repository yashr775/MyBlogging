import conf from '../conf/conf.ts'
import { Client, Account, ID } from "appwrite";

export class AuthService{

    client:Client = new Client();
    account:Account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId); 

        this.account = new Account(this.client);
    }


    async createAccount({email , password ,name}: { email: string; password: string; name: string }){

            const userAccount = await this.account.create(ID.unique(),email,password,name);

            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount;
            }
    }

    async login({email,password}:{email:string,password:string}){
        
            return await this.account.createEmailSession(email,password);
        
    }

    async getCurrentUser(){

        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    async logout(){
        try {
            
            this.account.deleteSessions();

        } catch (error) {
            console.log(error);
        }
    }

}

const authService = new AuthService;

export default authService; 