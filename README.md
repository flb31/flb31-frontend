#Flb31 FrontEnd

###Prerequisites:
  - npm: http://nodejs.org/
  - Bower: http://bower.io/
  - Grunt: http://gruntjs.com/


###Structure:
- public
  - assets/
    - img/
    - vendors/ 
    - bower_components/
- src/
  - js/
  - sass/
  - tpl/
  - index.jade
  
- .gitignore
- .bowerrc
- bower.json
- gruntfile.js
- package.json
- Procfile
- README.md
- server.js

###Clone flb31-frontend
> 
  `git clone https://github.com/flb31/flb31-frontend.git`  
  `cd flb31-frontend`

###Getting Started
> 
  `ENV=dev npm install`: Install packages.  
  `grunt server --env=dev`: Run server.  
  `grunt run --env=dev`: Compile and Run Server.  
  `grunt build --env=dev`: Export project to **dist/** without minify css and js.

###Change Port
The default port is 3103. --port=8000 for using the port 8000, for example.
> 
  `grunt server --env=dev --port=PORT-NUMBER`

###Production Enviroment
> 
  `grunt build`: Export project.  
  `node server.js`: Run server  

###Heroku CLI
Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-command

> 
  `heroku login`  
  `heroku create NAME-APP`  
  `git push heroku master`  

###Contact
Info: https://github.com/flb31/flb31-frontend  
Email: flb031@gmail.com
  