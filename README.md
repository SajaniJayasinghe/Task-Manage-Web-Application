# Task-Manage-Web-Application
** Overview **
This is a web application built using React.js and Vite.js for the frontend, and Node.js for the backend.

* Setup Instructions :-
  
--- Backend --
  
  1. Clone the repository from GitHub (ex:- git clone https://github.com/your-username/your-repo.git )
  2. Navigate to the backend directory:
      cd your-repo/backend
     
  3. Install dependencies:
     npm install

  4. Start the backend server:
     npm start

  5. Make sure to set .env file

     * PORT = 8080
     * MONGODB_URL = xxxxx
     * JWT_SECRET_KEY=xxxx
     * SERVER_EMAIL=xxxx
     * SERVER_PASSWORD=xxxx

--- Frontend --

  1. Navigate to the frontend directory:
     cd your-repo/frontend

  2. Install dependencies:
     npm install

  3. Start the development server:
     npm run dev


** Environment Variables **
The following environment variables are required:

REACT_APP_API_URL: The URL of the backend API. Default is http://localhost:8000.
Add any additional environment variables here if necessary.
Make sure to set these environment variables either in a .env file or directly in your deployment environment.

** Note **
Make sure to create a .env file in the root directory of backend folders and add the necessary environment variables as mentioned above.

