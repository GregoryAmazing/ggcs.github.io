#include "Game.h"
#include "TextureManager.h"
#include "GameObject.h"

#include "Player.h"

#include "Block.h"
#include "Ground.h"
#include "Wall.h"
#include "FinishBlock.h"
#include "Puddle.h"

#include "Button.h"
#include "Banner.h"
#include "GameState.h"

#include <vector>
#include "nlohmann/json.hpp"
#include <fstream>
#include <string>  

using json = nlohmann::json;
using namespace std;

GameState gameState;

vector<GameObject*> enteties;
vector<GameObject*> listeners;
vector<Banner*> banners;
vector<Button*> buttons;

Banner* banner;
Player* player;

const char* tilesTexturePath = "assets/tiles.png";

int maxLevelProgress = 1;
int levelProgress = 1;
const char* levelFilePath = "level/testing.json";

void SummonPlayer(SDL_Renderer* renderer)
{
	if (player == NULL and !gameState.blockGameInteraction)
	{
		player = new Player(&gameState, renderer, tilesTexturePath, 0, 0, 4);
		enteties.push_back(player);
	}
}

void ClearGameObjects() {
	enteties.clear();
	listeners.clear();
	banners.clear();
	buttons.clear();
	player = NULL;
	gameState.clear();
}

void SetMaxLevelProgress()
{
	json levelFile;
	ifstream file(levelFilePath);
	file >> levelFile;

	maxLevelProgress = levelFile["maxLevelProgress"];

	file.close();
}

void LoadLevel(string levelID, SDL_Renderer* renderer)
{
	// Clearing map

	ClearGameObjects();

	// Loading Map

	json levelFile;
	ifstream file(levelFilePath);
	file >> levelFile;

	int blockY = 0;

	gameState.maxArrowAmount = levelFile[levelID]["maxArrows"];

	cout << "{system} Loading level " << levelID << " from " << levelFilePath << "\n";

	for (auto blockRow : levelFile[levelID]["level"])
	{
		cout << " | ";
		for (size_t blockX = 0; blockX < 10; blockX++)
		{
			if (blockRow[blockX] == 0)
			{
				Ground* newGroundBlock = new Ground(tilesTexturePath, renderer, blockX, blockY, &gameState);

				enteties.push_back(newGroundBlock);
				listeners.push_back(newGroundBlock);
			}
			else if (blockRow[blockX] == 1) {
				Wall* newWallBlock = new Wall(tilesTexturePath, renderer, blockX, blockY, &gameState);
				enteties.push_back(newWallBlock);
			}
			else if (blockRow[blockX] == 2) {
				FinishBlock* finishBlock = new FinishBlock(tilesTexturePath, renderer, blockX, blockY, &gameState);
				enteties.push_back(finishBlock);
			}
			else if (blockRow[blockX] == 3) {
				Ground* spawnBlock = new Ground(tilesTexturePath, renderer, blockX, blockY, &gameState, true);

				gameState.spawnX = spawnBlock->getX();
				gameState.spawnY = spawnBlock->getY();

				enteties.push_back(spawnBlock);
				listeners.push_back(spawnBlock);
			}
			else if (blockRow[blockX] == 4) {
				Puddle* puddleBlock = new Puddle(tilesTexturePath, renderer, blockX, blockY, &gameState);
				enteties.push_back(puddleBlock);
			}
			else
			{
				Block* errBlock = new Block(tilesTexturePath, renderer, blockX, blockY, 96, 0);

				enteties.push_back(errBlock);
			}

			cout << blockRow[blockX];
		}
		cout << endl;
		blockY++;
	}

	if (levelFile[levelID].contains(std::string{ "banners" }))
	{
		string tipPath = levelFile[levelID]["banners"][0];

		Banner* tipScreen = new Banner(&gameState, renderer, tipPath.c_str(), 0, 0, 640, 640, 0, 0, 0, true);
		banners.push_back(tipScreen);

		Button* okButton = new Button("assets/ui.png", renderer, 488, 559, 122, 51, 0, 276, true);
		okButton->on_click([&](SDL_Renderer* rend)
			{
				gameState.blockGameInteraction = false;
				banners.clear();
				for (auto ent : buttons)
				{
					cout << ent->bannerButton << endl;
				}
				buttons.erase(find(buttons.begin(), buttons.end()-2, okButton));
			});

		for (auto ent : buttons)
		{
			cout << ent->bannerButton << endl;
		}

		buttons.push_back(okButton);
		listeners.push_back(okButton);
	}

	file.close();

	Button* playButton = new Button("assets/ui.png", renderer, 264, 10, 112, 44, 0, 0, false);
	playButton->on_click(    [&](SDL_Renderer* rend) { SummonPlayer(rend); }     );

	buttons.push_back(playButton);
	listeners.push_back(playButton);

}

void WorldsScreen(SDL_Renderer* renderer)
{
	ClearGameObjects();

	Banner* worldsScreen = new Banner(&gameState, renderer, "assets/banners/worlds.png", 0, 0, 640, 640, 0, 0, 0, false);
	banners.push_back(worldsScreen);

	Button* world2Button = new Button("assets/ui.png", renderer, 348, 111, 256, 256, 256, 256, true);
	world2Button->on_click([&](SDL_Renderer* renderer)
		{
			banners.clear();
			tilesTexturePath = "assets/cosmic_tiles.png";

			levelProgress = 1;
			levelFilePath = "level/classic.json";
			LoadLevel(to_string(levelProgress), renderer);
		});

	buttons.push_back(world2Button);
	listeners.push_back(world2Button);

	Button* world1Button = new Button("assets/ui.png", renderer, 38, 111, 256, 256, 256, 0, true);
	world1Button->on_click([&](SDL_Renderer* renderer)
		{
			banners.clear();
			tilesTexturePath = "assets/tiles.png";

			levelProgress = 1;
			levelFilePath = "level/testing.json";
			LoadLevel(to_string(levelProgress), renderer);
		});

	buttons.push_back(world1Button);
	listeners.push_back(world1Button);
}


