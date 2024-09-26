import axios from "axios"


const callApi = async (req, res) => {

    try {
        const response = await axios.get('https://663cb35717145c4d8c374f0d.mockapi.io/weetech/names')

        res.status(203).send({
            status: 203,
            data: response.data
        })


      }  catch(error){
                res.status(400).send(error.error)

    }
}
  

export default callApi;