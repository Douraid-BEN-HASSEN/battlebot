const sendRequest = (content) => {
    console.log("send request")

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
            topic: 'send_order/',
            message: JSON.stringify(content.message)
        })
    }
    fetch("http://10.3.2.25:80/api/send_orders/", requestOptions).then(response => console.log(response) )
    
}


const turnRight = (isInversed) => {
    sendRequest({
        topic: 'send_order', message: {
            time: 1,
            left_wheel: isInversed ? -1 : 1,
            right_wheel: isInversed ? 1 : -1,
            order_id: 1,
            shovel: -2
        }
    })
}

const turnLeft = (isInversed) => {
    sendRequest({
        topic: 'send_order', message: {
            time: 1,
            left_wheel: isInversed ? 1 : -1,
            right_wheel: isInversed ? -1 : +1,
            order_id: 1,
            shovel: -2
        }
    })
}
const goFront = () => {
    sendRequest({
        topic: 'send_order', message: {
            time: 1,
            left_wheel: 1 /*1 */,
            right_wheel: 1,
            order_id: 1,
            shovel: -2
        }
    })
}
const goBack = () => {
    sendRequest({
        topic: 'send_order', message: {
            time: 1,
            left_wheel: -1,
            right_wheel: -1,
            order_id: 1,
            shovel: -2
        }
    })
}
const stopp = () => {
    console.log("function stopp")
    sendRequest({
        topic: 'send_order', message: {
            time: 1,
            left_wheel: 0,
            right_wheel: 0,
            order_id: 1,
            shovel: 0
        }
    })
}

const upShovel = () => {
    sendRequest({
        topic: 'send_order', message: {
            time: 1,
            left_wheel: 0,
            right_wheel: 0,
            order_id: 1,
            shovel: +1
        }
    })
}

const downShovel = () => {
    sendRequest({
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
