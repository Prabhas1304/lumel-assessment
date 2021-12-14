## Installation

- Create a .env file from .env.example file and fill in the information
- Run the following command:

versions 
node -> 14.16.0

npm -> 6.14.11

```bash
npm or yarn
```
## ER Diagram
``` 
Refer ER-Diagram folder inside the project 
```
## Post Man Collection

``` 
Refer postMan-collection folder inside the project
```


## Running the app

```bash
# development mode
edit your mysql database config in .env file

npm i

npm run start:dev



 Fews songs are already pre-populated in the songs table


```
## API Routes

```bash
--------------------------------------------------------------------------------------------
#create an user
route: /users 
method: POST
body: {
    "email":"test@gmail.com",
    "password":"12345"
}

sample Response : {
    "email": "test1@gmail.com",
    "id": 2,
    "createdAt": "2021-12-14T06:32:55.064Z",
    "updatedAt": "2021-12-14T06:32:55.064Z"
}

--------------------------------------------------------------------------------------------
#login  user

route:  /auth/login

method: POST
body: {
    "email":"test@gmail.com",
    "password":"12345"
}
sample Response: 
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYzOTQ2MzY1MX0.9IMS-lQ_TfMai_M26oJLMWBIYTgDdv6wa1001nwMM4Y"
}

--------------------------------------------------------------------------------------------
#list All Songs in dashboard

route:  /auth/listAllSongs
method: GET

sample Response:

[
    {
        "id": 1,
        "songName": "song1",
        "createdAt": "2021-12-13T16:44:40.932Z",
        "updatedAt": "2021-12-13T16:44:40.932Z"
    },
    {
        "id": 2,
        "songName": "song2",
        "createdAt": "2021-12-13T16:44:44.776Z",
        "updatedAt": "2021-12-13T16:44:44.776Z"
    },
    {
        "id": 3,
        "songName": "song3",
        "createdAt": "2021-12-13T16:44:47.160Z",
        "updatedAt": "2021-12-13T16:44:47.160Z"
    },
    {
        "id": 4,
        "songName": "song4",
        "createdAt": "2021-12-13T16:44:49.906Z",
        "updatedAt": "2021-12-13T16:44:49.906Z"
    },
]

--------------------------------------------------------------------------------------------
# create PlayList for an user
route:  /auth/createPlayList

method: POST
BODY: {
    "playListName":"user1PlayList1"
}

Sample Reponse: {
    "userId": 1,
    "playListName": "user1PlayList2",
    "id": 4,
    "createdAt": "2021-12-14T06:37:04.481Z",
    "updatedAt": "2021-12-14T06:37:04.481Z"
}


--------------------------------------------------------------------------------------------
# add songs into the created Playlist
route:  /auth/addSongInPlaylist
method : POST

BODY: {
    "playListId":3,
    "songsId": 5
}

Sample Response: {
    "userId": 1,
    "playListId": 3,
    "songsId": 5,
    "id": 4,
    "createdAt": "2021-12-14T06:38:18.652Z",
    "updatedAt": "2021-12-14T06:38:18.652Z"
}


--------------------------------------------------------------------------------------------
# Get the the list songs from the PlayList

route:  /auth/listPlayListSongs?playListId=3

method : GET

Sample Response: [
    {
        "id": 3,
        "createdAt": "2021-12-13T18:49:28.452Z",
        "updatedAt": "2021-12-13T18:49:28.452Z",
        "userId": 1,
        "playListId": 3,
        "songsId": 5,
        "songName": "song5"
    },
    {
        "id": 4,
        "createdAt": "2021-12-14T06:38:18.652Z",
        "updatedAt": "2021-12-14T06:38:18.652Z",
        "userId": 1,
        "playListId": 3,
        "songsId": 6,
        "songName": "song6"
    }
]


--------------------------------------------------------------------------------------------
# Get the shuffled  list songs from the PlayList

route:  /auth/shufflePlayListSongs?playListId=3

method : GET

Sample Response: [
    {
        "id": 1,
        "createdAt": "2021-12-13T18:22:16.685Z",
        "updatedAt": "2021-12-13T18:22:16.685Z",
        "userId": 1,
        "playListId": 3,
        "songsId": 1,
        "songName": "song1"
    },
    {
        "id": 2,
        "createdAt": "2021-12-13T18:37:08.209Z",
        "updatedAt": "2021-12-13T18:37:08.209Z",
        "userId": 1,
        "playListId": 3,
        "songsId": 2,
        "songName": "song2"
    },
    {
        "id": 3,
        "createdAt": "2021-12-13T18:49:28.452Z",
        "updatedAt": "2021-12-13T18:49:28.452Z",
        "userId": 1,
        "playListId": 3,
        "songsId": 5,
        "songName": "song5"
    },
    {
        "id": 4,
        "createdAt": "2021-12-14T06:38:18.652Z",
        "updatedAt": "2021-12-14T06:38:18.652Z",
        "userId": 1,
        "playListId": 3,
        "songsId": 6,
        "songName": "song6"
    }
]

```