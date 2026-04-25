const fs = require('fs');

const content = `import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useI18n } from '../contexts/I18nContext';
import StorageImage from './StorageImage';
import { X, Loader2, Calendar, Phone, MapPin, User, ChevronRight, CreditCard, CheckCircle } from 'lucide-react';

export default function BookingModal({ car, onClose }) {
  const { t, isAr } = useI18n();
  const createBooking = useMutation(api.bookings.createBooking);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    location: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const daysBetween = (a, b) => {
    const ms = new Date(b) - new Date(a);
    return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  };

  const totalPrice = form.startDate && form.endDate
    ? car.pricePerDay * daysBetween(form.startDate, form.endDate)
    : 0;
  const totalDays = form.startDate && form.endDate ? daysBetween(form.startDate, form.endDate) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.customerPhone || !form.startDate || !form.endDate || !form.location) return;
    setLoading(true);

    try {
      await createBooking({
        carId: car._id,
        carName: car.name,
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        startDate: form.startDate,
        endDate: form.endDate,
        location: form.location,
        totalPrice,
      });

      setSuccess(true);
      setTimeout(() => {
        const parts = [
          '🚗 ' + t('booking.title'),
          '',
          car.name,
          t('booking.name') + ': ' + form.customerName,
          t('booking.phone') + ': ' + form.customerPhone,
          t('booking.location') + ': ' + form.location,
          t('booking.startDate') + ': ' + form.startDate,
          t('booking.endDate') + ': ' + form.endDate,
          t('booking.total') + ': ' + totalPrice + ' MAD'
        ];
        const message = encodeURIComponent(parts.join('\\n'));
        window.open('https://wa.me/212682469090?text=' + message, '_blank');
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  if (!car) return null;

  const iconPos = isAr ? 'right-3' : 'left-3';
  const inputPad = isAr ? 'pr-10' : 'pl-10';
  const rtlClass = isAr ? 'text-right' : 'text-left';
  const flexReverse = isAr ? 'flex-row-reverse' : '';
  const arrowRtl = isAr ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <div className={'bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-scale ' + rtlClass}>
        <ModalHeader car={car} onClose={onClose} t={t} />
        {success ? <SuccessView isAr={isAr} /> : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-brand-dark mb-2">{t('booking.title')}</h2>
            <InputGroup iconPos={iconPos} inputPad={inputPad} form={form} onChange={handleChange} t={t} />
            <PriceSummary totalPrice={totalPrice} totalDays={totalDays} car={car} isAr={isAr} t={t} flexReverse={flexReverse} />
            <ActionButtons loading={loading} onClose={onClose} t={t} flexReverse={flexReverse} arrowRtl={arrowRtl} />
          </form>
        )}
      </div>
  );
}

function ModalHeader({ car, onClose, t }) {
  return (
    <div className="relative h-40 bg-slate-100">
      {car.displayImageUrl ? (
        <StorageImage url={car.displayImageUrl} alt={car.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
          <span className="text-slate-400 font-bold text-xl">{car.name}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition">
        <X className="w-5 h-5" />
      </button>
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white font-bold text-xl">{car.name}</h3>
        <p className="text-white/80 text-sm">{car.pricePerDay} MAD / {t('fleet.perDay')}</p>
      </div>
  );
}

function SuccessView({ isAr }) {
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center animate-fade-in-scale">
        <CheckCircle className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-xl font-bold text-brand-dark mb-2">{isAr ? 'تم إرسال طلبك!' : 'Demande envoyée !'}</h3>
      <p className="text-brand-slate">{isAr ? 'جاري التوجيه إلى واتساب...' : 'Redirection vers WhatsApp...'}</p>
    </div>
  );
}

function InputGroup({ iconPos, inputPad, form, onChange, t }) {
  return (
    <div className="space-y-3">
      <InputField icon={User} pos={iconPos} pad={inputPad} name="customerName" placeholder={t('booking.name')} value={form.customerName} onChange={onChange} />
      <InputField icon={Phone} pos={iconPos} pad={inputPad} name="customerPhone" type="tel" placeholder={t('booking.phone')} value={form.customerPhone} onChange={onChange} />
      <InputField icon={MapPin} pos={iconPos} pad={inputPad} name="location" placeholder={t('booking.location')} value={form.location} onChange={onChange} />
      <div className="grid grid-cols-2 gap-3">
        <InputField icon={Calendar} pos={iconPos} pad={inputPad} name="startDate" type="date" value={form.startDate} onChange={onChange} small />
        <InputField icon={Calendar} pos={iconPos} pad={inputPad} name="endDate" type="date" value={form.endDate} onChange={onChange} small />
      </div>
  );
}

function InputField({ icon: Icon, pos, pad, small, ...props }) {
  return (
    <div className="relative">
      <Icon className={'absolute top-3 ' + pos + ' w-5 h-5 text-slate-400'} />
      <input {...props} className={'w-full ' + pad + ' pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent bg-slate-50 transition-all' + (small ? ' text-sm' : '')} required />
    </div>
  );
}

function PriceSummary({ totalPrice, totalDays, car, isAr, t, flexReverse }) {
  if (totalPrice <= 0) return null;
  return (
    <div className="p-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/20">
      <div className={'flex items-center justify-between mb-2 ' + flexReverse}>
        <span className="text-sm text-brand-slate">{car.pricePerDay} MAD x {totalDays} {isAr ? 'أيام' : 'jours'}</span>
        <span className="text-sm font-bold text-brand-dark">{totalPrice} MAD</span>
      </div>
      <div className={'flex items-center justify-between ' + flexReverse}>
        <span className="font-bold text-brand-dark flex items-center gap-2"><CreditCard className="w-4 h-4" />{t('booking.total')}</span>
        <span className="text-xl font-extrabold text-brand-dark">{totalPrice} MAD</span>
      </div>
  );
}

function ActionButtons({ loading, onClose, t, flexReverse, arrowRtl }) {
  return (
    <div className={'flex gap-3 pt-2 ' + flexReverse}>
      <button type="button" onClick={onClose} className="flex-1 px-5 py-3.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition font-semibold">
        {t('booking.cancel')}
      </button>
      <button type="submit" disabled={loading} className="flex-1 px-5 py-3.5 rounded-2xl bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark font-bold transition-all duration-300 shadow-lg hover:shadow-brand-gold/30 disabled:opacity-60 flex items-center justify-center gap-2 group">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
          <>{t('booking.submit')}<ChevronRight className={'w-4 h-4 transition-transform ' + arrowRtl} /></>
        )}
      </button>
    </div>
  );
}
`;

fs.writeFileSync('src/components/BookingModal.jsx', content, 'utf8');
console.log('BookingModal written');
