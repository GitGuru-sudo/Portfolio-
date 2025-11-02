import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from '@remix-run/react';
import { gsap } from 'gsap';
import styles from './pill-nav.module.css';

export const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  activeHref = '/',
  className = '',
  ease = 'power2.easeOut',
  baseColor = '#000000',
  pillColor = '#ffffff',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#000000',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const pillRef = useRef(null);
  const navItemsRef = useRef([]);
  const location = useLocation();

  // Find active index based on current location
  useEffect(() => {
    const currentIndex = items.findIndex(item => {
      if (item.href === location.pathname) return true;
      if (item.href.includes('#') && location.pathname === '/' && location.hash === item.href.split('#')[1]) return true;
      return false;
    });
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location, items]);

  // Animate pill position
  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
    const targetElement = navItemsRef.current[targetIndex];

    if (targetElement && pillRef.current) {
      const { offsetLeft, offsetWidth } = targetElement;
      gsap.to(pillRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.6,
        ease: ease,
      });
    }
  }, [hoveredIndex, activeIndex, ease]);

  return (
    <nav
      className={`${styles.pillNav} ${className}`}
      style={{
        '--base-color': baseColor,
        '--pill-color': pillColor,
        '--hovered-pill-text-color': hoveredPillTextColor,
        '--pill-text-color': pillTextColor,
      }}
    >
      {logo && (
        <RouterLink to="/" className={`${styles.logo} cursor-target`} aria-label={logoAlt}>
          {typeof logo === 'string' ? (
            <img src={logo} alt={logoAlt} className={styles.logoImage} />
          ) : (
            logo
          )}
        </RouterLink>
      )}
      
      <div className={styles.navItems}>
        <div ref={pillRef} className={styles.pill} />
        {items.map((item, index) => (
          <RouterLink
            key={item.href}
            to={item.href}
            ref={el => (navItemsRef.current[index] = el)}
            className={`${styles.navItem} cursor-target`}
            data-active={activeIndex === index}
            data-hovered={hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {item.label}
          </RouterLink>
        ))}
      </div>
    </nav>
  );
};

export default PillNav;
