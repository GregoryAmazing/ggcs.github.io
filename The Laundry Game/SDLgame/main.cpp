#include "Game.h"

Game* game;

int main(int argc, char* argv[]) {
	
	const int fps = 60;
	const int frameDelay = 1000 / fps;

	Uint32 frameStart;
	int frameTime;

	game = new Game();
	game->init("The Most Epic Game Ever Created", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, 640, 640, false);

	while (game->running()) {

		frameStart = SDL_GetTicks();

		SDL_Event event;

		while (SDL_PollEvent(&event))
			if (event.type == SDL_QUIT)
				return 0;
			else
				game->handle_event(&event);

		game->update();
		game->render();

		frameTime = SDL_GetTicks() - frameStart;

		if (frameDelay > frameTime) {
			SDL_Delay(frameDelay - frameTime);
		}
	}

	game->clean();

	return 0;
}