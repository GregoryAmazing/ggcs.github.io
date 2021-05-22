#pragma once
#include "Game.h"
#include "GameObject.h"
#include "GameState.h"


class Player : public GameObject {
public:
    Player(GameState* gameState, SDL_Renderer* rend, const char* texture, int initX, int initY, int initSpeed);
    ~Player();

    void handle_event(SDL_Event* evt);
    void update();
    void render();

private:
    float xvel = 0;
    float yvel = 0;
    int initialSpeed = 0;
    int speed = 0;
    float multiplier = 1;
    int orientation = 0;
    bool isOnPuddle = false;
    GameState* gameState;
};
