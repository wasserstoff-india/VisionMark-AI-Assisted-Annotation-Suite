# Backend Developer Task: VisionMark AI-Assisted Annotation Suite

## Overview

VisionMark is a cutting-edge, mobile-first application aimed at simplifying the data collection and annotation process for preparing training datasets for YOLO image recognition models. This task challenges you, as a backend developer candidate, to architect and implement the backend services for VisionMark. Your goal is to develop a scalable, efficient system capable of handling image processing, user management, automatic annotations, and data exporting functionalities.

### Tech Stack used:

Technologies used for creating the API's for authentication, autherization annotation.
- **ExpressJS:** For creating the server and API endpoints.\
- **MongoDB:** NoSQL DB for storing data.
- **Mongoose:** Object Modeling library used for asynchronous operations with MongoDB.
- **CORS:** Mechanism for controlled access to resources.
- **Multer:** Middleware library to upload files i.e. handling multipart/form-data.
- **Body parser:** Middleware to parse the request body.
- **Cookie parser:** Middleware to parse cookie and set cookie for authentication and autherization.
- **Google Cloud Vision:** Google cloud vision SDK for annotation images using AI pre trained model.
- **Bcrypt:** Library to generate hashed code to saved hashed password on DB
- **CSV writer:** Library to convert object/ arrays into CSV string and write to csv file.
- **dotenv:** Load environment variables from .env file to process.env
- **Express validator:** Middleware to validate request body before hitting controllers.
- **js2xmlparser:** Library to convert js object to xml and write to a xml file.
- **Joi:** Used to validate the .env variables.
- **http-status:** Standard http status library.
- **jsonwebtoken:** Used to generate and verify JWT tokens for authentication and autherization.

### Setup for runnning the project:

1. Clone the repository using following command.

   **git clone <--git repo url-->**

2. Navigate inside the clone directory.

3. Create a .env file with fields given in .env.example file.

4. Open the terminal in the directory path and run following command.

   **npm i**

5. Generate the google cloud vision api key with following name "APIKey.json" and place the file in same directory as package.json file.

6. Run the following command

   **npm start**


# Endpoints

### BASE_URL="http://localhost:<-PORT->"

## Authentication and authorization

1. POST -  BASE_URL/api/auth/login

   * Request Body:

    {
        "email":"abc@gmail.com",
        "password":"Abcde@1233"
    }

2. POST - BASE_URL/api/auth/register

    * Request Body:

    {
        "name":"Abc",
        "email":"abc@gmail.com",
        "password":"Abcde@1233",
        "contact_no":1111111111
    }

3.  POST - BASE_URL/api/auth/logout

4. POST - BASE_URL/api/auth/refreshtoken

## User management

1. GET -  BASE_URL/api/user/

2. GET - BASE_URL/api/user/:id

    Path paramas key: id

## Annotations

1. GET -  BASE_URL/api/anotate/image

2. POST - BASE_URL/api/anotate/image/

    * Content-Type: multipart/form-data

    {
        "userId":"sad78sa5da5s",
        "image":file
    }

3. POST - BASE_URL/api/anotate/image/:id

    * Request Body:

      {
          "annotation":{
              "label":"car",
              "coordinates":{
                  "x":65,
                   "y":55
                  },
               "confidence":5
           }
      }

4. GET - BASE_URL/api/anotate/image/:id

    Path paramater key : id

## Admin access

1. GET -  BASE_URL/api/anotate/images

2. GET - BASE_URL/api/anotate/images

    Query paramter key : status
   
    Value enums: ["review","approved","rejected"]

3. POST - BASE_URL/api/anotate/review/:id

    Path parameter key: id

     * Request Body:

          {
            "status":"approved"
          }
        
    * Status values can be "approved", "rejected" and "review".
  
4. GET - BASE_URL/api/anotate/exportdata/:type

      Path paramter key: type

      Values of type can be "xml", "csv" or "json".






### - Assumption for testing: First user will be 'admin' role user and other users will have 'user' role
### - Images are uploaded locally.
### - Swagger.json is incomplete