void StartScreen(SDL_Renderer* renderer) {

	ClearGameObjects();

	levelProgress = 1;
	SetMaxLevelProgress();

	Banner* startScreen = new Banner(&gameState, renderer, "assets/banners/start.png", 0, 0, 640, 640, 0, 0, 0, false);
	banners.push_back(startScreen);


	Button* startButton = new Button("assets/ui.png", renderer, 251, 156, 143, 72, 0, 204, true);
	startButton->on_click([&](SDL_Renderer* renderer)
		{
			banners.clear();
			tilesTexturePath = "assets/tiles.png";

			levelProgress = 1;
			levelFilePath = "level/testing.json";
			LoadLevel(to_string(levelProgress), renderer);
		});

	buttons.push_back(startButton);
	listeners.push_back(startButton);


	Button* worldsButton = new Button("assets/ui.png", renderer, 412, 156, 189, 72, 0, 327, true);
	worldsButton->on_click([&](SDL_Renderer* renderer)
		{
			banners.clear();
			WorldsScreen(renderer);
		});

	buttons.push_back(worldsButton);
	listeners.push_back(worldsButton);
}


Game::Game()
{}
Game::~Game()
{}

void Game::init(const char* title, int xpos, int ypos, int width, int height, bool fullscreen)
{
	int flags = 0;

	if (fullscreen)
	{
		flags = SDL_WINDOW_FULLSCREEN;
	}

	if (SDL_Init(SDL_INIT_EVERYTHING) == 0)
	{
		std::cout << "{system} Ititialised successfully!" << std::endl;

		window = SDL_CreateWindow(title, xpos, ypos, width, height, flags);
		if (window) { std::cout << "{system} Window created successfully!" << std::endl; }

		renderer = SDL_CreateRenderer(window, -1, 0);
		if (renderer) {
			SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
			std::cout << "{system} Renderer created successfully!" << std::endl;
		}

		isRunning = true;
	} else {
		isRunning = false;
	}
	
	StartScreen(renderer);
	
}

void Game::handle_event(SDL_Event* evt)
{
	for (auto ent : listeners)
	{
		if (ent) ent->handle_event(evt);
	}
}

void Game::update()
{

	if (!gameState.gameOver)
	{
		for (auto ent : enteties)
		{
			ent->update();
		}

		for (auto ent : buttons)
		{
			ent->update();
		}

		for (auto ent : banners)
		{
			ent->update();
			if (ent->timeIsUp)
			{
				banners.erase(find(banners.begin(), banners.end(), ent));
			}
		}
	}
	else if (gameState.finishReached){
		if (levelProgress < maxLevelProgress) {

			Banner* loadingScreen = new Banner(&gameState, renderer, "assets/banners/nextlvl.png", 0, 0, 640, 640, 0, 0, 50, false);
			banners.push_back(loadingScreen);

			levelProgress++;
			LoadLevel(to_string(levelProgress), renderer);

		}
		else {

			ClearGameObjects();

			Banner* finishScreen = new Banner(&gameState, renderer, "assets/banners/finish.png", 0, 0, 640, 640, 0, 0, 0, false);
			banners.push_back(finishScreen);

			Button* exitButton = new Button("assets/ui.png", renderer, 301, 337, 169, 80, 0, 124, true);
			exitButton->on_click([&](SDL_Renderer* renderer)
				{
					StartScreen(renderer);
				});

			buttons.push_back(exitButton);
			listeners.push_back(exitButton);
		}
	}
	else if (gameState.gameOver) {

		ClearGameObjects();

		Banner* gameoverScreen = new Banner(&gameState, renderer, "assets/banners/gameover.png", 0, 0, 640, 640, 0, 0, 0, false);
		banners.push_back(gameoverScreen);


		Button* restartButton = new Button("assets/ui.png", renderer, 144, 263, 239, 80, 0, 44, true);
		restartButton->on_click([&](SDL_Renderer* renderer)
			{
				banners.clear();
				LoadLevel(to_string(levelProgress), renderer);
			});

		buttons.push_back(restartButton);
		listeners.push_back(restartButton);

		Button* menuButton = new Button("assets/ui.png", renderer, 403, 263, 169, 80, 0, 124, true);
		menuButton->on_click([&](SDL_Renderer* renderer)
			{
				StartScreen(renderer);
			});

		buttons.push_back(menuButton);
		listeners.push_back(menuButton);

	}
}

void Game::render()
{	
	SDL_SetRenderDrawColor(renderer, 41, 41, 41, 255);
	SDL_RenderClear(renderer);


	for (auto ent : enteties)
	{
		ent->render();
	}

	for (auto ent : buttons)
	{
		if (!ent->bannerButton) ent->render();
	}

	for (auto ent : banners)
	{
		ent->render();
	}

	for (auto ent : buttons)
	{
		if (ent->bannerButton) ent->render();
	}

	SDL_RenderPresent(renderer);

}

void Game::clean()
{
	SDL_DestroyWindow(window);
	SDL_DestroyRenderer(renderer);
	SDL_Quit();
	std::cout << "{system} Game closed successfully." << std::endl;
}


