async function loadMediumPosts() {
  const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jywcho8`;

  try {
    const response = await fetch(rss2jsonUrl);
    const data = await response.json();
    const blogList = document.getElementById('blog-list');

    if (!data.items || data.items.length === 0) {
      blogList.innerHTML = '<p>No blog posts yet. Stay tuned!</p>';
      return;
    }

    data.items.slice(0, 4).forEach(post => {
      const card = document.createElement('div');
      card.className = 'blog-card';

      card.innerHTML = `
        <a href="${post.link}" target="_blank" class="blog-link">
          <h3>${post.title}</h3>
          <p>${post.description.replace(/<[^>]+>/g, '').substring(0, 100)}...</p>
        </a>
      `;

      blogList.appendChild(card);
    });

  } catch (error) {
    console.error('Failed to fetch Medium posts:', error);
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = '<p>Failed to load blog posts.</p>';
  }
}

loadMediumPosts();
