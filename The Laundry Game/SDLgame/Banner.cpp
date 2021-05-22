#pragma once
#include "Banner.h"

Banner::Banner(
        GameState* gameState, SDL_Renderer* rend, const char* texture,
        int bannerX, int bannerY, 
        int bannerW, int bannerH, 
        int texturePosX = 0, int texturePosY = 0,
        int timeOnScreen = 0, bool blockGameInteraction = false) : GameObject(texture, rend, bannerX, bannerY) {

    x = bannerX;
    y = bannerY;

    this->gameState = gameState;
    this->timeOnScreen = timeOnScreen;
    this->blockGameInteraction = blockGameInteraction;

    srcRect.h = bannerH;
    srcRect.w = bannerW;
    srcRect.x = texturePosX;
    srcRect.y = texturePosY;

    this->gameState->blockGameInteraction = this->blockGameInteraction;
}

Banner::~Banner()
{}

void Banner::handle_event(SDL_Event* evt)
{
}

void Banner::update()
{
    if (timeOnScreen != 0) {
        if (curTime < timeOnScreen) {
            curTime++;
        }
        else {
            timeIsUp = true;
        }
    }

    destRect.x = x;
    destRect.y = y;
    destRect.w = srcRect.w;
    destRect.h = srcRect.h;
}

void Banner::render()
{
    GameObject::render();
}