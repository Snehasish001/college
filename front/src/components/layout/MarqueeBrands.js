import '../styles/MarqueeBrands.css';
import bmwLogo from '../assets/bmw.webp';
import heroLogo from '../assets/hero.webp';
import ktmLogo from '../assets/ktm.webp';
import kawasakiLogo from '../assets/kawasaki.webp';
import yamahaLogo from '../assets/yamaha.webp';
import royalEnfieldLogo from '../assets/royal-enfield.webp';
import bajajLogo from '../assets/bajaj.webp';
import ducatiLogo from '../assets/ducati.webp';

const brands = [
  { name: "Yamaha", logo: yamahaLogo },
  { name: "Hero", logo: heroLogo },
  { name: "KTM", logo: ktmLogo },
  { name: "Royal Enfield", logo: royalEnfieldLogo },
  { name: "Bajaj", logo: bajajLogo },
  { name: "Ducati", logo: ducatiLogo },
  { name: "BMW", logo: bmwLogo },
  { name: "Kawasaki", logo: kawasakiLogo }
];

const MarqueeBrands = () => {
  return (
    <div className="marquee-wrapper">
      <div className="marquee">
        <div className="marquee-content">
          {brands.map((brand, idx) => (
            <div className="brand-card" key={`brand-${idx}`}>
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              ) : (
                <div className="brand-placeholder"></div>
              )}
              <p>{brand.name}</p>
            </div>
          ))}
        </div>
        
        {/* Duplicate the content for seamless looping */}
        <div className="marquee-content">
          {brands.map((brand, idx) => (
            <div className="brand-card" key={`brand-duplicate-${idx}`}>
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              ) : (
                <div className="brand-placeholder"></div>
              )}
              <p>{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeBrands;
