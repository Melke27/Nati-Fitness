import { blogService } from '../../services';
import { useApp } from '../../context/AppContext';

export default function Blog() {
  const { openModal, closeModal } = useApp();
  const posts = blogService.getAll();

  const openPost = (post) => {
    openModal(
      <>
        <h2>{post.title}</h2>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '8px 0 24px 0' }}>
          Published by {post.author} on {post.date}
        </div>
        <div style={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>{post.content}</div>
        <button className="btn btn-secondary" style={{ marginTop: 30 }} onClick={closeModal}>Close</button>
      </>
    );
  };

  return (
    <div className="container">
      <div className="section-header">
        <h2>Fitness & Science Blog</h2>
        <p>Stay informed with technical training concepts, recovery guides, and nutrition advice.</p>
      </div>
      <div className="blog-grid">
        {posts.map((post) => (
          <div key={post.id} className="glass-card blog-card">
            <div className="blog-image-mock">📝</div>
            <div className="blog-content">
              <div className="blog-meta">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-summary">{post.summary}</p>
              <button className="btn btn-secondary btn-sm" onClick={() => openPost(post)}>Read Full Article</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
