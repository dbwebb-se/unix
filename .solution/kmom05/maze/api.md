# Maze API reference


## GET /
Initialize the maze and generates a new gameid

*Exemple call* `/`

### Parameters
| Name | Required | Example value | Description | 
|:----:|:--------:|:-------------:|:-----------|
| type | no       | csv | The prefered response content-type. |

*JSON response.*
```
{
    "text":"New game initialized",
    "gameid":"42580"
}
```

## GET /map
Returns a list of all available maps

*Exemple call* `/map`

### Parameters
| Name | Required | Example value | Description | 
|:----:|:--------:|:-------------:|:-----------|
| type | no       | csv | The prefered response content-type. |

*JSON response.*
```json
[
    "maze-of-doom.json"
]
```

## GET /:gameid/map/:map
Loads the map as the current maze

*Exemple call* `/42580/map/maze-of-doom.json`

### Parameters
| Name | Required | Example value | Description | 
|:----:|:--------:|:-------------:|:-----------|
| gameid | yes    |  42580 | The numerical ID of the game |
| type | no       | csv | The prefered response content-type. |
| map | yes       | maze-of-doom | The maze to be loaded into the game.| 

*JSON response*
```json
{
    "text":"New map selected."
}
```

## GET /:gameid/maze
Gets content of first room. (Walks in to the first room)

*Exemple call* `/42580/maze`

### Parameters
| Name | Required | Example value | Description | 
|:----:|:--------:|:-------------:|:-----------|
| gameid | yes    |  42580 | The numerical ID of the game. |
| type | no       | csv | The prefered response content-type. |

*JSON response.*
```json
{
    "roomid": 0,
    "description": "You are in a dark room, you feel 2 doors in the dark dark room",
    "directions": {
        "east":1,
        "south":3
    }
}
```

## GET /:gameid/maze/:roomId
Gets info about the room

*Exemple call* `/42580/maze/5`

### Parameters
| Name | Required | Example value | Description | 
|:----:|:--------:|:-------------:|:-----------|
| gameid | yes    |  51342 | The numerical ID of the game. |
| type | no       | csv | The prefered response content-type. |
| roomid | yes    | 3 | The numerical ID of the room. | 

*JSON response*
```json
{
    "roomid": 5,
    "description": "Room 5",
    "directions": {
        "north": 2,
        "south": 8
    }
}
```

## GET /:gameid/maze/:roomId/:direction
Walks into next room from given roomId and gives the next rooms info.

*Exemple call* `/42580/maze/0/north`

### Parameters
| Name | Required | Example value | Description | 
|:----:|:--------:|:-------------:|:-----------|
| gameid | yes    |  33333 | The numerical ID of the game. |
| type | no       | csv | The prefered response content-type. |
| roomid | yes       | 3 | The numerical ID of the current room. | 
| direction | yes | north | The direction where to move next. | 

*JSON response.*
```json
{
    "roomid": 1,
    "description":"room 1",
    "directions": {
        "west":0,
        "east":2,
        "south":4
    }
}
```

Revision history
------------------------------
2015-07-14 (foikila) Added information about the parameters.    
2015-06-24 (foikila) Added gameid.      
2015-06-17 (foikila) First draft crafted.
