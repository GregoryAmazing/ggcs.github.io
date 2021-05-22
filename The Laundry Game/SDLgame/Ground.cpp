#pragma once
#include "Game.h"
#include "Block.h"
#include "Ground.h"
#include <stdlib.h> 


int rangeRandom(int min, int max) {
    int n = max - min + 1;
    int remainder = RAND_MAX % n;
    int x;
    do {
        x = rand();
    } while (x >= RAND_MAX - remainder);
    return min + x % n;
}

Ground::Ground(const char* texture, SDL_Renderer* rend, int blockX, int blockY, GameState* gameState, bool isSpawnBlock) : Block(texture, rend, blockX, blockY) {
    x = blockX * 64;
    y = blockY * 64;
    this->isSpawnBlock = isSpawnBlock;
    this->gameState = gameState;

    tileRotation = 0;

    srcRect.h = 16;
    srcRect.w = 16;
    srcRect.y = 0;

    if (isSpawnBlock)
    {
        srcRect.x = 80;
    }
    else { srcRect.x = 48; }

    arrowSrcRect.h = 16;
    arrowSrcRect.w = 16;
    arrowSrcRect.x = 32;
    arrowSrcRect.y = 0;

    arrow.rect = &destRect;
}

Ground::~Ground()
{}

void Ground::handle_event(SDL_Event* evt)
{
    switch (evt->type) {
        // Look for a keypress
    case SDL_KEYDOWN:
        switch (evt->key.keysym.sym) {
        case SDLK_q:
            enterPressed = true;
            break;
        case SDLK_w:
            backspacePressed = true;
            break;

        default:
            break;
        }

        break;
    case SDL_KEYUP:
        switch (evt->key.keysym.sym) {
        case SDLK_q:
            enterPressed = false;
            pressedOnce = true;
            break;
        case SDLK_w:
            backspacePressed = false;
            break;

        default:
            break;
        }

        break;
    default:
        break;
    }
}

bool Ground::mouseHovering()
{
    int mouseX, mouseY = 0;
    SDL_GetMouseState(&mouseX, &mouseY);
        if ((mouseX > x) && (mouseX < x + 64) &&
            (mouseY > y) && (mouseY < y + 64))
        {
            return true;
        }
        else
        {
            return false;
        }
}

void Ground::update()
{
    if (mouseHovering() and !this->gameState->blockGameInteraction)
    {
        if (enterPressed && pressedOnce)
        {
            if (gameState->currArrowAmount < gameState->maxArrowAmount || arrowDirection != 0)
            {
                if (arrowDirection == 0) {
                    gameState->currArrowAmount++;
                    gameState->arrows.push_back(&arrow);
                }
                if (arrowDirection < 4)
                {
                    arrowDirection++;
                }
                else
                {
                    arrowDirection = 1;
                }
            }

            for (auto elem : gameState->arrows)
            {
                if (elem->rect == &destRect) {
                    arrow.direction = arrowDirection;
                }
            }

            pressedOnce = false;
            
            
        }
        else if (backspacePressed && arrowDirection !=0)
        {
            arrowDirection = 0;
            gameState->currArrowAmount--;

            for (auto elem : gameState->arrows)
            {
                if (elem->rect == &destRect) {
                    gameState->arrows.erase(find(gameState->arrows.begin(), gameState->arrows.end(), elem));
                }
            }
        }
        else {/*do nothing*/}
    }

    destRect.x = x;
    destRect.y = y;
    destRect.w = srcRect.w * 4;
    destRect.h = srcRect.h * 4;
}

void Ground::render()
{
    SDL_RenderCopyEx(renderer, objTexture, &srcRect, &destRect, tileRotation * 90, NULL, SDL_FLIP_NONE);

    if (arrowDirection != 0)
    {
        SDL_RenderCopyEx(renderer, objTexture, &arrowSrcRect, &destRect, 90 * (arrowDirection-1), NULL, SDL_FLIP_NONE);
    }
}