import { useI18n } from '../contexts/I18nContext';
import { Check, X, Calendar, ArrowRight, Tag } from 'lucide-react';
import StorageImage from './StorageImage';

export default function CarCard({ car, onBook }) {
  const { t, isAr } = useI18n();
  const isAvailable = car.status === 'available';

  return (
    <div className="group card-premium bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
      {/* Image Container */}
      <div className="relative h-56 bg-slate-100 overflow-hidden">
        {car.displayImageUrl ? (
          <StorageImage
            url={car.displayImageUrl}
            alt={car.name}
            className="w-full h-full object-cover img-zoom"
            placeholderClassName="w-full h-full bg-slate-200 animate-pulse"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-slate-200">
            <Calendar className="w-12 h-12 text-slate-300" />
            <span className="text-sm text-slate-400 font-medium">{car.name}</span>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Availability Badge */}
        <div className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'}`}>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${
              isAvailable
                ? 'bg-emerald-500/90 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-rose-500/90 text-white shadow-lg shadow-rose-500/30'
            }`}
          >
            {isAvailable ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            {isAvailable ? t('fleet.available') : t('fleet.rented')}
          </span>
        </div>

        {/* Category badge */}
        <div className={`absolute bottom-4 ${isAr ? 'left-4' : 'right-4'}`}>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-brand-dark shadow-sm">
            <Tag className="w-3 h-3" />
            {t(`categories.${car.category || 'sedan'}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 flex-1 flex flex-col ${isAr ? 'text-right' : 'text-left'}`}>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-brand-dark mb-2 group-hover:text-brand-gold transition-colors duration-300">
            {car.name}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-slate-100" />
          </div>
        </div>

        {/* Price & CTA */}
        <div className={`flex items-center justify-between mt-2 ${isAr ? 'flex-row-reverse' : ''}`}>
          <div>
            <span className="text-3xl font-extrabold text-brand-dark">{car.pricePerDay}</span>
            <span className="text-sm text-brand-slate font-medium"> {t('fleet.perDay')}</span>
          </div>
          <button
            onClick={() => onBook(car)}
            disabled={!isAvailable}
            className={`group/btn inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
              isAvailable
                ? 'bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark shadow-lg hover:shadow-brand-gold/30 hover:-translate-y-0.5'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {t('fleet.bookNow')}
            <ArrowRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 ${isAr ? 'rotate-180 group-hover/btn:-translate-x-0.5' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

