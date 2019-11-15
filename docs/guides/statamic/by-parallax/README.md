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

The `CACHE_DRIVER` default in the example is set to `redis`, you can use this but if you'd prefer `apc` feel free to change it here. If you'd like to use redis and encounter a connection refused error (for example, when running "please" commands) then you will likely need to install and run a redis server. Run the following commands:
```
$ brew install redis
$ redis-server /usr/local/etc/redis.conf
```
:::

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

::: tip
When you want to run migrations on QA or Live, check this documentation: https://myparallax.atlassian.net/wiki/spaces/DD/pages/1011286017/Kbuild#Running-migrations
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

Routing is managed by Statamic using the 'Pages' part of the CMS. The tree structure you see there controls the routes. So if you have About (with a slug of /about) and create a subpage, it will be at /about/sub-page-slug.
The exception to this is for Collections (e.g. `CaseStudy`), which usually have 'view' pages, (e.g. /case-studies/&gt;slug-here&lt;). This route is managed in the model (e.g. CaseStudy.php) under `$slug`

You can also manually configure routes in:

`site/settings/routes.yaml`

e.g.

```
redirect:
  /study/no-ordinary-campus-old: /study/no-ordinary-campus
  /study/yorkshire-life-old: /study/yorkshire-life
  /student-life/support: /study/support
  /study/student-life/yorkshire-life: /study/yorkshire-life
  /study/student-life: /study/yorkshire-life
```

## Redirects

You can set up redirects using the 'SEO' tab on any page that you're editing in Statamic.

Please note: this does not mean that /your-first-url will automatically redirect to /your-new-url, it just means that if you have &lt;a href="\{\{ page_url(23) \} \}"&gt; then Statamic will know the user needs to go to /your-new-url and send them there.
If you would like /your-first-url to automatically redirect, then you must set up a manual redirect. See the docs on this in the other part of this documentation [here](https://parallax-developer-docs.netlify.com/guides/statamic/by-official-docs/#redirects)

## View Composers

Most of the data that you will use in your views will come from fieldsets. You create the fieldset, attach it to a page or model, the admin enters content via the CMS, and your views pull this out.
This isn't the only way to pass data into your Statamic views though. If you know you want specific data, e.g. if you want to just show the latest 3 blog articles, then you don't want to rely on your admin choosing these 3 articles via UI in Statamic every time they want to show them.

Instead you can use View Composers. This is a [Laravel feature](https://laravel.com/docs/master/views#view-composers) rather than a Statamic feature, but are nevertheless very useful in Statamic.

Views get fed data from the Composer.

Firstly, you will need to create a view file, which could be an entire page, e.g. `/public/themes/default/templates/news_articles/index.blade.php`, or even as small as an element, e.g. `/public/themes/default/templates/elements/my-little-element.blade.php`. Reference some data that you're going to pass in, e.g. `@foreach ($news_articles as $news_article)`. You will get this `$news_articles` data from a View Composer.

Create `/site/addons/App/Composers/LatestThreeNewsArticlesComposer.php

```php
<?php

namespace Statamic\Addons\App\Composers;

use Illuminate\View\View;
use Statamic\SiteHelpers\Models\NewsArticle;

class LatestThreeNewsArticlesComposer
{
    public function compose(View $view)
    {
        $news_articles = NewsArticle::orderBy('created_at', 'desc')->take(3)->get();

        $view->with(compact('news_articles'));
    }
}
```

Great, now you might be thinking how does Laravel know that this Composer I have just created is linked to `news_articles/index.blade.php` or `elements/my-little-element.blade.php` – you'd be right to ask that, because it doesn't yet.

You will need to tell Laravel to link those two things using a [Service Provider](https://laravel.com/docs/5.8/providers).

Open `/site/addons/App/AppServiceProvider.php` and add this line to the `boot()` function:

`View::composer('elements.my-little-element.blade.php', Composers\LatestThreeNewsArticlesComposer::class);`

Your data will now be available in your view.

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
@include('elements.latest-posts', ['count' => 10])
```
:::

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

## Assets

Assets are stored on Amazon S3. When a project builds on Bamboo for the first time, a bucket will be created.

### Using the bucket locally

* Log in to the [Kubernetes Dashboard](https://dashboard.parallax.dev/)
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
