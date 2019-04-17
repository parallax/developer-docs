# Statamic (by Parallax)

This part of the guide will tell you about any alterations Parallax developers have made to Statamic to make it work better with our flow. You should first read [Statamic by Official Docs](/guides/statamic/by-official-docs/) and ideally before that view the [Statamic Docs](https://docs.statamic.com/), learning either by text or video.

## Setup

To get started clone the base Statamic repo into a new directory:

```
git clone ssh://git@my.parall.ax:7999/ipx/statamic.git my-site
```

Move into the new directory (`cd my-site`) and update the origin to point to your new site:

```
git remote set-url origin ssh://git@my.parall.ax:7999/ex2/my-site.git
```

Next, install the composer dependencies, ensuring that you are in the `statamic` subdirectory:

```
cd statamic
composer install
```

Now head back to the root directory (`cd ..`) to create a `.env` file and app key:

```
cp .env.example .env
php please key:generate
```

Note: The app key is not stored in the `.env` file. You will find it in `site/settings/system.yaml`

Open up the `.env` file and update any details relating to your local environment, such as the database connection. Next, run the database migrations:

```
php please migrate
```

Statamic themes are stored in `public/themes`. You may notice that there is a base theme in there already, called `default`. Rename this folder to the name of your site, for example `my-site`.

```
cd public/themes/my-site
npm install
gulp
```

## Assets

`site/content/assets/main.yaml`

## Migrations

## Models

## Routing
