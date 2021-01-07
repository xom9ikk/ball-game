<p align="center">
  <a href='https://ball.xom9ik.com'>Amaze Ball Game</a>
</p>
<p align="center"><img src='https://github.com/xom9ikk/ball-game/raw/master/screenshots/main.png' alt='Ball Screenshot' aria-label='ball.xom9ik.com' /></p>

# For users 😀

## 🧶 How to play?
Ball is a game that is very addictive in its simplicity.
You only need 4 movements or 4 keys on the keyboard to play.
There is a **map** on which there is a **ball** that paints all the **cells** on which it rolled.
The goal of the game is to color all the cells on the map. 
After passing the map, you go to a new level.

## 🔭 How are maps generated?
To generate maps, an algorithm is used that generates a random number of cells in the range. 
After that, the walls `break through` and cells are obtained, along which the ball can then move. 
The generation doesn't end there. 
After that, the verification algorithm starts, because not all generated maps can have a finite number of movements to fill all cells of the map. 
If the map was successfully painted over for a large number of `monkey` movements, then the map is considered usable. 
After that, all maps that have reached this stage are sorted by the average number of `monkey` movements to complete the map.
Thus, at the beginning are the maps that had the least difficulty.
And the more levels the player goes through, the more the map has a higher level of difficulty.

# For developers 🤔

## Installation and Development server

Clone repo
```bash
$ git clone https://github.com/xom9ikk/ball-game.git
```

Install the dependencies
```bash
$ npm i
```

Run in `dev` mode with hot reload. `dev` server will run at `http://localhost:3000`
```bash
$ npm run start
```

Build for `production`. Static files will be created in `dist` folder.
```bash
$ npm run build
```

Build map file
```bash
$ node ./generator/cluster.js 
```

## License

[MIT](LICENSE.md)
