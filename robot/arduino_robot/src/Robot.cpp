#include "Robot.h"

// -- CONSTRUCTOR ---
Robot::Robot() {
  this->_reversedCmd = false;
}

// --- UTILS ---
void Robot::avancer(){
  digitalWrite(D1, HIGH);
  digitalWrite(D2, LOW);

  digitalWrite(D3, HIGH);
  digitalWrite(D4, LOW);
}

void Robot::gauche(){
  digitalWrite(D1, HIGH);
  digitalWrite(D2, LOW);

  digitalWrite(D3, HIGH);
  digitalWrite(D4, HIGH);
}

void Robot::droite(){
  digitalWrite(D1, HIGH);
  digitalWrite(D2, HIGH);

  digitalWrite(D3, HIGH);
  digitalWrite(D4, LOW);
}

void Robot::arr(){
  digitalWrite(D1, HIGH);
  digitalWrite(D2, HIGH);

  digitalWrite(D3, HIGH);
  digitalWrite(D4, HIGH);
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
  digitalWrite(D5, HIGH);
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
