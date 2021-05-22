#pragma once
#include "Game.h"
#include "GameObject.h"
#include "Block.h"
#include "GameState.h"
#include "Arrow.h"

class Ground : public Block {
public:
    Ground(const char* texture, SDL_Renderer* rend, int blockX, int blockY, GameState* gameState, bool isSpawnBlock = false);
    ~Ground();

    void handle_event(SDL_Event* evt);
    void update();
    void render();
    int getX() { return x; };
    int getY() { return y; };

private:
    bool mouseHovering();
    bool enterPressed = false;
    bool backspacePressed = false;
    bool pressedOnce = true;

    bool isSpawnBlock;

    int tileRotation;
    int arrowDirection = 0;

    SDL_Rect arrowSrcRect;
    Arrow arrow;
    GameState* gameState;

};
