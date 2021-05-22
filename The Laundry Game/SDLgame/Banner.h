#pragma once
#include "Game.h"
#include "GameObject.h"
#include "GameState.h"

class Banner : public GameObject {
public:
    Banner(GameState* gameState, SDL_Renderer* rend, const char* texture, int blockX, int blockY, int bannerW, int bannerH, int texturePosX, int texturePosY, int timeOnScreen, bool blockGameInteraction);
    ~Banner();

    void handle_event(SDL_Event* evt);
    void update();
    void render();
    
    bool timeIsUp = false;
    bool blockGameInteraction = false;
    

private:
    int w = 0;
    int h = 0;
    int timeOnScreen = 0;
    int curTime = 0;
    GameState* gameState;
};
#pragma once
