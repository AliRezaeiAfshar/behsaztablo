# News Article Management Guide

## How to Add New Articles

### Step 1: Create Article JSON File

1. Go to `data/articles/` folder
2. Create a new file named `article-id.json` (e.g., `news-4.json`)
3. Use this template:

```json
{
  "id": "news-4",
  "title": "عنوان مقاله شما",
  "excerpt": "خلاصه کوتاه مقاله که در صفحه اصلی نمایش داده می‌شود",
  "content": "<p>محتوای کامل مقاله با تگ‌های HTML</p><h2>عنوان بخش</h2><p>متن بخش...</p><ul><li>آیتم اول</li><li>آیتم دوم</li></ul>",
  "featuredImage": "../assets/images/your-image.webp",
  "date": "تاریخ مقاله به شمسی",
  "category": "نوع مقاله (اخبار، پروژه، رویداد، آموزش)",
  "tags": ["تگ۱", "تگ۲", "تگ۳"],
  "relatedArticles": ["news-1", "news-2"]
}
```

### Step 2: Update Articles Index

1. Open `data/articles.json`
2. Add your new article to the list:

```json
{
  "articles": [
    // ... existing articles ...
    {
      "id": "news-4",
      "title": "عنوان مقاله شما",
      "excerpt": "خلاصه کوتاه مقاله",
      "featuredImage": "../assets/images/your-image.webp",
      "date": "تاریخ مقاله",
      "category": "نوع مقاله"
    }
  ]
}
```

### Step 3: Link to Article

Use this URL format to link to your article:
`news-template.html?id=news-4`

## Available Categories
- اخبار (News)
- پروژه (Project)
- رویداد (Event)
- آموزش (Education)
- محصول (Product)

## Content Formatting Tips

### HTML Tags You Can Use:
- `<p>` for paragraphs
- `<h2>`, `<h3>` for headings
- `<ul>` and `<li>` for lists
- `<strong>` for bold text
- `<em>` for italic text
- `<a href="...">` for links
- `<img src="..." alt="...">` for images

### Example Content:
```html
<p>این یک پاراگراف نمونه است.</p>
<h2>عنوان بخش</h2>
<p>محتوای بخش با <strong>متن پررنگ</strong> و <em>متن کج</em>.</p>
<ul>
  <li>آیتم اول فهرست</li>
  <li>آیتم دوم فهرست</li>
</ul>
<p>برای اطلاعات بیشتر <a href="contact_quote_request.html">تماس بگیرید</a>.</p>
```

## File Structure
```
data/
├── articles.json          # Index of all articles
└── articles/
    ├── news-1.json       # Individual article files
    ├── news-2.json
    ├── news-3.json
    └── news-4.json       # Your new article
```

## Testing Your Article

1. Save your JSON files
2. Open `pages/news-template.html?id=your-article-id` in browser
3. Check that all content displays correctly
4. Verify links and images work properly

## Benefits of This System

✅ **Reusable Template**: One HTML file serves all articles
✅ **Easy Content Management**: Just edit JSON files
✅ **SEO Friendly**: Each article gets proper title and meta tags  
✅ **Related Articles**: Automatic cross-linking
✅ **Mobile Responsive**: Works on all devices
✅ **Fast Loading**: Only loads content when needed