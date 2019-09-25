# (WIP) Statamic (by Parallax)

This part of the guide will tell you about any alterations Parallax developers have made to Statamic to make it work better with our flow. You should first read [Statamic by Official Docs](/guides/statamic/by-official-docs/) and ideally before that view the [Statamic Docs](https://docs.statamic.com/), learning either by text or video.

## Setup

To get started clone the base Statamic repo into a new directory:

```
git clone ssh://git@my.parall.ax:7999/ipx/statamic.git `my-site`
```

Move into the new directory (`cd my-site`) and update the origin to point to your new site:

```
git init
git remote add origin ssh://git@my.parall.ax:7999/ex2/`my-site`.git
```

Next, install the composer dependencies, ensuring that you are in the `statamic` subdirectory:

```
cd statamic
composer install
```

Now head back to the root directory (`cd ..`) to create a `.env` file and app key:

```
cd ../
cp .env.example .env
php please key:generate
```

::: tip
The app key is not stored in the `.env` file. You will find it in `site/settings/system.yaml` – it doesn't appear to automatically update so you may have to do this manually.
:::

Open up the `.env` file and update any details relating to your local environment, such as the database connection. Next, run the database migrations:

```
php please migrate
```

There are a number of things that need changing to your site name across the project, so do a find & replace in the entire project, find `change-me` and replace with the name of your site, for example `my-site`.

Statamic themes are stored in `public/themes`. Navigate to that directory.

You'll notice there is a directory called `change-me` there. You should change that to your site name, e.g. `my-site`, as well as the following files:

`/site/addons/ChangeMe` -> `/site/addons/MySite` (change MySite to your sitename, in camel-case)
`/site/addons/ChangeMe/ChangeMeController.php` -> `/site/addons/ChangeMe/MySiteController.php`
`/site/addons/ChangeMe/ChangeMeListener.php` -> `/site/addons/ChangeMe/MySiteListener.php`
`/site/addons/ChangeMe/ChangeMeServiceProvider.php` -> `/site/addons/ChangeMe/MySiteServiceProvider.php`

```
cd public/themes/my-site
npm install
gulp
```

## Models / Collections

Vanilla Statamic has a concept of [Collections](https://docs.statamic.com/collections):

> Collections can be anything. Blog posts, news articles, knock knock jokes, you name it. Other content management systems might call them “channels”, “structures”, or “post types”.

When using Parallax Statamic, “collections” exist as [Eloquent](https://laravel.com/docs/5.1/eloquent) models.

### Creating new collections

```
php please make:collection NewsArticle
```

This will create two files: a database migration (`site/database/migrations/00000000_create_news_articles_table.php`), and an Eloquent model (`site/helpers/Models/NewsArticle.php`).

The migration will already contain the required columns (`id`, `title`, `slug`, `data`, `published`) for your new collection. After adding any additional columns that you require, run your migration:

```
php please migrate
```

::: tip
If you do add additional columns you will need to add these to the model’s `fillable` array so that content can be saved to those columns via the Statamic control panel.
:::

### Model properties

#### `fieldset`

Defines the Statamic fieldset to use when creating entries.

#### `template`

The Blade template to use when rendering an entry.

#### `slug`

The URL for entries. You can use curly brackets (`{}`) for model attributes:

```php
public static $slug = 'news/{slug}';
```

You can also access attributes from relationships:

```php
public static $slug = 'news/{news_category.slug}/{slug}';
```

::: tip
If a relationship appears in the URL consider adding it to your model’s `with` property to load it eagerly. For example `protected $with = ['news_category'];`
:::

#### `cp`

This array property defines how your collection will behave in the Statamic control panel (cp).

* **`searchable`**: whether or not collection entries appear in the global search
* **`nav`**: set to `false` to hide the collection in the main nav. Otherwise, specify an array with an `icon` property:
```php
'nav' => [
  'icon' => 'emoji-happy',
],
```
::: tip
Statamic uses the Entypo icon set. You can find the icon names by visiting the [Entypo website](http://www.entypo.com/) and inspecting the icon you want to use. The icon name is the SVG filename, _without_ the `.svg` extension.
:::
* **`columns`**: Defines which columns to display in the collection index table.
```php
'columns' => [
  'title',
  'created_at' => [
    // overwrite the column display name
    // without this the header would be “Created At”
    'header' => 'Created',
  ],
],
```
::: tip
You can also specify relationship attributes using dot notation, and overwrite the field used for sorting the column:
:::
```php
'columns' => [
  // `title_with_flag_and_link` is a computed attribute that returns HTML
  'country.title_with_flag_and_link' => [
    'header' => 'Country',
    // use the original title attribute for sorting
    'sort_field' => 'country.title',
  ],
],
```

## Routing

## Templating

## View Composers

## Helpers

### `entry_url()`

The `entry_url` function returns the URL for an entry, given its type and ID:

```php
$url = entry_url('NewsArticle', 18);
```

### `page_url()`

The `page_url` function returns the URL for a page, given its ID:

```php
$url = page_url(7); // same as entry_url('Page', 7)
```

### `image_url()`

The `image_url` function returns a Cloudinary URL, given a Statamic image field:

```php
$url = image_url($entry->image, [
  'w' => 500,
  'h' => 500,
]);

// https://res.cloudinary.com/parallax-agency/image/upload/w_500%2Ch_500%2Cc_fill%2Cq_auto%2Cf_auto/statamic/prlx-k8s-my-site/my-image.jpg
```

### `image_srcset()`

The `image_srcset` function returns a list of Cloudinary URLs for use in a `srcset`, given a Statamic image field:

```php
$srcset = image_srcset($entry->image, [
  'w' => 500,
  'h' => 500,
  'step' => 100,
]);

/*
https://res.cloudinary.com/parallax-agency/image/upload/w_500%2Ch_500%2Cc_fill%2Cq_auto%2Cf_auto/statamic/prlx-k8s-my-site/my-image.jpg w500,
https://res.cloudinary.com/parallax-agency/image/upload/w_400%2Ch_400%2Cc_fill%2Cq_auto%2Cf_auto/statamic/prlx-k8s-my-site/my-image.jpg w400,
https://res.cloudinary.com/parallax-agency/image/upload/w_300%2Ch_300%2Cc_fill%2Cq_auto%2Cf_auto/statamic/prlx-k8s-my-site/my-image.jpg w300,
https://res.cloudinary.com/parallax-agency/image/upload/w_200%2Ch_200%2Cc_fill%2Cq_auto%2Cf_auto/statamic/prlx-k8s-my-site/my-image.jpg w200,
https://res.cloudinary.com/parallax-agency/image/upload/w_100%2Ch_100%2Cc_fill%2Cq_auto%2Cf_auto/statamic/prlx-k8s-my-site/my-image.jpg w100
*/
```

### `image_meta()`

The `image_meta` function returns field data saved against an image:

```php
$alt = image_meta($entry->image, 'alt');
```

## View Composers

[View composers](https://laravel.com/docs/5.1/views#view-composers) are a great way to provide data to Blade views. To start using view composers you need to create an addon for your site, if you haven’t already. To do this create a new directory in `site/addons`, for example `site/addons/MySite`. Next create a service provider in that directory, for example `site/addons/MySiteServiceProvider.php`:

```php
<?php

namespace Statamic\Addons\MySite;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class MySiteServiceProvider extends ServiceProvider {
    public function boot()
    {
        View::composer('news.index', Composers\NewsIndexComposer::class);
    }
}
```

Here we are registering a view composer for the `news.index` Blade view. Next, create a new file, `site/addons/MySite/Composers/NewsIndexComposer.php`:

```php
<?php

namespace Statamic\Addons\MySite\Composers;

use Illuminate\View\View;
use Statamic\SiteHelpers\Models\NewsArticle;

class NewsIndexComposer
{
    public function compose(View $view)
    {
        $view->with('posts', NewsArticle::all());
    }
}
```

This is where we fetch any data we need and pass it to the view. Now whenever the `news.index` view is rendered, the composer runs and provides us with the `$posts` variable:

```html
<ul>
    @foreach ($posts as $post)
        <li><a href="{{ $post->url }}">{{ $post->title }}</a></li>
    @endforeach
</ul>
```

::: tip
You can read the current view data using the `getData` method on the view. In this example the composer provides the latest blog posts, and the amount of posts is configurable:

```php
class LatestNewsComposer
{
    public function compose(View $view)
    {
        $viewData = $view->getData();
        $count = $viewData['count'] ?? 3;

        $view->with('posts', NewsArticle::orderBy('created_at', 'desc')->take($count)->get());
    }
}
```

```
@include('latest-posts', ['count' => 10])
```
:::

## Assets

Assets are stored on Amazon S3. When a project builds on Bamboo for the first time, a bucket will be created.

### Using the bucket locally

* Log in to the [Kubernetes Dashboard](https://dashboard.prlx.io/) or [Kbuild Dashboard](https://dashboard.parallax.dev/)
* Search for your project under `Namespace` on the left-hand side
* Select a pod
* Look for the S3 details under the `Container` section:
  - `AUTO_S3_BUCKET`
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
* Copy these variables to your local `.env` file
* Check that these details are being used in `site/content/assets/main.yaml`:
```yaml
title: 'Main Assets'
url: /assets
driver: s3
key: "{env:AWS_ACCESS_KEY_ID}"
secret: "{env:AWS_SECRET_ACCESS_KEY}"
bucket: "{env:AUTO_S3_BUCKET}"
region: eu-west-1
```

### Fieldsets, the database, and you
### $entry->url
