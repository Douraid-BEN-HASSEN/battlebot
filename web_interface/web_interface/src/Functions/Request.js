import axios from "axios"

const sendRequest = (address, port, path, content) => {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
            topic: 'robot_information',
            message: "message_test"
        })
    }
    fetch("http://10.3.2.25:80/api/send_orders/", requestOptions).then(response => console.log(response))
}

const sendRequests = (address, port, path, content) => {
    if (address instanceof String || port instanceof String) {
        //console.log("Return error")
        return -1
    }

    const requestOptions = {
        method : 'POST' , 
        mode : 'cors' , 
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }, 
        body : JSON.stringify(content)
    }

    fetch("http//"+address+":"+port+"/api/send_orders/")
    /*
    axios.options("http://" + address + ":" + port + "/api/test/", {
        params: {
            topic: "robot_information",
            message: "message_test"
        },
    }
    ).then((res) => {
        //console.log("resultat requete : ", res)
    }).catch((err) => console.log("erreur : ", err));
    */
}

const turnRight = (address, port, path, isInversed) => {
    sendRequest(address, port, path, {
        topic: 'send_order', message: {
            time: 1,
            left_wheel: isInversed ? -1 : 1,
            right_wheel: isInversed ? 1 : -1,
            order_id: 1,
            shovel: -2
        }
    })
}

const turnLeft = (address, port, path, isInversed) => {
    sendRequest(address, port, path, {
        topic: 'send_order', message: {
            time: 1,
            left_wheel: isInversed ? 1 : -1,
            right_wheel: isInversed ? -1 : +1,
            order_id: 1,
            shovel: -2
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
            shovel: -2
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
            shovel: -2
        }
    })
}
const stopp = (address, port, path) => {
    sendRequest(address, port, path, {
        topic: 'send_order', message: {
            time: 1,
            left_wheel: 0,
            right_wheel: 0,
            order_id: 1,
            shovel: 0
        }
    })
}

const upShovel = (address, port, path) => {
    sendRequest(address, port, path, {
        topic: 'send_order', message: {
            time: 1,
            left_wheel: 0,
            right_wheel: 0,
            order_id: 1,
            shovel: +1
        }
    })
}

const downShovel = (address, port, path) => {
    sendRequest(address, port, path, {
        topic: 'send_order', message: {
            time: 1,
            left_wheel: 0,
            right_wheel: 0,
            order_id: 1,
            shovel: -1
        }
    })
}

export { sendRequest, turnLeft, turnRight, goFront, goBack, stopp, upShovel, downShovel }