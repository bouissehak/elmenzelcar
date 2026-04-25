import { useI18n } from '../contexts/I18nContext';
import { Sparkles, Calendar, Clock, Percent, ArrowRight, Zap } from 'lucide-react';

const offers = [
  {
    icon: Percent,
    badge: '-10%',
    title: 'Première réservation',
    description: 'Bénéficiez de 10% de réduction sur votre première location. Offre valable pour tous les nouveaux clients.',
    color: 'bg-emerald-50 border-emerald-200',
    badgeColor: 'bg-emerald-500',
  },
  {
    icon: Calendar,
    badge: 'Weekend',
    title: 'Offre Weekend',
    description: 'Louez du vendredi au dimanche et économisez 15%. Parfait pour vos escapades de week-end.',
    color: 'bg-brand-gold/10 border-brand-gold/30',
    badgeColor: 'bg-brand-gold text-brand-dark',
  },
  {
    icon: Clock,
    badge: 'Longue durée',
    title: 'Location longue durée',
    description: 'Pour les locations de plus de 7 jours, profitez de tarifs dégressifs jusqu\'à -25%.',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-500',
  },
];

const offersAr = [
  {
    icon: Percent,
    badge: '-10%',
    title: 'أول حجز',
    description: 'احصل على خصم 10% على أول عملية تأجير. العرض ساري لجميع العملاء الجدد.',
    color: 'bg-emerald-50 border-emerald-200',
    badgeColor: 'bg-emerald-500',
  },
  {
    icon: Calendar,
    badge: 'عطلة نهاية الأسبوع',
    title: 'عرض نهاية الأسبوع',
    description: 'استأجر من الجمعة إلى الأحد ووفر 15%. مثالي لرحلات نهاية الأسبوع.',
    color: 'bg-brand-gold/10 border-brand-gold/30',
    badgeColor: 'bg-brand-gold text-brand-dark',
  },
  {
    icon: Clock,
    badge: 'مدة طويلة',
    title: 'تأجير طويل المدى',
    description: 'للاستئجار لأكثر من 7 أيام، استفد من أسعار متدرجة تصل إلى خصم 25%.',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-500',
  },
];

export default function OffersSection() {
  const { isAr } = useI18n();
  const data = isAr ? offersAr : offers;

  return (
    <section className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-bold tracking-wide uppercase mb-4">
            <Zap className="w-4 h-4" />
            <span>{isAr ? 'عروض حصرية' : 'Offres Exclusives'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
            {isAr ? 'أفضل العروض لك' : 'Nos meilleures offres'}
          </h2>
          <p className="text-brand-slate text-lg max-w-2xl mx-auto">
            {isAr
              ? 'وفّر أكثر مع عروضنا الخاصة المصممة لتناسب جميع احتياجاتك'
              : 'Économisez plus avec nos offres spéciales conçues pour tous vos besoins'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((offer, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 border-2 ${offer.color} hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
            >
              {/* Badge */}
              <div className={`absolute -top-4 ${isAr ? 'left-6' : 'right-6'} px-4 py-1.5 rounded-full ${offer.badgeColor} text-white text-sm font-bold shadow-lg`}>
                {offer.badge}
              </div>

              <div className={`flex items-center gap-4 mb-5 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="w-14 h-14 rounded-2xl bg-brand-dark flex items-center justify-center">
                  <offer.icon className="w-7 h-7 text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">{offer.title}</h3>
              </div>

              <p className="text-brand-slate leading-relaxed mb-6">
                {offer.description}
              </p>

              <a
                href="#fleet"
                className={`inline-flex items-center gap-2 text-brand-dark font-semibold hover:text-brand-gold transition ${isAr ? 'flex-row-reverse' : ''}`}
              >
                {isAr ? 'احجز الآن' : 'En profiter'}
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

