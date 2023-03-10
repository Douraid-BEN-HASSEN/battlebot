#include "Robot.h"

// -- CONSTRUCTOR ---
Robot::Robot() {
  this->_reversedCmd = false;

  this->_information = {
    "-",
    "-",
    "-"
  };

  this->_responseOrder = {
    false,
    "-",
    -1
  };

  this->_sendOrder = {
    "-",
    -1,
    -1,
    -1,
    -1
  };

  this->_retainInformationAlreadyRecieved = false;
  this->_retainResponseOrderAlreadyRecieved = false;
  this->_retainSendOrderAlreadyRecieved = false;
  
}

// --- UTILS ---
void Robot::parseInformation(char* pPayload) {
  if(!this->_retainInformationAlreadyRecieved || pPayload == "-") {
    this->_retainInformationAlreadyRecieved = true;
    return;
  }

  DynamicJsonDocument doc(1024);
  deserializeJson(doc, pPayload);

  this->_information = {
    sensor: doc["sensor"],
    time: doc["time"],
    data: doc["data"]
  };

  Serial.print("ROBOT_INFORMATION => { sensor: ");
  Serial.print(this->_information.sensor);
  Serial.print(", time: ");
  Serial.print(this->_information.time);
  Serial.print(", data: ");
  Serial.print(this->_information.data);
  Serial.print(" }");
  Serial.println("\n");
  

  // TODO: action à faire...
}

void Robot::parseResponseOrder(char* pPayload) {
  if(!this->_retainResponseOrderAlreadyRecieved || pPayload == "-") {
    this->_retainResponseOrderAlreadyRecieved = true;
    return;
  }
  
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, pPayload);
  
  this->_responseOrder = {
    status: doc["status"],
    time: doc["time"],
    order_id: doc["order_id"]
  };

  Serial.print("RESPONSE_ORDER => { status: ");
  Serial.print(this->_responseOrder.status);
  Serial.print(", time: ");
  Serial.print(this->_responseOrder.time);
  Serial.print(", order_id: ");
  Serial.print(this->_responseOrder.order_id);
  Serial.print(" }");
  Serial.println("\n");

  // TODO: action à faire...
}

void Robot::parseSendOrder(char* pPayload) {
  if(!this->_retainSendOrderAlreadyRecieved || pPayload == "-") {
    this->_retainSendOrderAlreadyRecieved = true;
    return;
  }

  DynamicJsonDocument doc(1024);
  deserializeJson(doc, pPayload);

  this->_sendOrder = {
    time: doc["time"],
    left_wheel: doc["left_wheel"],
    right_wheel: doc["right_wheel"],
    shovel: doc["shovel"],
    order_id: doc["order_id"]
  };

  Serial.print("SEND_ORDER => { time: ");
  Serial.print(this->_sendOrder.time);
  Serial.print(", left_wheel: ");
  Serial.print(this->_sendOrder.left_wheel);
  Serial.print(", right_wheel: ");
  Serial.print(this->_sendOrder.right_wheel);
  Serial.print(", shovel: ");
  Serial.print(this->_sendOrder.shovel);
  Serial.print(", order_id: ");
  Serial.print(this->_sendOrder.order_id);
  Serial.print(" }");
  Serial.println("\n");
  
  // TODO: action à faire...
  // gestion movements direction
  if(this->_sendOrder.left_wheel == -1 && this->_sendOrder.right_wheel == -1) this->arr();
  if(this->_sendOrder.left_wheel == 0 && this->_sendOrder.right_wheel == 0) this->stope();
  if(this->_sendOrder.left_wheel == 1 && this->_sendOrder.right_wheel == 1) this->avancer();
  if(this->_sendOrder.left_wheel == 1 && this->_sendOrder.right_wheel == -1) this->gauche();
  if(this->_sendOrder.left_wheel == -1 && this->_sendOrder.right_wheel == 1) this->droite();

  // gestion movements pelle
  if(this->_sendOrder.shovel == -1) this->pelleB();
  if(this->_sendOrder.shovel == 0) this->pelleS();
  if(this->_sendOrder.shovel == 1) this->pelleH();

  // order traité, informer le serveur 
}

void Robot::avancer(){
  digitalWrite(D1, HIGH);
  digitalWrite(D2, HIGH);

  digitalWrite(D3, HIGH);
  digitalWrite(D4, HIGH);
}

void Robot::gauche(){
  digitalWrite(D1, HIGH);
  digitalWrite(D2, HIGH);

  digitalWrite(D3, HIGH);
  digitalWrite(D4, LOW);
}

void Robot::droite(){
  digitalWrite(D1, HIGH);
  digitalWrite(D2, HIGH);

  digitalWrite(D3, LOW);
  digitalWrite(D4, HIGH);
}

void Robot::arr(){
  digitalWrite(D1, HIGH);
  digitalWrite(D2, HIGH);

  digitalWrite(D3, LOW);
  digitalWrite(D4, LOW);
}

void Robot::stope(){
  digitalWrite(D1, LOW);
  digitalWrite(D2, LOW);

  digitalWrite(D3, LOW);
  digitalWrite(D4, LOW);
}

void Robot::pelleS(){
  digitalWrite(D5, LOW);
  digitalWrite(D6, LOW);
}

void Robot::pelleH(){
  digitalWrite(D5, LOW);
  digitalWrite(D6, HIGH);
}

void Robot::pelleB(){
  digitalWrite(D5, HIGH);
  digitalWrite(D6, LOW);
}

void Robot::reverseCmd() {
  this->_reversedCmd = !this->_reversedCmd;
}

// --- GETTER ---
bool Robot::isReversedCmd() {
  return this->_reversedCmd;
}
    
// --- SETTER ---

// -- DESTRUCTOR ---
Robot::~Robot() {

}
