#pragma once
#include "Game.h"
#include "GameObject.h"
#include "Block.h"
#include "GameState.h"

class Wall : public Block {
public:
    Wall(const char* texture, SDL_Renderer* rend, int blockX, int blockY, GameState* gameState);
    ~Wall();

    void handle_event(SDL_Event* evt);
    void update();
    void render();
private:
    GameState* gameState;
};

