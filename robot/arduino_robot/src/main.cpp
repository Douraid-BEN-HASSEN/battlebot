#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <AsyncMqttClient.h>
#include "define.h"
#include "Robot.h"

// --- MQTT VARS ---
AsyncMqttClient mqttClient;
Ticker mqttReconnectTimer;

// --- WIFI VARS ---
WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;
Ticker wifiReconnectTimer;

// --- VARS ---
Robot robot;

void connectToMqtt();

// --- WIFI UTILS ---
void connectToWifi()
{
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}

void onWifiConnect(const WiFiEventStationModeGotIP& event)
{
  (void) event;
  Serial.print("Connected to Wi-Fi. IP address: ");
  Serial.println(WiFi.localIP());
  connectToMqtt();
}

void onWifiDisconnect(const WiFiEventStationModeDisconnected& event)
{
  (void) event;
  Serial.println("Disconnected from Wi-Fi.");
  mqttReconnectTimer.detach(); // ensure we don't reconnect to MQTT while reconnecting to Wi-Fi
  wifiReconnectTimer.once(2, connectToWifi);
}

// --- MQTT UTILS ---
void connectToMqtt()
{
  Serial.println("Connecting to MQTT...");
  mqttClient.connect();
}

void printSeparationLine()
{
  Serial.println("************************************************");
}

void onMqttConnect(bool sessionPresent)
{
  Serial.print("Connected to MQTT broker: ");
  Serial.print(MQTT_HOST);
  Serial.print(", port: ");
  Serial.println(MQTT_PORT);
  Serial.print("MQTT_TOPICs: ");
  Serial.print(MQTT_TOPIC_INFORMATION); Serial.print(", "); Serial.print(MQTT_TOPIC_RESPONSE_ORDER); Serial.print(", "); Serial.print(MQTT_TOPIC_SEND_ORDER); Serial.println("\n");

  // reset retained messages
  mqttClient.publish(MQTT_TOPIC_INFORMATION, MQTT_QOS, false, "-");
  mqttClient.publish(MQTT_TOPIC_RESPONSE_ORDER, MQTT_QOS, false, "-");
  mqttClient.publish(MQTT_TOPIC_SEND_ORDER, MQTT_QOS, false, "-");

  printSeparationLine();
  Serial.print("Session present: ");
  Serial.println(sessionPresent);

  uint16_t packetIdSubTopicInformation = mqttClient.subscribe(MQTT_TOPIC_INFORMATION, MQTT_QOS);
  Serial.print("Subscribing at QoS "); Serial.print(MQTT_QOS); Serial.print(" packetId: ");
  Serial.println(packetIdSubTopicInformation);

  uint16_t packetIdSubTopicResponseOrder = mqttClient.subscribe(MQTT_TOPIC_RESPONSE_ORDER, MQTT_QOS);
  Serial.print("Subscribing at QoS "); Serial.print(MQTT_QOS); Serial.print(" packetId: ");
  Serial.println(packetIdSubTopicResponseOrder);

  uint16_t packetIdSubTopicSendOrder = mqttClient.subscribe(MQTT_TOPIC_SEND_ORDER, MQTT_QOS);
  Serial.print("Subscribing at QoS "); Serial.print(MQTT_QOS); Serial.print(" packetId: ");
  Serial.println(packetIdSubTopicSendOrder);

  printSeparationLine();
}

void onMqttDisconnect(AsyncMqttClientDisconnectReason reason)
{
  int reasonp=(int)reason;
  Serial.println("ICI");
  Serial.println(reasonp);
  Serial.println("Disconnected from MQTT.");

  if (WiFi.isConnected())
  {
    mqttReconnectTimer.once(2, connectToMqtt);
  }
}

void onMqttSubscribe(const uint16_t& packetId, const uint8_t& qos)
{
  Serial.println("Subscribe acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
  Serial.print("  qos: ");
  Serial.println(qos);
}

void onMqttUnsubscribe(const uint16_t& packetId)
{
  Serial.println("Unsubscribe acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
}

void onMqttMessage(char* topic, char* payload, const AsyncMqttClientMessageProperties& properties, const size_t& len, const size_t& index, const size_t& total)
{
  (void) payload;
  if(String(topic) == String("robot_information/"))   robot.parseInformation(payload);
  else if(String(topic) == String("response_order/")) robot.parseResponseOrder(payload);
  else if(String(topic) == String("send_order/"))     robot.parseSendOrder(payload);
  else {
    Serial.println("Topic inconnu"); Serial.print(topic);
  }
  
}

void onMqttPublish(const uint16_t& packetId)
{
  Serial.println("Publish acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
}

void setup()
{
  Serial.begin(9600);

  // === pinMode ===
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);
  pinMode(D4, OUTPUT);
  pinMode(D5, OUTPUT);
  pinMode(D6, OUTPUT);
  
  while (!Serial && millis() < 5000);

  delay(300);

  // init wifi
  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);

  // init mqtt
  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  mqttClient.onSubscribe(onMqttSubscribe);
  mqttClient.onUnsubscribe(onMqttUnsubscribe);
  mqttClient.onMessage(onMqttMessage);
  mqttClient.onPublish(onMqttPublish);
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  mqttClient.setCredentials(MQTT_USERNAME, MQTT_PASSWORD);
#if ASYNC_TCP_SSL_ENABLED
  mqttClient.setSecure(MQTT_SECURE);
  if (MQTT_SECURE) {
    mqttClient.addServerFingerprint((const uint8_t[])MQTT_SERVER_FINGERPRINT);
  }
#endif
  connectToWifi(); // connect wifi
}

void loop()
{
  /*mqttClient.publish(MQTT_TOPIC_INFORMATION, MQTT_QOS, false, "{ \"sensor\": \"sensor_1\", \"time\": \"100@100\", \"data\": \"{ ""data1"": 123, ""data2"": ""data2val"" }\" }");
  mqttClient.publish(MQTT_TOPIC_RESPONSE_ORDER, MQTT_QOS, false, "{ \"status\": true, \"time\": \"100@100\", \"order_id\": 999 }");
  mqttClient.publish(MQTT_TOPIC_SEND_ORDER, MQTT_QOS, false, "{ \"time\": 1, \"left_wheel\": 0, \"right_wheel\": 0, \"order_id\": 1 }");*/
}