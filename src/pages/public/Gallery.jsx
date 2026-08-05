const GALLERY_ITEMS = [
  { icon: '🏋️‍♂️', title: 'Free Weights Section', desc: 'Olympic lifting bars, dumbbells up to 150 lbs, and full power cages.' },
  { icon: '🧘‍♀️', title: 'Yoga & Pilates Studio', desc: 'Temperature-controlled studio with state of the art sound and lighting.' },
  { icon: '🏃‍♂️', title: 'Cardio Balcony', desc: 'High-end treadmills, curved self-powered runners, and rowing machines.' },
  { icon: '💦', title: 'Sauna & Spa Suite', desc: 'Unwind after intense sessions inside our dry infrared saunas.' },
];

export default function Gallery() {
  return (
    <div className="container">
      <div className="section-header">
        <h2>Triener Photo Gallery</h2>
        <p>Step inside our world-class athletic facilities.</p>
      </div>
      <div className="gallery-grid">
        {GALLERY_ITEMS.map((item) => (
          <div key={item.title} className="gallery-item">
            <span className="gallery-placeholder-icon">{item.icon}</span>
            <div className="gallery-overlay">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
