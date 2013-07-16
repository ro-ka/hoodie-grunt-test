# Hoodie Grunt Test

This is a test to check out hoodie running on grunt.

## Install

To quickly get up and running:

```bash
git clone
npm install
hoodie start
```

You have to run hoodie start once to set up everything.

Set the used hoodie WWW port in the Gruntfile in the connect proxies settings.

### Development

This will start grunt and hoodie. Ready to use jade, sass and livereload.

```bash
grunt server
```

### Build

Minify, Concat, …

The `www` folder contains the ready build app. So hoodie can use that one to run without grunt.

```bash
grunt build
hoodie start
```

### Known problems

* Currently hoodie does not start when it is called from grunt. Hackaround: Comment out function `draw` in `node_modules/hoodie-app/lib/hconsole.js:68`.
* `no-open-browser` has no effect
* hoodie port number is hard coded to Gruntfile.