# Instructions to Execute Email Verification Backend:

 1) You need to add your email and password in configuration file i.e =>           config.development.json file which email account you have to use to send       the mail through nodemailer
 2) npm install 
 3) Create build using =>  yarn build 
 4) Run the backend server using => yarn dev
 5) Install mongoDB and create one database => email-verification


# Instructions to Execute Email Verification frontend:

 1) Install angular cli using => npm install -g @angular/cli
 2) npm install 




## Schema - POST /schema API: User Table 

### Input: 
    {
        
        "schema_name": "user",
         "columns": [
            {
                "first_name": "string";
                "last_name": "string";
                "email": "string";
                "mobile": "string";
                "password": "string";
                "last_otp": "string";
                "is_verified": "string";
                "random_key": "string";
                "is_deleted": "number";
            }
        ],
    }

## Input Field Explanation: 
    1. schema_name: Table Name which need to be created.
    2. columns : Column Deatils



# API Details with enpoints:
 1) /login  => To login the verified user
 2) /sign-up => To create new User 
 3) /resend-email => To resend the mail for verification 
 4) /verify-email/{id} => To verify mail using link which is sent by register mail



