#include "Robot.h"

// -- CONSTRUCTOR ---
Robot::Robot() {
  this->_reversedCmd = false;
}

// --- UTILS ---
void Robot::right() {

}

void Robot::left() {

}

void Robot::up() {

}

void Robot::down() {

}

void Robot::accelerer() {

}

 void Robot::ralentir() {

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
