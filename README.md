# multiSchool
----------------

# Folder Structure
----------------------
<pre>multi-school-erp-backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   ├── models/
│   │   ├── index.js
│   │   ├── school.model.js
│   │   ├── user.model.js
│   │   └── student.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── school.routes.js
│   │   ├── user.routes.js
│   │   └── student.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── school.controller.js
│   │   ├── user.controller.js
│   │   └── student.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── school.middleware.js
│   │   └── validate.middleware.js
│   ├── validations/
│   │   ├── auth.validation.js
│   │   ├── user.validation.js
│   │   └── student.validation.js
│   ├── services/
│   │   ├── email.service.js
│   │   └── token.service.js
│   └── utils/
│       └── password.util.js
├── tests/
│   ├── auth.test.js
│   ├── user.test.js
│   └── student.test.js
├── .env.example
├── package.json
└── README.md
</pre>

## Setup steps
## 1. clone repository in vs code by 'git clone https://github.com/rajatsah95/multischoolBackend.git'
## 2. install dependencies by 'npm i'
## 3. create .env file inside multischoolBackend folder and then add all variables given in .env.example.
## 4. run server by 'npm start' or 'npm run dev'

# github link
## backend - https://github.com/rajatsah95/multischoolBackend

# APIs

## user
-----------
## create
-----------
POST/    http://localhost:10000/schools/:schoolId/users

path parameters-
schoolId as   '1'

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'

body-
{
    "name":"u6",
    "email":"r@gmail.com",
    "phone": "1111111111",
    "role": "user",
    "canEditStudents": "false"
}

## login
----------
POST/    http://localhost:10000/login

body-
{
    "email": "r@gmail.com",
    "password": "1111111111"
}

## getAllUsers
----------------
GET/       http://localhost:10000/schools/:schoolId/users

path parameters-
schoolId as   '1'

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'

## resetPassword
------------------
POST/       http://localhost:10000/resetPassword     

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'

body-
{
    "newPassword":"123"
}

## student
-----------
## create
-----------
POST/    http://localhost:10000/schools/:schoolId/students

path parameters-
schoolId as   '1'

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'

body-
{
    "name":"s1",
    "dob": "2025-12-15"
}

## getAllStudents
----------------
GET/       http://localhost:10000/schools/:schoolId/students

path parameters-
schoolId as   '1'

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'

## updateStudent
-----------
PUT/    http://localhost:10000/schools/:schoolId/students/:id

path parameters-
schoolId as   '1'
id       as   '1'

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'

body-
{
    "dob":"2025-12-14"
}

## deleteStudent
-----------
DELETE/    http://localhost:10000/schools/:schoolId/students/:id/:isDeleted

path parameters-
schoolId   as   '1'
id         as   '1'
isDeleted  as 'false'

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'

## getStudentById
----------------
GET/       http://localhost:10000/schools/:schoolId/students/:id

path parameters-
schoolId  as   '1'
id        as   '1'

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'

## school
-----------
## create
-----------
POST/    http://localhost:10000/schools

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'

body-
{
    "name":"kv4"
}

## getAllSchools
----------------
GET/       http://localhost:10000/schools

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'

## getSchoolById
----------------
GET/       http://localhost:10000/schools/:id

path parameters-
id  as  '1'

headers-
token as 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzgwMDhiMGQxMmFhM2MxMThhYTAxMyIsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJpYXQiOjE3NDg1MDEwMTYsImV4cCI6MTc0ODUwNDYxNn0.4byosUPVdIv9XLUf2bckeI1o-JLVUJlPIuo_QVXFHCM'
