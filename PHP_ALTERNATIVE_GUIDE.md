# Alternative Solution: PHP Template System

If you prefer a server-side solution, here's a PHP-based approach:

## File Structure
```
pages/
├── news-template.php     # Main template
├── includes/
│   ├── header.php       # Common header
│   ├── footer.php       # Common footer
│   └── navigation.php   # Navigation menu
└── data/
    └── articles/
        ├── news-1.php   # Article content files
        ├── news-2.php
        └── news-3.php
```

## Sample news-template.php
```php
<?php
$article_id = $_GET['id'] ?? 'news-1';
$article_file = "data/articles/{$article_id}.php";

if (!file_exists($article_file)) {
    http_response_code(404);
    $article_id = '404';
}

include $article_file;
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title><?php echo $article['title']; ?> - ElectroPanel Pro</title>
    <meta name="description" content="<?php echo $article['excerpt']; ?>">
    <link rel="stylesheet" href="../css/main.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <main class="pt-24 pb-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1><?php echo $article['title']; ?></h1>
            <time><?php echo $article['date']; ?></time>
            <img src="<?php echo $article['featured_image']; ?>" alt="<?php echo $article['title']; ?>">
            <div class="prose">
                <?php echo $article['content']; ?>
            </div>
        </div>
    </main>
    
    <?php include 'includes/footer.php'; ?>
</body>
</html>
```

## Sample Article File (data/articles/news-1.php)
```php
<?php
$article = [
    'id' => 'news-1',
    'title' => 'حضور بهساز تابلو آسیا در نمایشگاه صنعت برق ۱۴۰۴',
    'excerpt' => 'شرکت بهساز تابلو آسیا با ارائه آخرین دستاوردهای خود...',
    'featured_image' => '../assets/images/zarafshan.webp',
    'date' => '۰۵ تیر ۱۴۰۴',
    'category' => 'اخبار',
    'content' => '
        <p>شرکت بهساز تابلو آسیا با بیش از ۲۵ سال تجربه...</p>
        <h2>نمایش آخرین محصولات</h2>
        <p>در این نمایشگاه، مجموعه کاملی از محصولات پیشرفته...</p>
    '
];
?>
```

## Benefits of PHP Approach:
- Server-side rendering (better SEO)
- Include/require for common sections
- More secure (no client-side JSON exposure)
- Database integration possible
- Server-side logic for complex features

## Recommendation:
For your static site, I recommend **Solution 1 (JavaScript Template)** because:
- No server requirements
- Faster for static hosting
- Easy to maintain
- Works with your current setup