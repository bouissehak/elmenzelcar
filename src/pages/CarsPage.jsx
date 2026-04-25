import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useI18n } from '../contexts/I18nContext';
import CarCard from '../components/CarCard';
import BookingModal from '../components/BookingModal';
import { Car, Loader2, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CarsPage() {
  const { t, isAr } = useI18n();
  const cars = useQuery(api.cars.getCars, { status: 'available' });
  const [selectedCar, setSelectedCar] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [
    { value: 'all', label: isAr ? 'الكل' : 'Toutes' },
    { value: 'economy', label: t('categories.economy') },
    { value: 'sedan', label: t('categories.sedan') },
    { value: 'suv', label: t('categories.suv') },
    { value: 'luxury', label: t('categories.luxury') },
  ];

  const filteredCars = categoryFilter === 'all'
    ? cars
    : cars?.filter((car) => car.category === categoryFilter);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header with subtle background */}
      <section className="relative bg-brand-dark text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80"
            alt="Cars background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/90 to-brand-dark" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${isAr ? 'md:text-right' : 'md:text-left'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Car className="w-4 h-4 text-brand-gold" />
              <span className="text-sm text-white/90 font-medium">{isAr ? 'الأسطول' : 'La flotte'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {isAr ? 'استكشف مركباتنا' : 'Explorez nos véhicules'}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              {isAr
                ? 'اختر من بين مجموعة واسعة من المركبات الفاخرة المتاحة للإيجار'
                : 'Choisissez parmi notre sélection de véhicules premium disponibles à la location'}
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className={`flex items-center gap-3 mb-12 overflow-x-auto pb-2 ${isAr ? 'flex-row-reverse' : ''}`}>
            <SlidersHorizontal className="w-5 h-5 text-brand-slate flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  categoryFilter === cat.value
                    ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/30'
                    : 'bg-white text-brand-slate border border-slate-200 hover:border-brand-gold hover:text-brand-dark hover:shadow-md'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          {filteredCars?.length > 0 && (
            <p className={`text-sm text-brand-slate mb-8 ${isAr ? 'text-right' : ''}`}>
              {filteredCars.length} {isAr ? 'مركبة متاحة' : 'véhicules disponibles'}
            </p>
          )}

          {/* Cars Grid */}
          {cars === undefined ? (
            <div className="flex items-center justify-center py-20 text-brand-slate">
              <Loader2 className="w-10 h-10 animate-spin mr-3" />
              <span className="text-lg">{isAr ? 'جاري التحميل...' : 'Chargement...'}</span>
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center py-20">
              <Car className="w-20 h-20 mx-auto mb-4 text-slate-300" />
              <p className="text-lg text-brand-slate mb-4">
                {isAr ? 'لا توجد مركبات متاحة في هذه الفئة' : 'Aucun véhicule disponible dans cette catégorie.'}
              </p>
              <Link
                to="/cars"
                onClick={() => setCategoryFilter('all')}
                className="inline-flex items-center gap-2 text-brand-gold font-semibold hover:underline"
              >
                {isAr ? 'عرض كل المركبات' : 'Voir tous les véhicules'}
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car, index) => (
                <div
                  key={car._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <CarCard car={car} onBook={setSelectedCar} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedCar && (
        <BookingModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
}

