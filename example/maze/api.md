Maze API reference
==================================


Response type
----------------------------------

The default response type is json.

You can change to response type CSV (comma-separated values) by adding the query string `?type=csv`.



GET /
----------------------------------

Initialize the maze and generates a new gameid

*Exemple call*

```
/
```



### Parameters

| Name | Required | Example value | Description |
|:----:|:--------:|:-------------:|:------------|
| type | no       | csv           | The prefered response content-type. |

*JSON response.*

```
{
    "text":"New game initialized",
    "gameid":"42580"
}
```



GET /map
----------------------------------

Returns a list of all available maps. You need to call this before you can select a map.

*Exemple call*

```
/map
```



### Parameters

| Name | Required | Example value | Description |
|:----:|:--------:|:-------------:|:------------|
| type | no       | csv           | The prefered response content-type. |

*JSON response.*

```json
[
    "maze-of-doom.json",
    "small-maze.json"
]
```



GET /:gameid/map/:map
----------------------------------

Loads the map as the current maze

*Exemple call*

```
/42580/map/maze-of-doom.json
/42580/map/maze-of-doom
```



### Parameters

| Name   | Required | Example value | Description |
|:------:|:--------:|:-------------:|:------------|
| gameid | yes      | 42580         | The numerical ID of the game |
| map    | yes      | maze-of-doom  | The maze to be loaded into the game, with or without `.json`.|
| type   | no       | csv           | The prefered response content-type. |

*JSON response*

```json
{
    "text":"New map selected."
}
```



GET /:gameid/maze
----------------------------------

Enters the maze and gets the content of first room.

*Exemple call*

```
/42580/maze
```



### Parameters

| Name   | Required | Example value | Description |
|:------:|:--------:|:-------------:|:------------|
| gameid | yes      |  42580        | The numerical ID of the game. |
| type   | no       | csv           | The prefered response content-type. |

*JSON response.*

```json
{
  "roomid": 0,
  "description": "You are in a dark room and you feel 2 doors in the dark dark room",
  "directions": {
    "west": "-",
    "east": 1,
    "south": 3,
    "north": "-"
  }
}
```



GET /:gameid/maze/:roomId
----------------------------------

Gets info about the room

*Exemple call*

```
/42580/maze/5
```



### Parameters

| Name   | Required | Example value | Description |
|:------:|:--------:|:-------------:|:------------|
| gameid | yes      | 51342         | The numerical ID of the game. |
| type   | no       | csv           | The prefered response content-type. |
| roomid | yes      | 3             | The numerical ID of the room. |

*JSON response*

```json
{
  "roomid": 5,
  "description": "Room 5",
  "directions": {
    "west": "-",
    "east": "-",
    "south": 8,
    "north": 2
  }
}
```



GET /:gameid/maze/:roomId/:direction
----------------------------------

Walks away from the current room in selected direction.

*Exemple call*

```
/42580/maze/5/south
```



### Parameters

| Name      | Required | Example value | Description |
|:---------:|:--------:|:-------------:|:------------|
| gameid    | yes      |  33333        | The numerical ID of the game. |
| type      | no       | csv           | The prefered response content-type. |
| roomid    | yes      | 3             | The numerical ID of the current room. |
| direction | yes      | north         | The direction where to move next. |

*JSON response.*

```json
{                           
  "roomid": 8,              
  "description": "Room 8",
  "directions": {         
    "west": 7,   
    "east": "-", 
    "south": 11,
    "north": 5 
  }             
}  
```



Revision history
------------------------------
2017-02-23 (mos) Walkthrough and cleaned up minor issues.  
2015-07-14 (foikila) Added information about the parameters.  
2015-06-24 (foikila) Added gameid.  
2015-06-17 (foikila) First draft crafted.  
