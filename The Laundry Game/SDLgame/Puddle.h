#pragma once
#include "Game.h"
#include "GameObject.h"
#include "Block.h"
#include "GameState.h"

class Puddle : public Block {
public:
    Puddle(const char* texture, SDL_Renderer* rend, int blockX, int blockY, GameState* gameState);
    ~Puddle();

    void handle_event(SDL_Event* evt);
    void update();
    void render();
private:
    GameState* gameState;
};