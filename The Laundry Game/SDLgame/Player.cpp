#include "Player.h"

Player::Player(GameState* gameState, SDL_Renderer* rend, const char* texture, int initX, int initY, int initSpeed) : GameObject(texture, rend, initX, initY) {
    speed = initSpeed;
    initialSpeed = initSpeed;

    this->gameState = gameState;

    x = this->gameState->spawnX;
    y = this->gameState->spawnY;

    printf("[event] player spawned %d, %d\n", x, y);

    srcRect.h = 16;
    srcRect.w = 16;
    srcRect.x = 0;
    srcRect.y = 0;
}

Player::~Player()
{}

void Player::handle_event(SDL_Event* evt)
{
}

void Player::update()
{
    if (!this->gameState->blockGameInteraction)
    {
        multiplier = 1.0;

        for (auto elem : gameState->arrows)
        {
            if (elem->rect->x == destRect.x && elem->rect->y == destRect.y) {
                printf("[event] player is on an arrow\n");
                switch (elem->direction)
                {

                case 1:
                    xvel = 0;
                    yvel = -speed;
                    orientation = 1;
                    break;
                case 2:
                    xvel = speed;
                    yvel = 0;
                    orientation = 0;
                    break;
                case 3:
                    xvel = 0;
                    yvel = speed;
                    orientation = 3;
                    break;
                case 4:
                    xvel = -speed;
                    yvel = 0;
                    orientation = 0;
                    break;

                default:
                    break;
                }
            }
        }

        for (auto elem : gameState->walls)
        {
            if (SDL_HasIntersection(&destRect, elem))
            {
                if (xvel == 0 && yvel == -speed) {
                    y -= speed;
                }
                else if (xvel == speed && yvel == 0) {
                    x -= speed;
                }
                else if (xvel == 0 && yvel == speed) {
                    y += speed;
                }
                else if (xvel == -speed && yvel == 0) {
                    x += speed;
                }
                xvel = 0;
                yvel = 0;
                gameState->gameOver = true;

            }
        }

        for (auto elem : gameState->puddles)
        {
            if (SDL_HasIntersection(&destRect, elem))
            {
                multiplier = 0.3;
            }
        }

        if (gameState->finishBlock->x == destRect.x && gameState->finishBlock->y == destRect.y)
        {
            gameState->gameOver = true;
            gameState->finishReached = true;
            xvel = 0;
            yvel = 0;
        }

        x += xvel * multiplier;
        y += yvel * multiplier;

        GameObject::update();
    }
}

void Player::render()
{
    SDL_RenderCopyEx(renderer, objTexture, &srcRect, &destRect, 90 * orientation, NULL, SDL_FLIP_NONE);
}