// Scripts load environment variables from .env(s) via dotenvx
// Env vars are still located in proccess.env

// Configure the wiki
// Access to TiddlyWiki functions - boot, utils, Tiddler, and Wiki
const $tw = require('tiddlywiki').TiddlyWiki();
const adminPathEnv = process.env.ADMIN_PATH;

// Pass the command line arguments to the boot kernel
$tw.boot.argv = Array.prototype.slice.call(process.argv,2);

// Add the admin wikipath to the start of argv
$tw.boot.argv.unshift(adminPathEnv);

$tw.boot.boot(() => {
	console.log('TiddlyWiki loaded');
})

