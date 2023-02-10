#ifndef ROBOT_H
#define ROBOT_H
// +---------------------------------+
// | Classe pour la gestion du Robot |
// +---------------------------------+
#include <Arduino.h>
#include <ArduinoJson.h>

struct ROBOT_INFORMATION {
    String sensor;
    String time;
    String data;
};

struct RESPONSE_ORDER {
    bool status;
    String time;
    int order_id;
};

struct SEND_ORDER {
    String time;
    int left_wheel;
    int right_wheel;
    int shovel;
    int order_id;
};

class Robot {
  public:
    // -- CONSTRUCTOR ---
    Robot();

    // -- DESTRUCTOR ---
    ~Robot();

    // --- UTILS ---
    void parseInformation(char* pPayload);
    void parseResponseOrder(char* pPayload);
    void parseSendOrder(char* pPayload);

    void avancer();
    void gauche();
    void droite();
    void arr();
    void stope();
    void pelleS();
    void pelleH();
    void pelleB();
    void reverseCmd();
    
    // --- GETTER ---
    bool isReversedCmd();

    // --- SETTER ---
    void setReversedCmd(bool pReversedCmd);

  private:
    bool _reversedCmd;
    ROBOT_INFORMATION _information;
    RESPONSE_ORDER _responseOrder;
    SEND_ORDER _sendOrder;
};

#endif