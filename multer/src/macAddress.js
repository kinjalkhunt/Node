import { networkInterfaces } from 'os';

// Get network interfaces
const interfaces = networkInterfaces();
let macAddress = null;

// Iterate over network interfaces
for (const key in interfaces) {
  for (const details of interfaces[key]) {
    // Check for MAC address and ensure it's not an internal interface
    if (details.mac && !details.internal) {
      macAddress = details.mac;
      break; // Exit loop once we find a MAC address
    }
  }
  if (macAddress) break; // Exit outer loop if MAC address is found
}

// Output the MAC address
console.log('MAC Address:', macAddress);


// import { exec } from 'child_process';

// function getMacAddress(ip) {
//   return new Promise((resolve, reject) => {
//     exec('arp -a', (error, stdout, stderr) => {
//       if (error) {
//         reject(`Error: ${stderr}`);
//         return;
//       }

//       const lines = stdout.split('\n');
//       for (let line of lines) {
//         if (line.includes(ip)) {
//           const parts = line.split(' ').filter(part => part !== '');
//           const mac = parts[1];
//           resolve(mac);
//           return;
//         }
//       }
//       reject('MAC address not found for the given IP address.');
//     });
//   });
// }

// const ipAddress = ' 192.168.29.33'; // Replace with the IP address you want to find the MAC address for
// getMacAddress(ipAddress)
//   .then(mac => console.log(`MAC Address: ${mac}`))
//   .catch(error => console.error(error));
