import axios from "axios"

const sendRequest = (address, port, path, content) => {
    if (address instanceof String || port instanceof String) {
        //console.log("Return error")
        return -1
    }

    axios.post("http://" + address + ":" + port + "/api/send_orders", {
        headers: {
            "Content-Type": "application/json",
        },
        topic: content?.topic,
        message: content?.message
    }).then((res) => {
        //console.log("resultat requete : ", res)
    }).catch((err) => console.log("erreur : ", err));

}

const turnRight = (address, port, path) => {
    //console.log("turn right")
    sendRequest(address, port, path, {
        topic: 'send_order', message: {
            time: 1,
            left_wheel: 1,
            right_wheel: -1,
            order_id: 1 , 
            shovel : -2 
        }
    })
}

const turnLeft = (address, port, path) => {
    //console.log("turn left")
    //console.log("turn left")
    sendRequest(address, port, path, {
        topic: 'send_order', message: {
            time: 1,
            left_wheel: -1,
            right_wheel: +1,
            order_id: 1 ,
            shovel : -2 
        }
    })
}
const goFront = (address, port, path) => {
    sendRequest(address, port, path, {
        topic: 'send_order', message: {
            time: 1,
            left_wheel: 1,
            right_wheel: 1,
            order_id: 1,
            shovel : -2 
        }
    })
}
const goBack = (address, port, path) => {
    sendRequest(address, port, path, {
        topic: 'send_order', message: {
            time: 1,
            left_wheel: -1,
            right_wheel: -1,
            order_id: 1,
            shovel : -2 
        }
    })
}
const stopp = (address, port, path) => {
    sendRequest(address, port, path, {
        topic: 'send_order', message: {
            time: 1,
            left_wheel: 0,
            right_wheel: 0,
            order_id: 1 ,
            shovel : 0 
        }
    })
}

const upShovel = (address, port, path) => {
    sendRequest(address, port, path, {
        topic : 'send_order' , message: {
            time : 1 ,
            left_wheel : 0 , 
            right_wheel : 0 ,
            order_id : 1 ,
            shovel : +1 
        }
    })
}

const downShovel =(address, port,path) => {
    sendRequest(address , port, path , {
        topic : 'send_order' , message: {
            time : 1 , 
            left_wheel : 0 , 
            right_wheel : 0 ,
            order_id : 1 , 
            shovel : -1 
        }
    })
}

export { sendRequest, turnLeft, turnRight, goFront, goBack, stopp , upShovel , downShovel }