import axios from "axios"

const sendRequest = (address, port, path , content) => {
    console.log("function sendRequest" , address , port , path , content)
    console.log(typeof(address))
    console.log(typeof(port))
    if (address instanceof String || port instanceof String) {
        console.log("Return error")
        return -1
    }
    axios.post(address + ":" + port + "/" + path, {
        headers: {

        },
        content : {
            content
        }
    }).then((res) => {
        console.log("resultat requete : ", res)
    }).catch((err) => console.log("erreur : ", err));
}

export { sendRequest }