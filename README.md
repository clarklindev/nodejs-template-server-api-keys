# backend and frontend

- Testing: api key (stored in .env) on server and passing it to client side when an api hits a link
- the reason is google api requires the api key as part of url and not sure there is anyway around that.

- backend has .env variable that is read from api
  - there should be a .env file created in project root directory, the API keys should follow the format of .env.template (which is a file for developer's guidance only)
- frontend end hits endpoint and uses api key to open Google Map instance

- storing api keys on server and retrieving it from api endpoint is not part of maxmillian schwarzmullers course - but the template is adapted from the code

- using design template from - react-nodejs-express-mongodb-the-mern-fullstack-guide: https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide/
