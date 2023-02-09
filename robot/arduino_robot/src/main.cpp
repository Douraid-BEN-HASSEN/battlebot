#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <AsyncMqttClient.h>
#include <ArduinoJson.h>
#include "define.h"

// --- MQTT VARS ---
AsyncMqttClient mqttClient;
Ticker mqttReconnectTimer;

// --- WIFI VARS ---
WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;
Ticker wifiReconnectTimer;

// --- VARS ---
DynamicJsonDocument doc(1024);

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
  Serial.print("MQTT_TOPIC: ");
  Serial.println(MQTT_TOPIC);

  printSeparationLine();
  Serial.print("Session present: ");
  Serial.println(sessionPresent);

  uint16_t packetIdSub = mqttClient.subscribe(MQTT_TOPIC, 2);
  Serial.print("Subscribing at QoS 2, packetId: ");
  Serial.println(packetIdSub);

  mqttClient.publish(MQTT_TOPIC, 0, true, "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}");
  Serial.println("Publishing at QoS 0");

  uint16_t packetIdPub1 = mqttClient.publish(MQTT_TOPIC, 1, true, "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}");
  Serial.print("Publishing at QoS 1, packetId: ");
  Serial.println(packetIdPub1);

  uint16_t packetIdPub2 = mqttClient.publish(MQTT_TOPIC, 2, true, "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}");
  Serial.print("Publishing at QoS 2, packetId: ");
  Serial.println(packetIdPub2);

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
  Serial.println("Publish received.");
  /*Serial.print("  topic: ");
  Serial.println(topic);
  Serial.print("  qos: ");
  Serial.println(properties.qos);
  Serial.print("  dup: ");
  Serial.println(properties.dup);
  Serial.print("  retain: ");
  Serial.println(properties.retain);
  Serial.print("  len: ");
  Serial.println(len);
  Serial.print("  index: ");
  Serial.println(index);
  Serial.print("  total: ");
  Serial.println(total);*/
  Serial.print(" message: "); Serial.println(payload);
  deserializeJson(doc, payload);
  const char* sensor = doc["sensor"];
  Serial.println(sensor);
}

void onMqttPublish(const uint16_t& packetId)
{
  Serial.println("Publish acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
}

// --- MAE UTILS ---
void MAE() {
  int v = 0;
  int b = 0;
  switch(v) {
    case 0:
      b = 0;
      break;
    case 1:
      b = 0;
      break;
    default:
      b = 0;
  }
}

void setup()
{
  Serial.begin(9600);

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
  delay(1000);
  mqttClient.publish(MQTT_TOPIC, 0, true, "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}");
}