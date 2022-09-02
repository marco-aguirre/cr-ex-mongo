this project was created following this tutorial (https://zellwk.com/blog/crud-express-mongodb/)

I strayed, a little, from the original code and highlighted the spots I got stuck at for future reference


//////////////////STEPS////////////////

check if node is installed from cmd line

    $ node -v

after node is installed you can NPM to install other dependencies
but first you will use it do init

    $npm init

this creates package.json - where you manage dependencies

first you'll need server.js

    $touch server.js

install express

    $npm install express --save

        --save flag saves express as a dependency in package.json

install nodemon so you don't have to keep reloading your server everytime you make a change

    $npm install nodemon --save-dev

    the -dev flag adds it as a devDependency in the package.json file

running $nodemon server.js will only work if you've installed nodemon globally with -g flag
when you've installed it locally (only to this app) you can
1) run nodemon directly from the node_modules folder like this:

    $./node_modules/.bin/nodemon server.js

or more simply by adding a 'scripts': key in package.json

{
  // ...
  "scripts": {
    "dev": "nodemon server.js"
  }
  // ...
}

Now, you can run
    $npm run dev
and it will trigger nodemon server.js