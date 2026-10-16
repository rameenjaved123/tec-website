import { useEffect, useState } from 'react';

/*
 * Standalone, bilingual (English / Arabic) landing page for Saudi (KSA)
 * government-sponsored students. Rendered OUTSIDE the main AppLayout (no site
 * navbar/footer/chat) so it shows only the English programme content.
 * A language toggle switches all copy and flips the page to RTL for Arabic.
 * Fully self-contained: styles scoped under `.ksa-`, inlined here.
 */

const BRAND = { green: '#0f3d24', greenMid: '#1a4a2e', gold: '#c9a227' };

const APPLY_URL = '/application-form';
const ADMISSIONS_EMAIL = 'admissions@trenteducation.ac.uk';
const WHATSAPP = '+44 7463 026467';
const CAMPUS = '16 Castle Blvd, Nottingham, NG7 1FL, UK';

const IMGS = {
  classrooms: '/assets/images/events/tec-classroom-session.webp',
  faculty: '/assets/images/events/teacher-classroom-portrait.jpg',
  facilities: '/assets/images/events/student-common-room.jpg',
  support: '/assets/images/events/student-support-session.jpg',
  life: '/assets/images/events/esol-trip.jpg',
  leisure: '/assets/images/events/student-lounge-group.jpg',
};

const ACCREDITATIONS = [
  { img: '/assets/badges/british-council-badge.png', alt: 'British Council Accredited' },
  { img: '/assets/logos/partners/ascentis-trimmed.png', alt: 'Ascentis Awarding Organisation', word: 'Ascentis', sub: 'Awarding Organisation' },
  { img: '/assets/logos/british-council-ielts.jpg', alt: 'IELTS Registration Centre' },
  { img: '/assets/logos/ncfe.jpg', alt: 'NCFE' },
  { img: '/assets/badges/asic.jpg', alt: 'ASIC Accredited' },
];

