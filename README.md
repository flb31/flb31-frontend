#Flb31 FrontEnd

###Prerequisites:
  - npm: http://nodejs.org/
  - Bower: http://bower.io/
  - Grunt: http://gruntjs.com/


###Structure:
- src/
  - assets/
    - img/
    - vendors/ 
    - bower_components/
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
  `ENV=--dev npm install`: Install packages.  
  `grunt server --dev`: Run server.  
  `grunt run --dev`: Compile and Run Server.  
  `grunt build --dev`: Export project to **dist/**.  

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
  