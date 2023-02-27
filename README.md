# Mind Sound

#### Front end technical exercise description:

The objective of this Exercise is to build an app to listen to podcasts. Content is retrieved from the Apple Itunes api.

## Clone the repo & install:

```
git clone "https://gitlab.com/suxxus1/podcast-react.git"

cd  ./podcast-react
npm install
```

## Docker:

npm install if you haven't done it yet.

```
cd ./podcast-react

docker compose up -d
docker logs <container name> -f

```

docker container

- app-podcast

## Scripts:

The `package.json` file comes with the following scripts

- `start` to start development.
- `storybook` to start storybook
- `lint` to run ESLint
- `tsc` to check _.ts _.tsx files
- `tsc:watch` to watch _.ts _.tsx files
- `test:watch` to run jest suite
- `build` to compile a version to be deployed

## TODO:

- Add Cypress Tests

## Resources:

[Storybook](https://storybook.js.org/)
Storybook is a frontend workshop for building UI components and pages in isolation.

[iTunes Search API](https://performance-partners.apple.com/search-api)
To search for content within the iTunes Store 
