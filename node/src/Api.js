import axios from "axios"
// const axios = require('axios');

        // async function getData() {
        //   try {
        //     const response = await axios.get('https://663cb35717145c4d8c374f0d.mockapi.io/weetech/');
        //     console.log(response.data);
        //   } catch (error) {
        //     console.error('Error fetching data:', error);
        //   }
        // }
        
        // getData();

      //   function getdata(){
      //     return new Promise((resolve, reject) => {
      //         axios.get(`https://6620ad5e3bf790e070b0427b.mockapi.io/kl`)
      //             .then(response => {//resolve part
      //                 console.log("row-data in method ==>", response.data);
                      
      //             })
      //             .catch(error => {//reject part
      //                 reject(error);
      //             });
      //     });
      // }
      


        // async function getdata(){
        //       const rowdata = await axios.get(`https://6620ad5e3bf790e070b0427b.mockapi.io/kl`);
        //       console.log("row-data in method ==>",rowdata.data);
        //       return rowdata.data;
        //   }
        //   const datafromApi = await getdata()
        //   console.log(123456);
        //   console.log(`after method calling ==>`,datafromApi);
        //   console.log("98763");
          
        
        // function getdata(){
        //    axios.get('https://663cb35717145c4d8c374f0d.mockapi.io/weetech/')
        //    .then(rowdata)=>{
        //     console.log("darta ===>",rowdata.data);
        //   }
        //   .catch(error)=>{
        //     console.log("error in catch===");
        //   };

        // }

        function getdata() {
          axios.get('https://663cb35717145c4d8c374f0d.mockapi.io/weetech/')
              .then((rowdata) => {
                  console.log("data ===>", rowdata.data);
              })
              .catch((error) => {
                  console.log("error in catch ===", error);
              });
      }
      getdata();
        

