const tiddlywiki = require('tiddlywiki');

const wikiPath = 'guildwikiserver'; // Path to your TiddlyWiki folder

// Configure the wiki
// Access to TiddlyWiki functions - boot, utils, Tiddler, and Wiki
const $tw = require('./tiddlywiki/boot/boot.js').TiddlyWiki();

// Pass the command line arguments to the boot kernel
$tw.boot.argv = ['--version'];

$tw.boot.boot(() => {
	console.log('TiddlyWiki loaded');
})

