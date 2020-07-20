# Blog API

RESTful API for manage a Blog.

## Technologies
- MongoDB 4.2
- ExpressJs
- Mongoose
- joi
- celebrate
- Mocha and Chai for tests
- Docker

## Setup
We use node 12.18.*, if you have installed nvm we recommend run the following command to set the correct node version.
```bash
$ nvm install && nvm use
```
```bash
$ git clone git@github.com:gonzavz/blog_api.git
$ cd blog_api
$ cp .env.sample .env
$ docker-compose build
$ docker-compose up
```

## default env
- NODE_ENV=development
- PORT=3000
- MONGODB_URI=mongodb://mongodb:27017/blog
- MONGODB_TEST_URI=mongodb://mongodb:27017/test-blog
- MONGOOSE_AUTO_INDEX=true
- JWT_SECRET=secretkey
Note: you can change this on docker-compose.yml but not commit the changes.

## Dockers
The proyect has a local infrastructure setted up using docker-compose.

### Included services
- api: its the web server for the restful API and its mapped to local **port 3000**
- db: mongodb 4.2.2 its mapped to local **port 27017**

### Start services

```
docker-compose up
```

### Tests

We use dockers for test, the following command will create a new container to run all tests and destroy it after that.

```
docker-compose run --rm api npm test
```
Note: Its important to add **--rm** to the command other wise the new container will not be destroyed.

Run using npm
```
npm run test:docker
```
## Services

### Users

POST /users
- request body
```json
{
 "name": "Joe Doe",
 "username": "gonzalo",
 "password": "mypassword"
}
```
- response body
```json
{
  "_id": "5ab8917ad75f2f00116183ed",
  "name": "Joe Doe",
  "username": "gonzalo",
  "createdAt": "2020-07-20T06:21:46.783Z",
  "updatedAt": "2020-07-20T06:21:46.783Z",
  "__v": 0
}
```
- curl

```curl
curl -X POST \
  http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{
       "name": "Joe Doe",
       "username": "gonzalo",
       "password": "mypassword"
      }'
```

### Auth
POST /auth/token

Issue an access token
- request body
```json
{
 "username": "gonzalo",
 "password": "mypassword"
}
```
- response body
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjE1ZDJlYzZlOWE4YzAwM2NkMjNiMDUiLCJpYXQiOjE1OTUyNjU3ODd9.7zwGE_Mm1ZKEqEUkaeXAgd78sq19MevvHmFWjLWtmAI"
}
```


### Posts
POST /posts

- request headers
```
Authorization: Bearer [AUTHORIZATION_TOKEN]
```
- request body
```json
{
 "title": "Build a RESTful API with nodejs",
 "body": "This Article teach you how to build a RESTful API in 10 minutes!!",
 "tags": [
  "nodeJs",
  "javascript",
  "RESTful"
  ]
}
```
- response body
```json
{
  "tags": [
      "nodeJs",
      "javascript",
      "RESTful"
  ],
  "_id": "5ab8c2015c8dbb00116eec15",
  "author": "5ab73cdfff2e3f00115b3004", //authenticated user
  "title": "Build a RESTful API with nodejs",
  "body": "This Article teach you how to build a RESTful API in 10 minutes!!",
  "__v": 0
}
```
- curl
```
curl -X POST \
  http://localhost:3000/articles \
  -H 'Authorization: Bearer [AUTHORIZATION_TOKEN]' \
  -H 'Content-Type: application/json' \
  -d '{
 "author": "5ab73cdfff2e3f00115b3004",
 "title": "Build a RESTful API with nodejs",
 "body": "This Article teach you how to build a RESTful API in 10 minutes!!",
 "tags": [
  "nodeJs",
  "javascript",
  "RESTful"
  ]
}'
```

DELETE /posts/[id]

- request headers
```
Authorization: Bearer [AUTHORIZATION_TOKEN]
```
- response body
```json
NO_CONTENT
```
- curl
```
curl -X DELETE \
  http://localhost:3000/posts/[postId] \
  -H 'Authorization: Bearer [AUTHORIZATION_TOKEN]' \
  -H 'Content-Type: application/json' \
```

GET /posts/?query

- request headers
```
Authorization: Bearer [AUTHORIZATION_TOKEN]
```
- request query params
```
sort: -createdAt|createdAt // sort by creation date 
```
```
limit: the pagination limit. [optional]
```
```
offset: the pagination offset. [optional]
```
- response body
```json
{
  "docs": [
    ...List of Articles
  ],
  "totalDocs": 0,
  "limit": 10,
  "offset": 0
}
```
- curl
```
curl -X GET \
  'http://localhost:3000/posts' \
  -H 'Authorization: Bearer [AUTHORIZATION_TOKEN]'
```
