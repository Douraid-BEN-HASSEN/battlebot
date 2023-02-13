#ifndef DEFINE_H
#define DEFINE_H

// +------------+
// | Constantes |
// +------------+

// --- WIFI ---
#define WIFI_SSID "IMERIR_IoT"
#define WIFI_PASSWORD "kohWoong5oox"

// --- MQTT ---
#define MQTT_HOST "broker.emqx.io"
#define MQTTT_CLIENT_ID "ESP8266Client - MyClient"
#define MQTT_USERNAME "emqx"
#define MQTT_PASSWORD "public"
#define MQTT_QOS 2
#define MQTT_TOPIC_INFORMATION "robot_information/"
#define MQTT_TOPIC_RESPONSE_ORDER "response_order/"
#define MQTT_TOPIC_SEND_ORDER "send_order/"

#if ASYNC_TCP_SSL_ENABLED
#define MQTT_SECURE true
#define MQTT_SERVER_FINGERPRINT {0x7e, 0x36, 0x22, 0x01, 0xf9, 0x7e, 0x99, 0x2f, 0xc5, 0xdb, 0x3d, 0xbe, 0xac, 0x48, 0x67, 0x5b, 0x5d, 0x47, 0x94, 0xd2}
#define MQTT_PORT 8883
#else
#define MQTT_PORT 1883
#endif

#define D1 5
#define D2 4
#define D3 0
#define D4 2
#define D5 14
#define D6 12

#endif