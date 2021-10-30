# Backend Developer Assignment | Fampay

## Goals

> Basic Requirements

1.  [x] Fetch And store the video detail using Youtube Api.
2.  [x] A GET API
3.  [x] A basic search API
4.  [x] Dockerize the project.
5.  [x] It should be scalable and optimised.

> Bonus

1.  [x] Add support for supplying multiple API keys so that if quota is exhausted on one, it automatically uses the next available key.
2.  [ ] Build Dashboard.
3.  [x] Optimise search api.

## How to run the project

1.  First Clone the project

`git@github.com:Ubaid-Manzoor/FamPay-assignment.git`.

2.  Fill the missing values in `.env.dev`.

3.  run `npm install`.

4.  To run without docker run `npm run start:dev`.

5.  To run with docker run `docker-compose up`.

> Note
>
> - Put YOUTUBE_API_KEYS like "Key1, Key2, Key3, ...", to support multiple keys.

## Apis

### GET - http://localhost:3000/api/v1/videos/search [work for both GET and SEARCH]

#### PARAMS

- **page** - the page number we what(**default 1**)
- **pageSize** - define size of each page(**default 10**)
- **sortBy** - represent the table field on which we want to sort(**default publishedAt**)
- **search(optional)** - If passed will only return items which matchs search input, otherwise will return all items in paginated format.

#### RESPONSE

- **hasNext** : Boolean
- **hasPrev** : Boolean
- **data** : List of Items
