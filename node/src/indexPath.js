// import { log } from 'console';
import Path from 'path'

// *****  join Module ****

console.log(Path.join('/foo','bar','baz/asdf','quux','..'));//\foo\bar\baz\asdf
console.log(Path.join('foo', 'bar'));//foo\bar

// ****** normalize Module ******
console.log(Path.normalize('/foo/bar//baz/asdf/quux/..'));//on posix....\foo\bar\baz\asdf

console.log(Path.normalize('C:\\temp\\\\foo\\bar\\..\\'));//on window...C:\temp\foo\

console.log(Path.normalize('C:////temp\\\\/\\/\\/foo/bar'));//....C:\temp\foo\bar
//Since Windows recognizes multiple path separators, both separators will be replaced by instances of the Windows preferred separator (\):

// **** parse Module ****

console.log(Path.parse('home/user/dir/file.text'));//on posix
// (All spaces in the "" line should be ignored. They are purely for formatting.) 
console.log(Path.parse('c:/path\\kll\\file.txt'));

//**** resolve Module *****
// console.log(Path.resolve("Current directory:", __dirname));

console.log(Path.resolve('/foo/ba','/tmp/file/'));//C:\tmp\file
console.log(Path.resolve("users", "admin","..", "files", "readme.md"));//C:\NODE\users\files\readme.md
console.log(Path.resolve("users", "admin","..", "files", "..", "readme.md"));//C:\NODE\users\readme.md

//***** basename Module *****
console.log(Path.basename('/foo/bar/baz/asdf/quux.html'));//quux.html

console.log(Path.basename('/foo/bar/baz/asdf/quux.html', '.html'));//quux

//**** path.delimiter ******

// console.log(process.env.PATH);
// // Prints: '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local
// console.log(process.env.PATH.split(Path.delimiter));
// // Returns: ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']

// ***** path.dirname(path) ******

console.log(Path.dirname('/foo/bar/baz/asdf/quux'));
// Returns: '/foo/bar/baz/asdf');

// // ****path.extname(path)****

// Path.extname('index.html');
// // Returns: '.html'

// Path.extname('index.coffee.md');
// // Returns: '.md'

// Path.extname('index.');
// // Returns: '.'

// Path.extname('index');
// // Returns: ''

// Path.extname('.index');
// // Returns: ''

// Path.extname('.index.md');
// // Returns: '.md'

// // ***** path.format(pathObject) *****
Path.format({
    dir: 'C:\\path\\dir',
    base: 'file.txt',
  });
  // Returns: 'C:\\path\\dir\\file.txt'

//   ***** path.isAbsolute(path) ****

console.log(Path.isAbsolute('/foo/bar')); // true
console.log(Path.isAbsolute('/baz/..'));  // true
console.log(Path.isAbsolute('qux/'));     // false
console.log(Path.isAbsolute('.'));        // false
// Path.isAbsolute('//server');    // true
// Path.isAbsolute('\\\\server');  // true
// Path.isAbsolute('C:/foo/..');   // true
// Path.isAbsolute('C:\\foo\\..'); // true
// Path.isAbsolute('bar\\baz');    // false//this is all error thrown by window
// Path.isAbsolute('bar/baz');     // false
// Path.isAbsolute('.');           // false

// ***** path.relative(from,to)*****

console.log(Path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));
// Returns: '../../impl/bbb'

console.log(Path.relative('c:\\orandea\\test\\aaa', 'c:\\orandea\\impl\\bbb'));
// Returns: '..\\..\\impl\\bbb');

//******path.resolve([...paths])******
console.log(Path.resolve('/foo/bar', './baz')); 
// Returns: '/foo/bar/baz'

console.log(Path.resolve('/foo/bar', '/tmp/file/'));
// Returns: '/tmp/file'

console.log(Path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'));
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'

//******* path.sep *****
console.log('foo/bar/baz'.split(Path.sep));
// Returns: ['foo', 'bar', 'baz']);
console.log('foo\\bar\\baz'.split(Path.sep));
// Returns: ['foo', 'bar', 'baz']);