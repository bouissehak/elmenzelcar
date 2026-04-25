import { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Ai-je besoin d\'un permis de conduire ?',
    answer: 'Oui, un permis de conduire valide est obligatoire. Il doit être en cours de validité depuis au moins 2 ans pour les véhicules standard, et 3 ans pour les véhicules de luxe. Les permis internationaux sont également acceptés.',
  },
  {
    question: 'Quel est le montant de la caution (dépôt de garantie) ?',
    answer: 'La caution varie selon la catégorie du véhicule : entre 2 000 MAD pour les véhicules économiques et 10 000 MAD pour les véhicules de luxe. Elle est entièrement remboursable sous 48h après le retour du véhicule en bon état.',
  },
  {
    question: 'L\'assurance est-elle incluse ?',
    answer: 'Oui, tous nos véhicules sont assurés en responsabilité civile. Vous pouvez également opter pour une assurance tous risques avec une franchise réduite pour plus de tranquillité.',
  },
  {
    question: 'Puis-je annuler ma réservation ?',
    answer: 'Oui, vous pouvez annuler gratuitement jusqu\'à 24h avant la date de prise en charge. Pour les annulations dans les 24h, des frais de 20% s\'appliquent.',
  },
  {
    question: 'Quels sont les modes de paiement acceptés ?',
    answer: 'Nous acceptons les paiements en espèces, par virement bancaire, et via les principales applications de paiement mobile (CIH Mobile, Bank of Africa, etc.).',
  },
];

const faqsAr = [
  {
    question: 'هل أحتاج إلى رخصة قيادة؟',
    answer: 'نعم، رخصة قيادة سارية المفعول إلزامية. يجب أن تكون صالحة لمدة عامين على الأقل للمركبات العادية، و3 سنوات للمركبات الفاخرة. الرخص الدولية مقبولة أيضاً.',
  },
  {
    question: 'ما هو مبلغ التأمين (الوديعة)؟',
    answer: 'تختلف الوديعة حسب فئة المركبة: بين 2000 درهم للمركبات الاقتصادية و10000 درهم للمركبات الفاخرة. تُسترد بالكامل خلال 48 ساعة بعد إعادة المركبة بحالة جيدة.',
  },
  {
    question: 'هل التأمين مشمول؟',
    answer: 'نعم، جميع مركباتنا مؤمنة ضد المسؤولية المدنية. يمكنك أيضاً اختيار تأمين شامل مع امتياز مخفض لمزيد من الراحة.',
  },
  {
    question: 'هل يمكنني إلغاء حجزي؟',
    answer: 'نعم، يمكنك الإلغاء مجاناً حتى 24 ساعة قبل موعد الاستلام. بالنسبة للإلغاءات خلال 24 ساعة، تُطبّق رسوم بنسبة 20%.',
  },
  {
    question: 'ما هي طرق الدفع المقبولة؟',
    answer: 'نقبل الدفع نقداً، التحويل البنكي، وعبر تطبيقات الدفع الرئيسية (سيح موبيل، بنك أفريقيا، إلخ).',
  },
];

function FAQItem({ item, isOpen, onToggle, isAr }) {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-5 text-left ${isAr ? 'flex-row-reverse' : ''}`}
      >
        <span className="font-bold text-brand-dark text-lg pr-4">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-brand-gold flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className={`text-brand-slate leading-relaxed ${isAr ? 'text-right' : ''}`}>
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { isAr } = useI18n();
  const data = isAr ? faqsAr : faqs;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-bold tracking-wide uppercase mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
            {isAr ? 'كل ما تريد معرفته' : 'Questions fréquentes'}
          </h2>
          <p className="text-brand-slate text-lg max-w-2xl mx-auto">
            {isAr
              ? 'أجوبة على الأسئلة الأكثر شيوعاً حول خدماتنا'
              : 'Réponses aux questions les plus courantes sur nos services'}
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 md:p-10 border border-slate-100">
          {data.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              isAr={isAr}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

