# metric-ui

#### Front end technical exercise description:

The goal of this exercise is to turn the UI design we provide into a fully functional UI. It’s a small component in charge of creating/editing/deleting metrics corresponding to a
SaaS provider.

All interactions defined in the document should be implemented:

- Editing mode toggler
- Rename metric
- Delete metric
- Create new metric

#### Prerequisites:

- Browser support: IE10+, latest 2 versions of Chrome, Firefox, Safari, Opera
- You can use the JavaScript framework/libs of your choice.
- You don’t need to, but using a CSS pre/postprocessor will be appreciated.
- You have to use images, but we don’t want them as separate files.
- There is no time limit, but obviously we’ll take time into account. So please send us your exercise as soon as you’re done.
- It’s a webapp not a website. If you need to take semantic or architectural decisions, keep it in mind.
  Feel free to surprise us if you want, you put the limit.

#### UI-design:

- Main view

```
company logo
edit mode                user account
+----------+ +----------+ +---------+
| metric   | | metric   | | metric  |
| name     | | name     | | name    |
+----------+ +----------+ +---------+
+----------+ +----------+ +---------+
| metric   | | metric   | | create  |
| name     | | name     | | metric  |
+----------+ +----------+ +---------+
```

- Edition mode

```
company logo
exit edit mode        user account
+----------+ +----------+ +----------+
| metric   | | metric   | | metric   |
| name     | | name     | | name     |
|         x| |         x| |         x|
+----------+ +----------+ +----------+
+----------+ +----------+ +----------+
| metric   | | metric   | | create   |
| name     | | name     | | metric   |
|         x| |         x| |         x|
+----------+ +----------+ +--------- +
```

- Interactions

```
+----------+              +----------+      each metric has different metadata could be nothing
| metric   |  on hover    | metric   |      or
| name     |              | name     |      monthly/resolution
+----------+              +----------+      or
                                            162 updates
                                            monthly/resolution
                                            or
                                            Limit reached
                                            162 updates
                                            monthly/resolution
```

- Edition mode interactions

```
+----------+                +----------+     The metric name becomes editable
| metric   |  on click      | metric   |     Press enter to save
| name     |                | name     |
+----------+                +----------+
+----------+                +----------+     The metric name should change state
| metric   |  on hover      | metric   |
| name     |                | name     |
+----------+                +----------+
+----------+                +----------+     Delete button should change state
|          |  on hover      |          |
|        x |                |         X|
+----------+                +----------+
+----------+                                Removes the metric box
|          |  on click
|        x |
+----------+

 create        on click                     click on "create new metric"
 new metric                                 Adds a new metric box to the list with
                                            editable name focused
```

## Clone the repo & install:

```
git clone "https://github.com/suxxus/metric-ui.git"

cd  ./metric-ui
npm install
```

## Docker:

npm install if you haven't done it yet.

```
cd ./metric-ui

docker compose up -d
docker logs <container name> -f

```

docker container

- metric-ui

## Scripts:

The `package.json` file comes with the following scripts

- `dev` to start development.
- `storybook` to start storybook

## TODO:

- Real Github login
- Add Cypress Tests
