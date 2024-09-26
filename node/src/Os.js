

import { log } from 'console';

import os from 'os';

console.log(os.tmpdir());
// Output    C:\Users\ventura\AppData\Local\Temp
// Returns the operating system's default directory for temporary files as a string.


console.log(os.type());
// // Output       Windows_NT
// function shall store information identifying the current system in the structure pointed to by name.

// console.log(os.platform());
// // Output       win32

// console.log(os.arch());
// // Output       x64

// console.log(os.release());
// // Output       10.0.22631

// console.log(os.cpus());
// // Output      
// //  [
// //   {
// //     model: 'Intel(R) Core(TM) i7-8665U CPU @ 1.90GHz',
// //     speed: 2112,
// //     times: { user: 60921, nice: 0, sys: 34453, idle: 181218, irq: 1593 }
// //   },
// //   {
// //     model: 'Intel(R) Core(TM) i7-8665U CPU @ 1.90GHz',
// //     speed: 2112,
// //     times: { user: 61078, nice: 0, sys: 26921, idle: 188265, irq: 625 }
// //   },
// //   {
// //     model: 'Intel(R) Core(TM) i7-8665U CPU @ 1.90GHz',
// //     speed: 2112,
// //     times: { user: 68593, nice: 0, sys: 29546, idle: 178125, irq: 625 }
// //   },
// //   {
// //     model: 'Intel(R) Core(TM) i7-8665U CPU @ 1.90GHz',
// //     speed: 2112,
// //     times: { user: 69125, nice: 0, sys: 25828, idle: 181312, irq: 375 }
// //   },
// //   {
// //     model: 'Intel(R) Core(TM) i7-8665U CPU @ 1.90GHz',
// //     speed: 2112,
// //     times: { user: 62250, nice: 0, sys: 36171, idle: 177843, irq: 968 }
// //   },
// //   {
// //     model: 'Intel(R) Core(TM) i7-8665U CPU @ 1.90GHz',
// //     speed: 2112,
// //     times: { user: 60109, nice: 0, sys: 25390, idle: 190765, irq: 640 }
// //   },
// //   {
// //     model: 'Intel(R) Core(TM) i7-8665U CPU @ 1.90GHz',
// //     speed: 2112,
// //     times: { user: 64375, nice: 0, sys: 28921, idle: 182968, irq: 562 }
// //   },
// //   {
// //     model: 'Intel(R) Core(TM) i7-8665U CPU @ 1.90GHz',
// //     speed: 2112,
// //     times: { user: 63578, nice: 0, sys: 25375, idle: 187312, irq: 406 }
// //   }
// // ]

// console.log(os.totalmem());
// // Output

// console.log(os.freemem());
// // Output

// console.log(os.loadavg());
// // Output

// console.log(os.homedir());
// // Output

// console.log(os.uptime());
// // Output

// console.log(os.userInfo());
// // Output

// console.log(os.hostname());
// // Output

// console.log(os.version());
// // Output