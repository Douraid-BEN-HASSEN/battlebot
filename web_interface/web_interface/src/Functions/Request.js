import axios from "axios"

const sendRequest = (address, port, path, content) => {
    console.log(content)
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
            topic: 'send_order/',
            message: JSON.stringify(content.message)
        })
    }
    fetch("http://10.3.2.25:80/api/send_orders/", requestOptions).then(response => console.log(response))
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
