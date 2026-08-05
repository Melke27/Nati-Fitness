import { Routes, Route } from 'react-router-dom';
import { useApp } from './context/AppContext';
import DevToolbar from './components/layout/DevToolbar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Modal from './components/ui/Modal';
import ToastContainer from './components/ui/ToastContainer';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Memberships from './pages/public/Memberships';
import Trainers from './pages/public/Trainers';
import FAQ from './pages/public/FAQ';
import Gallery from './pages/public/Gallery';
import Blog from './pages/public/Blog';
import Contact from './pages/public/Contact';
import MemberPortal from './pages/member/MemberPortal';
import TrainerPortal from './pages/trainer/TrainerPortal';
import AdminPortal from './pages/admin/AdminPortal';

function PublicLayout({ children }) {
  const { currentRole } = useApp();
  return (
    <>
      {children}
      {currentRole === 'public' && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <>
      <DevToolbar />
      <Header />
      <main id="appRoot">
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/memberships" element={<PublicLayout><Memberships /></PublicLayout>} />
          <Route path="/trainers" element={<PublicLayout><Trainers /></PublicLayout>} />
          <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/member/*" element={<MemberPortal />} />
          <Route path="/trainer/*" element={<TrainerPortal />} />
          <Route path="/admin/*" element={<AdminPortal />} />
        </Routes>
      </main>
      <ToastContainer />
      <Modal />
    </>
  );
}