const L = {
  en: {
    applyShort: 'Apply / Enrol',
    welcome: 'Welcome',
    heroTitle: 'Study English in Nottingham, UK',
    heroSub: 'A premier English Language Programme at Trent Education Centre — a British Council accredited English language centre in the heart of the United Kingdom.',
    pill1: 'British Council Accredited',
    pill2: 'Government-Sponsored Students Welcome',
    factDurationL: 'Duration', factDurationV: 'Up to 9 months',
    factTuitionL: 'Tuition', factTuitionV: '20 hours / week',
    factLocationL: 'Location', factLocationV: 'Castle Boulevard, Nottingham',
    factModeL: 'Mode', factModeV: 'Face-to-face',
    applyNow: 'Apply Now',

    aboutEyebrow: 'The Programme',
    aboutH2: 'A structured pathway to stronger English',
    aboutLead: 'Trent Education Centre offers a structured English Language Programme for students who want to improve their English for everyday life, professional development and further study. It is delivered at our Castle Boulevard campus in Nottingham in a supportive, student-focused learning environment, and is particularly suitable for international students who intend to progress to university or another form of higher education.',
    forWhoH3: 'Who is this programme for?',
    forWho: [
      'Students preparing for study at an international university or college',
      'Learners who want stronger academic English for lectures, seminars and assignments',
      'Those who want to build confidence in speaking, listening, reading and writing',
      'Professionals improving communication for work and international environments',
      'Anyone seeking a structured, classroom-based English programme in the UK',
    ],

    curriculumEyebrow: 'Curriculum',
    curriculumH2: 'What you will study',
    curriculumLead: 'Teaching is organised around the four core language skills, supported by grammar, vocabulary, pronunciation and study skills. Content is adapted to your starting level following an initial assessment.',
    skills: [
      { t: 'Speaking & Communication', d: 'Develop fluency, pronunciation, discussion skills and confidence in everyday, academic and professional situations.' },
      { t: 'Listening', d: 'Understand conversations, classroom instruction, lectures and a range of spoken English accents and contexts.' },
      { t: 'Reading', d: 'Build comprehension, vocabulary and the ability to identify key ideas, detail, purpose and meaning in different text types.' },
      { t: 'Writing', d: 'Improve sentence structure, grammar, paragraphing and organisation for emails, reports, essays and academic tasks.' },
      { t: 'Grammar & Vocabulary', d: 'Strengthen accuracy and expand the vocabulary needed for study, work and day-to-day communication.' },
      { t: 'Academic & Study Skills', d: 'Develop note-taking, presentation, seminar participation, research awareness and independent learning strategies.' },
    ],

    outcomesEyebrow: 'Learning Outcomes',
    outcomesH2: 'By the end of the programme, you will be better able to',
    outcomes: [
      'Communicate more confidently and effectively in English',
      'Understand and respond to a wider range of spoken and written English',
      'Write with improved structure, accuracy and clarity',
      'Participate more effectively in lessons, discussions and presentations',
      'Use English more independently for study, work and daily life',
      'Prepare for the language demands of further or higher education',
    ],

    whyEyebrow: 'Why Trent Education Centre',
    whyH2: 'A supportive place to learn and live',
    why: [
      { img: IMGS.classrooms, t: 'Modern Classrooms', d: 'Bright, well-equipped classrooms designed for interactive language learning.' },
      { img: IMGS.faculty, t: 'Experienced Faculty', d: 'Qualified, supportive English teachers focused on your progress.' },
      { img: IMGS.facilities, t: 'Comfortable Facilities', d: 'A welcoming student environment with comfortable study and social spaces.' },
      { img: IMGS.support, t: 'One-to-One Support', d: 'Personal academic and welfare support throughout your studies.' },
      { img: IMGS.life, t: 'Life Beyond the Classroom', d: 'Trips and activities to practise English and experience life in the UK.' },
      { img: IMGS.leisure, t: 'Indoor Games & Leisure', d: 'A relaxed leisure area to unwind and make friends between classes.' },
    ],

    feesEyebrow: 'Course Details',
    feesH2: "Fees & what's included",
    feeNote: 'Government-sponsored course fee',
    feeList: [
      'Up to 9 months of English language study',
      '20 hours of tuition per week',
      'Initial assessment to place you at the right level',
      'Ongoing feedback and progress monitoring',
      'Academic and welfare support throughout',
    ],
    feeSmall: 'Please confirm current fees, start dates and any additional costs (such as coursebooks) with our Admissions Team before making payment or travel arrangements.',

    livingEyebrow: 'Living & Support in Nottingham',
    livingH2: "We'll help you settle in",
    living: [
      { t: 'Student Support', d: 'Induction programmes to help you settle in, academic support and guidance, and welfare services for personal support.' },
      { t: 'Getting Here', d: 'Nottingham is easily reached from London, Birmingham, Manchester and East Midlands Airport by train, coach or a pre-booked airport transfer.' },
      { t: 'A Welcoming City', d: 'Nottingham is a diverse, student-friendly city, and the cost of living is generally more affordable than other large UK cities.' },
      { t: 'Healthcare & Safety', d: 'Access to NHS services, a 24-hour emergency line, and a safe, respectful environment where everyone is welcome regardless of culture or background.' },
    ],
    visaLabel: 'Visa:',
    visaText: ' Most students study on a Short-Term Study Visa, which allows stays for the course length (maximum 9 months). Always check the specific requirements for your nationality and course on the UK Government website before you travel.',

    accredTitle: 'Accredited & recognised by',

    ctaTitle: 'Start your English language journey with Trent',
    ctaSub: "Apply today or contact our Admissions Team — we're happy to help.",
    ctaBtn: 'Apply / Enrol Now',
    cEmail: 'Email', cCall: 'Call / WhatsApp', cCampus: 'Campus',
    colophon: 'Trent Education Centre Ltd · Registered in England and Wales No. 7959722',
  },

  ar: {
    applyShort: 'قدّم / سجّل',
    welcome: 'أهلاً وسهلاً',
    heroTitle: 'ادرس اللغة الإنجليزية في نوتنغهام، المملكة المتحدة',
    heroSub: 'برنامج متميّز لتعليم اللغة الإنجليزية في مركز ترنت التعليمي — مركز معتمد من المجلس الثقافي البريطاني لتعليم اللغة الإنجليزية في قلب المملكة المتحدة.',
    pill1: 'معتمد من المجلس الثقافي البريطاني',
    pill2: 'نرحّب بالطلاب المبتعثين على نفقة الحكومة',
    factDurationL: 'المدة', factDurationV: 'حتى 9 أشهر',
    factTuitionL: 'ساعات الدراسة', factTuitionV: '20 ساعة أسبوعياً',
    factLocationL: 'الموقع', factLocationV: 'كاسل بوليفارد، نوتنغهام',
    factModeL: 'طريقة الدراسة', factModeV: 'حضوري (وجهاً لوجه)',
    applyNow: 'قدّم الآن',

    aboutEyebrow: 'البرنامج',
    aboutH2: 'مسار منظّم لإتقان اللغة الإنجليزية',
    aboutLead: 'يقدّم مركز ترنت التعليمي برنامجاً منظّماً لتعليم اللغة الإنجليزية للطلاب الراغبين في تطوير لغتهم الإنجليزية للحياة اليومية والتطوّر المهني ومواصلة الدراسة. يُقدَّم البرنامج في حرم كاسل بوليفارد في نوتنغهام ضمن بيئة تعليمية داعمة تركّز على الطالب، وهو مناسب بشكل خاص للطلاب الدوليين الذين يخطّطون للالتحاق بالجامعة أو بمرحلة تعليم عالٍ أخرى.',
    forWhoH3: 'لمن هذا البرنامج؟',
    forWho: [
      'الطلاب الذين يستعدّون للدراسة في جامعة أو كلية دولية',
      'من يرغب في تقوية الإنجليزية الأكاديمية للمحاضرات والندوات والواجبات',
      'من يرغب في بناء الثقة في التحدّث والاستماع والقراءة والكتابة',
      'المهنيون الذين يطوّرون مهارات التواصل للعمل والبيئات الدولية',
      'كل من يبحث عن برنامج إنجليزي منظّم داخل الفصول الدراسية في المملكة المتحدة',
    ],

    curriculumEyebrow: 'المنهج',
    curriculumH2: 'ماذا ستدرس',
    curriculumLead: 'يُنظَّم التدريس حول المهارات اللغوية الأساسية الأربع، مدعومةً بالقواعد والمفردات والنطق ومهارات الدراسة. ويُكيَّف المحتوى حسب مستواك بعد تقييم أولي.',
    skills: [
      { t: 'التحدّث والتواصل', d: 'طوّر الطلاقة والنطق ومهارات النقاش والثقة في المواقف اليومية والأكاديمية والمهنية.' },
      { t: 'الاستماع', d: 'افهم المحادثات والتعليمات الصفية والمحاضرات ومجموعة من لهجات وسياقات اللغة الإنجليزية المنطوقة.' },
      { t: 'القراءة', d: 'طوّر الاستيعاب والمفردات والقدرة على تحديد الأفكار الرئيسية والتفاصيل والغرض والمعنى في أنواع النصوص المختلفة.' },
      { t: 'الكتابة', d: 'حسّن بناء الجمل والقواعد وتنظيم الفقرات للرسائل والتقارير والمقالات والمهام الأكاديمية.' },
      { t: 'القواعد والمفردات', d: 'عزّز الدقة ووسّع المفردات اللازمة للدراسة والعمل والتواصل اليومي.' },
      { t: 'المهارات الأكاديمية ومهارات الدراسة', d: 'طوّر مهارات تدوين الملاحظات والعروض التقديمية والمشاركة في الندوات والوعي البحثي واستراتيجيات التعلّم المستقل.' },
    ],

    outcomesEyebrow: 'مخرجات التعلّم',
    outcomesH2: 'بنهاية البرنامج، ستكون أكثر قدرة على',
    outcomes: [
      'التواصل بثقة وفعالية أكبر باللغة الإنجليزية',
      'فهم مجموعة أوسع من الإنجليزية المنطوقة والمكتوبة والتفاعل معها',
      'الكتابة ببنية ودقة ووضوح أفضل',
      'المشاركة بفعالية أكبر في الدروس والنقاشات والعروض التقديمية',
      'استخدام الإنجليزية باستقلالية أكبر للدراسة والعمل والحياة اليومية',
      'الاستعداد للمتطلّبات اللغوية للتعليم المتقدّم أو العالي',
    ],

    whyEyebrow: 'لماذا مركز ترنت التعليمي',
    whyH2: 'مكان داعم للتعلّم والحياة',
    why: [
      { img: IMGS.classrooms, t: 'فصول دراسية حديثة', d: 'فصول مضيئة ومجهّزة جيداً مصمّمة لتعلّم اللغة بشكل تفاعلي.' },
      { img: IMGS.faculty, t: 'كادر تدريسي متمرّس', d: 'معلّمو لغة إنجليزية مؤهّلون وداعمون يركّزون على تقدّمك.' },
      { img: IMGS.facilities, t: 'مرافق مريحة', d: 'بيئة طلابية مرحّبة مع مساحات مريحة للدراسة والتواصل الاجتماعي.' },
      { img: IMGS.support, t: 'دعم فردي', d: 'دعم أكاديمي وشخصي فردي طوال فترة دراستك.' },
      { img: IMGS.life, t: 'حياة خارج الفصل', d: 'رحلات وأنشطة لممارسة الإنجليزية والتعرّف على الحياة في المملكة المتحدة.' },
      { img: IMGS.leisure, t: 'ألعاب داخلية وترفيه', d: 'منطقة ترفيهية هادئة للاسترخاء وتكوين الصداقات بين الحصص.' },
    ],

    feesEyebrow: 'تفاصيل الدورة',
    feesH2: 'الرسوم وما تشمله',
    feeNote: 'رسوم الدورة (على نفقة الحكومة)',
    feeList: [
      'حتى 9 أشهر من دراسة اللغة الإنجليزية',
      '20 ساعة تدريس أسبوعياً',
      'تقييم أولي لتحديد المستوى المناسب لك',
      'تغذية راجعة مستمرة ومتابعة للتقدّم',
      'دعم أكاديمي ورعاية طوال البرنامج',
    ],
    feeSmall: 'يرجى تأكيد الرسوم الحالية وتواريخ البدء وأي تكاليف إضافية (مثل الكتب الدراسية) مع فريق القبول قبل الدفع أو ترتيبات السفر.',

    livingEyebrow: 'الحياة والدعم في نوتنغهام',
    livingH2: 'سنساعدك على الاستقرار',
    living: [
      { t: 'دعم الطلاب', d: 'برامج تعريفية تساعدك على الاستقرار، ودعم وتوجيه أكاديمي، وخدمات رعاية للدعم الشخصي.' },
      { t: 'الوصول إلينا', d: 'يسهل الوصول إلى نوتنغهام من لندن وبرمنغهام ومانشستر ومطار إيست ميدلاندز بالقطار أو الحافلة أو خدمة نقل من المطار محجوزة مسبقاً.' },
      { t: 'مدينة مرحّبة', d: 'نوتنغهام مدينة متنوّعة وصديقة للطلاب، وتكلفة المعيشة فيها أقل عموماً من المدن البريطانية الكبرى الأخرى.' },
      { t: 'الرعاية الصحية والأمان', d: 'إمكانية الوصول إلى خدمات هيئة الصحة الوطنية (NHS)، وخط طوارئ على مدار الساعة، وبيئة آمنة ومحترمة يُرحَّب فيها بالجميع بغضّ النظر عن الثقافة أو الخلفية.' },
    ],
    visaLabel: 'التأشيرة:',
    visaText: ' يدرس معظم الطلاب بتأشيرة دراسة قصيرة الأمد (Short-Term Study Visa) التي تتيح الإقامة طوال مدة الدورة (بحدٍّ أقصى 9 أشهر). تحقّق دائماً من المتطلبات الخاصة بجنسيتك ودورتك على موقع الحكومة البريطانية قبل السفر.',

    accredTitle: 'معتمد ومعترف به من',

    ctaTitle: 'ابدأ رحلتك في تعلّم اللغة الإنجليزية مع ترنت',
    ctaSub: 'قدّم اليوم أو تواصل مع فريق القبول — يسعدنا مساعدتك.',
    ctaBtn: 'قدّم / سجّل الآن',
    cEmail: 'البريد الإلكتروني', cCall: 'اتصال / واتساب', cCampus: 'الحرم الجامعي',
    colophon: 'Trent Education Centre Ltd · Registered in England and Wales No. 7959722',
  },
};

