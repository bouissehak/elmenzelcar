import { useI18n } from '../contexts/I18nContext';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Benali',
    city: 'Casablanca',
    rating: 5,
    text: 'Service impeccable ! J\'ai loué une Dacia pour le week-end, tout était parfait. Le processus de réservation via WhatsApp a pris moins de 5 minutes. Je recommande vivement El Menzel Car.',
    avatar: 'AB',
  },
  {
    name: 'Sofia El Amrani',
    city: 'Fès',
    rating: 5,
    text: 'Excellente expérience ! Les prix sont très compétitifs et les voitures sont impeccables. Le personnel est professionnel et serviable. C\'est devenu mon agence de location préférée.',
    avatar: 'SE',
  },
  {
    name: 'Karim Idrissi',
    city: 'Marrakech',
    rating: 5,
    text: 'J\'ai loué une berline pour un voyage d\'affaires. La voiture était propre, bien entretenue et le prix était très raisonnable. Merci El Menzel Car pour ce service de qualité !',
    avatar: 'KI',
  },
];

const testimonialsAr = [
  {
    name: 'أحمد بنعلي',
    city: 'الدار البيضاء',
    rating: 5,
    text: 'خدمة رائعة! استأجرت داسيا لعطلة نهاية الأسبوع، كل شيء كان مثالياً. عملية الحجز عبر الواتساب استغرقت أقل من 5 دقائق. أنصح بشدة بالمنزل للسيارات.',
    avatar: 'أب',
  },
  {
    name: 'صوفيا العمراني',
    city: 'فاس',
    rating: 5,
    text: 'تجربة ممتازة! الأسعار تنافسية جداً والسيارات في حالة ممتازة. الموظفون محترفون ومتعاونون. أصبحت وكالتي المفضلة للتأجير.',
    avatar: 'صع',
  },
  {
    name: 'كريم الإدريسي',
    city: 'مراكش',
    rating: 5,
    text: 'استأجرت سيدان لرحلة عمل. السيارة كانت نظيفة ومصانة جيداً والسعر كان معقولاً جداً. شكراً للمنزل للسيارات على هذه الخدمة المتميزة!',
    avatar: 'كإ',
  },
];

export default function TestimonialsSection() {
  const { isAr } = useI18n();
  const data = isAr ? testimonialsAr : testimonials;

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-bold tracking-wide uppercase mb-4">
            <Star className="w-4 h-4" />
            <span>{isAr ? 'آراء العملاء' : 'Avis Clients'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
            {isAr ? 'ماذا يقول عملاؤنا؟' : 'Ce que disent nos clients'}
          </h2>
          <p className="text-brand-slate text-lg max-w-2xl mx-auto">
            {isAr
              ? 'ثقة آلاف العملاء الذين اختاروا المنزل للسيارات لتأجير مركباتهم'
              : 'La confiance de milliers de clients qui ont choisi El Menzel Car pour leur location'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:shadow-brand-gold/10 hover:border-brand-gold/20 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors" />

              {/* Stars */}
              <div className={`flex gap-1 mb-5 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-brand-gold fill-brand-gold" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-brand-slate leading-relaxed mb-6 text-sm">
                "{item.text}"
              </p>

              {/* Customer info */}
              <div className={`flex items-center gap-4 pt-4 border-t border-slate-200 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-brand-gold font-bold text-sm">
                  {item.avatar}
                </div>
                <div className={isAr ? 'text-right' : ''}>
                  <p className="font-bold text-brand-dark">{item.name}</p>
                  <p className="text-sm text-brand-slate">{item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

