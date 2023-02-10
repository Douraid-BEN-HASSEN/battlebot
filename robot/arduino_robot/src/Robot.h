// +---------------------------------+
// | Classe pour la gestion du Robot |
// +---------------------------------+
#include <Arduino.h>

struct ROBOT_INFORMATION {
    String sensor;
    String time;
    String data;
};

struct RESPONSE_ORDER {
    bool message;
    String time;
    int order_id;
};

struct SEND_ORDER {
    String time;
    int left_wheel;
    int right_wheel;
    int order_id;
};

class Robot {
  public:
    // -- CONSTRUCTOR ---
    Robot();

    // -- DESTRUCTOR ---
    ~Robot();

    // --- UTILS ---
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

};