function Fact({ label, value }) {
  return (
    <div className="ksa-fact">
      <span className="ksa-fact-label">{label}</span>
      <span className="ksa-fact-value">{value}</span>
    </div>
  );
}

export default function StudyEnglishKSAPage() {
  const [lang, setLang] = useState('en');
  const t = L[lang];
  const rtl = lang === 'ar';

  useEffect(() => {
    const prev = document.title;
    document.title = rtl
      ? 'ادرس اللغة الإنجليزية في نوتنغهام — مركز ترنت التعليمي'
      : 'Study English in Nottingham — Trent Education Centre';
    return () => { document.title = prev; };
  }, [rtl]);

  return (
    <div className="ksa-root" dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <style>{ksaStyles}</style>

      {/* Top bar */}
      <header className="ksa-topbar">
        <img src="/assets/logos/tec-logo-transparent.png" alt="Trent Education Centre" className="ksa-logo" />
        <div className="ksa-topbar-right">
          <div className="ksa-lang" role="group" aria-label="Language">
            <button className={`ksa-lang-btn${lang === 'en' ? ' is-active' : ''}`} onClick={() => setLang('en')}>English</button>
            <button className={`ksa-lang-btn${lang === 'ar' ? ' is-active' : ''}`} onClick={() => setLang('ar')}>العربية</button>
          </div>
          <a href={APPLY_URL} className="ksa-btn ksa-btn-gold ksa-topbar-cta">{t.applyShort}</a>
        </div>
      </header>

      {/* Hero */}
      <section className="ksa-hero">
        <div className="ksa-hero-overlay" />
        <div className="ksa-hero-inner">
          <p className="ksa-welcome">{t.welcome}</p>
          <h1 className="ksa-hero-title">{t.heroTitle}</h1>
          <p className="ksa-hero-sub">{t.heroSub}</p>
          <div className="ksa-badge-line">
            <span className="ksa-pill">{t.pill1}</span>
            <span className="ksa-pill">{t.pill2}</span>
          </div>
          <div className="ksa-facts">
            <Fact label={t.factDurationL} value={t.factDurationV} />
            <Fact label={t.factTuitionL} value={t.factTuitionV} />
            <Fact label={t.factLocationL} value={t.factLocationV} />
            <Fact label={t.factModeL} value={t.factModeV} />
          </div>
          <a href={APPLY_URL} className="ksa-btn ksa-btn-gold ksa-hero-cta">{t.applyNow}</a>
        </div>
      </section>

      {/* About */}
      <section className="ksa-section">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">{t.aboutEyebrow}</span>
          <h2 className="ksa-h2">{t.aboutH2}</h2>
          <p className="ksa-lead">{t.aboutLead}</p>
          <div className="ksa-forwho">
            <h3 className="ksa-h3">{t.forWhoH3}</h3>
            <ul className="ksa-check">
              {t.forWho.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* What you will study */}
      <section className="ksa-section ksa-section-alt">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">{t.curriculumEyebrow}</span>
          <h2 className="ksa-h2">{t.curriculumH2}</h2>
          <p className="ksa-lead">{t.curriculumLead}</p>
          <div className="ksa-grid ksa-grid-3">
            {t.skills.map((s) => (
              <div className="ksa-card" key={s.t}>
                <h4 className="ksa-card-title">{s.t}</h4>
                <p className="ksa-card-text">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="ksa-section">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">{t.outcomesEyebrow}</span>
          <h2 className="ksa-h2">{t.outcomesH2}</h2>
          <div className="ksa-grid ksa-grid-2">
            {t.outcomes.map((o) => (
              <div className="ksa-outcome" key={o}>
                <span className="ksa-tick">✓</span>
                <span>{o}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why TEC */}
      <section className="ksa-section ksa-section-alt">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">{t.whyEyebrow}</span>
          <h2 className="ksa-h2">{t.whyH2}</h2>
          <div className="ksa-grid ksa-grid-3">
            {t.why.map((w) => (
              <div className="ksa-why" key={w.t}>
                <div className="ksa-why-img" style={{ backgroundImage: `url('${w.img}')` }} />
                <div className="ksa-why-body">
                  <h4 className="ksa-card-title">{w.t}</h4>
                  <p className="ksa-card-text">{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="ksa-section">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">{t.feesEyebrow}</span>
          <h2 className="ksa-h2">{t.feesH2}</h2>
          <div className="ksa-feebox">
            <div className="ksa-fee-main">
              <span className="ksa-fee-amount">£10,800</span>
              <span className="ksa-fee-note">{t.feeNote}</span>
            </div>
            <ul className="ksa-check ksa-fee-list">
              {t.feeList.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <p className="ksa-smallnote">{t.feeSmall}</p>
        </div>
      </section>

      {/* Life & support */}
      <section className="ksa-section ksa-section-alt">
        <div className="ksa-wrap">
          <span className="ksa-eyebrow">{t.livingEyebrow}</span>
          <h2 className="ksa-h2">{t.livingH2}</h2>
          <div className="ksa-grid ksa-grid-2">
            {t.living.map((c) => (
              <div className="ksa-card" key={c.t}>
                <h4 className="ksa-card-title">{c.t}</h4>
                <p className="ksa-card-text">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="ksa-visa-note"><strong>{t.visaLabel}</strong>{t.visaText}</div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="ksa-section ksa-accred">
        <div className="ksa-wrap">
          <p className="ksa-accred-title">{t.accredTitle}</p>
          <div className="ksa-accred-row">
            {ACCREDITATIONS.map((a) => (
              a.word ? (
                <div className="ksa-accred-lockup" key={a.alt}>
                  <img src={a.img} alt={a.alt} className="ksa-accred-logo ksa-accred-mark" />
                  <span className="ksa-accred-word">
                    {a.word}
                    {a.sub && <span className="ksa-accred-sub">{a.sub}</span>}
                  </span>
                </div>
              ) : (
                <img key={a.alt} src={a.img} alt={a.alt} className="ksa-accred-logo" />
              )
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section className="ksa-cta">
        <div className="ksa-wrap ksa-cta-inner">
          <h2 className="ksa-cta-title">{t.ctaTitle}</h2>
          <p className="ksa-cta-sub">{t.ctaSub}</p>
          <a href={APPLY_URL} className="ksa-btn ksa-btn-gold ksa-cta-btn">{t.ctaBtn}</a>
          <div className="ksa-contact">
            <div><span>{t.cEmail}</span><a href={`mailto:${ADMISSIONS_EMAIL}`} dir="ltr">{ADMISSIONS_EMAIL}</a></div>
            <div><span>{t.cCall}</span><a href={`tel:${WHATSAPP.replace(/\s/g, '')}`} dir="ltr">{WHATSAPP}</a></div>
            <div><span>{t.cCampus}</span><span dir="ltr">{CAMPUS}</span></div>
          </div>
        </div>
        <p className="ksa-colophon">{t.colophon}</p>
      </section>
    </div>
  );
}

const ksaStyles = `
.ksa-root { --g:${BRAND.green}; --gm:${BRAND.greenMid}; --gold:${BRAND.gold};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color:#1f2937; background:#fff; line-height:1.6; }
.ksa-root *, .ksa-root *::before, .ksa-root *::after { box-sizing:border-box; }

.ksa-topbar { display:flex; align-items:center; justify-content:space-between;
  padding:14px 24px; border-bottom:1px solid #eef0ec; position:sticky; top:0; background:#fff; z-index:20; }
.ksa-logo { height:46px; width:auto; }
.ksa-topbar-right { display:flex; align-items:center; gap:14px; }
.ksa-topbar-cta { font-size:14px; padding:9px 18px; }

.ksa-lang { display:flex; border:1px solid #d9ded8; border-radius:9px; overflow:hidden; }
.ksa-lang-btn { background:#fff; border:0; padding:7px 14px; font-size:13px; font-weight:600;
  color:#4b5563; cursor:pointer; transition:background .12s, color .12s; }
.ksa-lang-btn.is-active { background:var(--g); color:#fff; }

.ksa-btn { display:inline-block; border-radius:10px; font-weight:700; text-decoration:none;
  cursor:pointer; transition:transform .12s ease, opacity .12s ease; border:0; }
.ksa-btn-gold { background:var(--gold); color:#1a1a1a; box-shadow:0 4px 14px rgba(201,162,39,.35); }
.ksa-btn-gold:hover { transform:translateY(-1px); opacity:.95; }

.ksa-hero { position:relative; color:#fff;
  background:linear-gradient(135deg,#0c3420,#17492e 60%,#0c3420); overflow:hidden; }
.ksa-hero-overlay { position:absolute; inset:0;
  background:url('/assets/images/events/students-studying.jpg') center/cover no-repeat; opacity:.18; }
.ksa-hero-inner { position:relative; max-width:960px; margin:0 auto; padding:64px 24px 72px; text-align:center; }
.ksa-welcome { color:var(--gold); font-weight:600; letter-spacing:.5px; margin:0 0 10px; font-size:17px; }
.ksa-hero-title { font-size:clamp(32px,6vw,56px); line-height:1.12; margin:0 0 16px; font-weight:800; }
.ksa-hero-sub { font-size:clamp(16px,2.4vw,19px); max-width:700px; margin:0 auto 22px; color:#e8f0ea; }
.ksa-badge-line { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:26px; }
.ksa-pill { background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.25);
  padding:6px 14px; border-radius:999px; font-size:13px; font-weight:600; }
.ksa-facts { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; max-width:720px; margin:0 auto 30px; }
.ksa-fact { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.14);
  border-radius:12px; padding:14px 10px; display:flex; flex-direction:column; gap:4px; }
.ksa-fact-label { font-size:11px; text-transform:uppercase; letter-spacing:.6px; color:var(--gold); font-weight:700; }
.ksa-fact-value { font-size:15px; font-weight:600; }
.ksa-hero-cta { font-size:17px; padding:14px 38px; }

.ksa-section { padding:62px 24px; }
.ksa-section-alt { background:#f6f8f6; }
.ksa-wrap { max-width:1080px; margin:0 auto; }
.ksa-eyebrow { display:inline-block; color:var(--gold); font-weight:700; font-size:13px;
  letter-spacing:1px; text-transform:uppercase; margin-bottom:10px; }
.ksa-h2 { font-size:clamp(24px,3.6vw,34px); color:var(--g); margin:0 0 18px; font-weight:800; line-height:1.2; }
.ksa-h3 { font-size:20px; color:var(--g); margin:0 0 12px; font-weight:700; }
.ksa-lead { font-size:17px; color:#374151; max-width:820px; margin:0 0 24px; }

.ksa-check { list-style:none; padding:0; margin:0; display:grid; gap:10px; }
.ksa-check li { position:relative; padding-left:30px; color:#374151; }
.ksa-check li::before { content:'✓'; position:absolute; left:0; top:1px; color:#fff;
  background:var(--gm); width:20px; height:20px; border-radius:50%; font-size:12px;
  display:flex; align-items:center; justify-content:center; font-weight:700; }
.ksa-forwho { margin-top:18px; background:#f6f8f6; border:1px solid #e6ece7; border-radius:16px; padding:26px; }

.ksa-grid { display:grid; gap:18px; }
.ksa-grid-2 { grid-template-columns:repeat(2,1fr); }
.ksa-grid-3 { grid-template-columns:repeat(3,1fr); }
.ksa-card { background:#fff; border:1px solid #e9ece9; border-radius:14px; padding:22px; box-shadow:0 1px 3px rgba(0,0,0,.03); }
.ksa-card-title { font-size:17px; color:var(--g); margin:0 0 8px; font-weight:700; }
.ksa-card-text { font-size:15px; color:#4b5563; margin:0; }

.ksa-outcome { display:flex; gap:12px; align-items:flex-start; background:#f6f8f6; border-radius:12px; padding:16px 18px; font-size:16px; color:#374151; }
.ksa-tick { flex-shrink:0; width:24px; height:24px; border-radius:50%; background:var(--gold); color:#1a1a1a; font-weight:800; display:flex; align-items:center; justify-content:center; font-size:14px; }

.ksa-why { background:#fff; border:1px solid #e9ece9; border-radius:16px; overflow:hidden; display:flex; flex-direction:column; }
.ksa-why-img { height:150px; background-size:cover; background-position:center; background-color:#dfe7e1; }
.ksa-why-body { padding:18px 20px; }

.ksa-feebox { display:flex; gap:28px; align-items:center; background:var(--g); color:#fff; border-radius:20px; padding:30px 34px; flex-wrap:wrap; }
.ksa-fee-main { display:flex; flex-direction:column; min-width:200px; }
.ksa-fee-amount { font-size:46px; font-weight:800; color:var(--gold); line-height:1; direction:ltr; }
.ksa-fee-note { font-size:14px; color:#dbe7df; margin-top:6px; }
.ksa-fee-list { flex:1; min-width:260px; }
.ksa-feebox .ksa-check li { color:#eaf1ec; }
.ksa-feebox .ksa-check li::before { background:var(--gold); color:#1a1a1a; }
.ksa-smallnote { font-size:13px; color:#6b7280; margin-top:16px; font-style:italic; }

.ksa-visa-note { margin-top:22px; background:#fff; border-left:4px solid var(--gold); border-radius:8px; padding:16px 20px; font-size:15px; color:#374151; box-shadow:0 1px 3px rgba(0,0,0,.04); }

.ksa-accred { text-align:center; padding:48px 24px; }
.ksa-accred-title { color:#6b7280; font-size:13px; text-transform:uppercase; letter-spacing:1px; font-weight:700; margin:0 0 22px; }
.ksa-accred-row { display:flex; gap:38px; align-items:center; justify-content:center; flex-wrap:wrap; }
.ksa-accred-logo { height:58px; width:auto; object-fit:contain; }
.ksa-accred-lockup { display:flex; align-items:center; gap:8px; }
.ksa-accred-mark { height:50px; }
.ksa-accred-word { display:flex; flex-direction:column; line-height:1; text-align:left;
  font-weight:800; font-size:26px; color:#2b2b2b; letter-spacing:.2px; }
.ksa-accred-sub { font-size:9px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase;
  color:#6b7280; margin-top:4px; }
.ksa-root[dir="rtl"] .ksa-accred-word { text-align:right; }

.ksa-cta { background:linear-gradient(135deg,#0c3420,#17492e); color:#fff; padding:60px 24px 34px; text-align:center; }
.ksa-cta-title { font-size:clamp(24px,3.4vw,32px); font-weight:800; margin:0 0 10px; }
.ksa-cta-sub { color:#d8e4db; margin:0 0 26px; font-size:17px; }
.ksa-cta-btn { font-size:17px; padding:15px 42px; }
.ksa-contact { display:flex; gap:40px; justify-content:center; flex-wrap:wrap; margin:34px 0 0; }
.ksa-contact > div { display:flex; flex-direction:column; gap:4px; font-size:15px; }
.ksa-contact span:first-child { color:var(--gold); font-size:12px; text-transform:uppercase; letter-spacing:.6px; font-weight:700; }
.ksa-contact a { color:#fff; text-decoration:none; }
.ksa-contact a:hover { text-decoration:underline; }
.ksa-colophon { margin:36px 0 0; font-size:12px; color:#9db3a5; }

/* RTL adjustments for Arabic */
.ksa-root[dir="rtl"] .ksa-check li { padding-left:0; padding-right:30px; }
.ksa-root[dir="rtl"] .ksa-check li::before { left:auto; right:0; }
.ksa-root[dir="rtl"] .ksa-visa-note { border-left:0; border-right:4px solid var(--gold); }
.ksa-root[dir="rtl"] .ksa-hero-title { line-height:1.3; }

@media (max-width:860px) {
  .ksa-grid-3 { grid-template-columns:repeat(2,1fr); }
  .ksa-facts { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:560px) {
  .ksa-grid-2, .ksa-grid-3 { grid-template-columns:1fr; }
  .ksa-section { padding:46px 20px; }
  .ksa-topbar { flex-wrap:wrap; gap:10px; }
  .ksa-topbar-cta { padding:8px 14px; }
  .ksa-feebox { flex-direction:column; align-items:flex-start; gap:18px; }
}
`;
