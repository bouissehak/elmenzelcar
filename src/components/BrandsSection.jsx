import { useI18n } from '../contexts/I18nContext';
import { Car } from 'lucide-react';

const brands = [
  { name: 'Renault', abbr: 'R' },
  { name: 'Peugeot', abbr: 'P' },
  { name: 'Dacia', abbr: 'D' },
  { name: 'Hyundai', abbr: 'H' },
  { name: 'Kia', abbr: 'K' },
  { name: 'Citroën', abbr: 'C' },
];

export default function BrandsSection() {
  const { isAr } = useI18n();

  return (
    <section className="py-16 md:py-20 bg-brand-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-brand-slate text-sm uppercase tracking-widest mb-3">
            {isAr ? 'نحن نثق بهم' : 'Nos partenaires de confiance'}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {isAr ? 'ماركات المركبات المتوفرة' : 'Marques de véhicules disponibles'}
          </h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-gold/10 group-hover:bg-brand-gold flex items-center justify-center mb-3 transition-colors duration-300">
                <span className="text-xl font-bold text-brand-gold group-hover:text-brand-dark transition-colors">
                  {brand.abbr}
                </span>
              </div>
              <span className="text-white/70 group-hover:text-white text-sm font-medium transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm">
            {isAr
              ? 'والمزيد من الماركات المتوفرة في أسطولنا...'
              : 'Et bien d\'autres marques disponibles dans notre flotte...'}
          </p>
        </div>
      </div>
    </section>
  );
}

