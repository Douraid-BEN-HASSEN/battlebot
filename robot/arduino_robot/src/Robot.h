// +---------------------------------+
// | Classe pour la gestion du Robot |
// +---------------------------------+

class Robot {
  public:
    // -- CONSTRUCTOR ---
    Robot();

    // -- DESTRUCTOR ---
    ~Robot();

    // --- UTILS ---
    void right(); // méthode pour aller vers la droite
    void left(); // méthode pour aller vers la gauche
    void up(); // méthode pour aller vers le haut
    void down(); // méthode pour aller vers le bas
    void accelerer();
    void ralentir();
    void reverseCmd(); // méthode pour inverser les commandes

    // --- GETTER ---
    bool isReversedCmd();

    // --- SETTER ---
    void setReversedCmd(bool pReversedCmd);

  private:
    bool _reversedCmd;

};