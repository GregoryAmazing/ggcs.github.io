#pragma once
#include "Game.h"
#include "GameObject.h"


class Block : public GameObject {
public:
    Block(const char* texture, SDL_Renderer* rend, int blockX, int blockY, int texturePosX = 0, int texturePosY = 0);
    ~Block();

    void handle_event(SDL_Event* evt);
    void update();
    void render();
};
