async function loadMediumPosts() {
  const mediumFeed = 'https://cors-anywhere.herokuapp.com/https://medium.com/feed/@jywcho8';

  try {
    const response = await fetch(mediumFeed, {
      headers: {
        'Origin': 'https://yourdomain.com'
      }
    });
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "application/xml");
    const items = xml.querySelectorAll("item");

    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = ''; // 초기화

    let count = 0;
    items.forEach(item => {
      if (count >= 4) return; // 최대 4개까지만
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const descriptionRaw = item.querySelector("description").textContent;
      const description = descriptionRaw.replace(/<[^>]*>?/gm, '').substring(0, 100); // HTML 태그 제거

      const card = document.createElement('div');
      card.className = 'blog-card';

      card.innerHTML = `
        <a href="${link}" target="_blank" class="blog-link">
          <h3>${title}</h3>
          <p>${description}...</p>
        </a>
      `;

      blogList.appendChild(card);
      count++;
    });

    if (count === 0) {
      blogList.innerHTML = '<p>No blog posts found. Stay tuned!</p>';
    }

  } catch (error) {
    console.error('Failed to load Medium posts:', error);
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = '<p>Failed to load blog posts.</p>';
  }
}

loadMediumPosts();
