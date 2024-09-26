// import fs from 'fs';

// fs.mkdir('./abcd', (err) => {
//     if (err) {
//         console.log("error creating directory:", err);
//     } else {
//         console.log("directory created successfully");
//         // console.log("create file");
//     }   
// });
// console.log("create file");

// import fs from 'fs';

// async function createDirectory() {
//     try {
//         await fs.mkdir('./abcd');
//         console.log("directory created successfully");
//         // console.log("create file");
//     } catch (err) {
//         console.log("error creating directory:", err);
//     }
//     console.log("create file");

// }


// createDirectory();

import { promises as fs } from 'fs';

async function createDirectory() {
    try {
        await fs.mkdir('./asds');
        console.log("directory created successfully");
    } catch (err) {
        console.error("error creating directory:", err);
    }
    console.log("create file");
}

createDirectory();



