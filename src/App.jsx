import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import InfoSection from './components/InfoSection';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import Cart from './components/Cart';
import CartFAB from './components/CartFAB';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';

export default function App() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <InfoSection />
        <MapSection />
      </main>
      <Footer />
      <Cart />
      <CartFAB />
      <Checkout />
      <OrderSuccess />
    </div>
  );
}
