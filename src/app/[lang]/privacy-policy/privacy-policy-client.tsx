'use client';

import { useLanguage } from '@/contexts/language-context';

const content = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: July 1, 2026',
    intro: 'NestLine Automation ("NestLine", "we", "us") is committed to protecting the personal information of the individuals we interact with. This policy explains what we collect, why we collect it, and how you can exercise your rights under Quebec\'s Law 25 (Act Respecting the Protection of Personal Information in the Private Sector) and Canada\'s PIPEDA.',
    sections: [
      {
        title: '1. Who We Are',
        body: 'NestLine Automation is an AI consulting company based in Quebec, Canada.\n\nContact: Liem Blouin\nEmail: liem@nestlineautomation.ca\nPhone: +1 (514) 386-6281\nWebsite: nestlineautomation.ca',
      },
      {
        title: '2. What Personal Information We Collect',
        body: 'We may collect the following information when you interact with us:\n\n• Name and first name\n• Email address\n• Phone number\n• Company name and industry\n• Information you share during discovery calls or consultations\n• Technical data (IP address, browser type) collected automatically when you visit our site',
      },
      {
        title: '3. Why We Collect It',
        body: 'We collect personal information for the following purposes:\n\n• To respond to your inquiry or booking request\n• To provide our AI consulting and automation services\n• To send you information about our services (if you have consented)\n• To improve our website and services\n• To comply with our legal obligations',
      },
      {
        title: '4. How We Use It',
        body: 'Your information is used only for the purposes stated above. We do not sell your personal information to third parties. We may use automated systems to reach out to potential clients, if you have received a message from us and wish to be removed from our contact list, simply reply with "STOP" and we will remove you immediately.',
      },
      {
        title: '5. Who We Share It With',
        body: 'We use the following third-party service providers who may process your information on our behalf:\n\n• Cal.com, appointment booking\n• Resend, transactional and outreach emails\n• Railway, infrastructure hosting\n• Apify, lead research (business contact information from public sources)\n\nAll providers are bound by their own privacy policies and data protection agreements.',
      },
      {
        title: '6. How Long We Keep It',
        body: 'We retain personal information only as long as necessary for the purposes for which it was collected, or as required by law. Client information is kept for a minimum of 5 years following the end of our business relationship for accounting and legal purposes. Outreach contact data is removed upon request or after 12 months of inactivity.',
      },
      {
        title: '7. Your Rights',
        body: 'Under Quebec Law 25 and PIPEDA, you have the right to:\n\n• Access the personal information we hold about you\n• Request correction of inaccurate information\n• Request deletion of your information (subject to legal retention requirements)\n• Withdraw your consent to receive communications\n• File a complaint with the Commission d\'accès à l\'information du Québec (CAI)\n\nTo exercise any of these rights, contact us at liem@nestlineautomation.ca.',
      },
      {
        title: '8. Cookies',
        body: 'Our website may use cookies to improve your browsing experience. You can control cookie preferences through the banner that appears on your first visit, or through your browser settings. We use cookies for analytics and to remember your language preference. We do not use cookies for advertising tracking.',
      },
      {
        title: '9. Security',
        body: 'We take reasonable measures to protect your personal information against loss, theft, unauthorized access, disclosure, or modification. Our infrastructure is hosted on Railway, a SOC 2-compliant cloud platform.',
      },
      {
        title: '10. Changes to This Policy',
        body: 'We may update this policy from time to time. The date at the top of this page reflects the most recent update. We encourage you to review this policy periodically.',
      },
      {
        title: '11. Contact Us',
        body: 'For any privacy-related questions or requests:\n\nLiem Blouin, Privacy Officer\nNestLine Automation\nliem@nestlineautomation.ca\n+1 (514) 386-6281',
      },
    ],
  },
  fr: {
    title: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : 1er juillet 2026',
    intro: 'NestLine Automation (« NestLine », « nous ») s\'engage à protéger les renseignements personnels des personnes avec qui nous interagissons. Cette politique explique ce que nous collectons, pourquoi nous le collectons et comment vous pouvez exercer vos droits en vertu de la Loi 25 du Québec (Loi sur la protection des renseignements personnels dans le secteur privé) et de la LPRPDE du Canada.',
    sections: [
      {
        title: '1. Qui nous sommes',
        body: 'NestLine Automation est une entreprise de consultation en IA basée au Québec, Canada.\n\nContact : Liem Blouin\nCourriel : liem@nestlineautomation.ca\nTéléphone : +1 (514) 386-6281\nSite Web : nestlineautomation.ca',
      },
      {
        title: '2. Renseignements personnels collectés',
        body: 'Nous pouvons collecter les renseignements suivants lors de vos interactions avec nous :\n\n• Nom et prénom\n• Adresse courriel\n• Numéro de téléphone\n• Nom de l\'entreprise et secteur d\'activité\n• Informations partagées lors d\'appels de découverte ou de consultations\n• Données techniques (adresse IP, type de navigateur) collectées automatiquement lors de votre visite',
      },
      {
        title: '3. Pourquoi nous les collectons',
        body: 'Nous collectons des renseignements personnels aux fins suivantes :\n\n• Répondre à votre demande ou à votre réservation\n• Fournir nos services de consultation en IA et d\'automatisation\n• Vous envoyer des informations sur nos services (avec votre consentement)\n• Améliorer notre site Web et nos services\n• Respecter nos obligations légales',
      },
      {
        title: '4. Comment nous les utilisons',
        body: 'Vos renseignements sont utilisés uniquement aux fins mentionnées ci-dessus. Nous ne vendons pas vos renseignements personnels à des tiers. Nous pouvons utiliser des systèmes automatisés pour contacter des clients potentiels, si vous avez reçu un message de notre part et souhaitez être retiré de notre liste, répondez simplement « STOP » et nous vous retirerons immédiatement.',
      },
      {
        title: '5. Avec qui nous les partageons',
        body: 'Nous faisons appel aux fournisseurs de services tiers suivants qui peuvent traiter vos renseignements en notre nom :\n\n• Cal.com, prise de rendez-vous\n• Resend, courriels transactionnels et de prospection\n• Railway, hébergement d\'infrastructure\n• Apify, recherche de prospects (coordonnées d\'entreprises provenant de sources publiques)\n\nTous les fournisseurs sont soumis à leurs propres politiques de confidentialité.',
      },
      {
        title: '6. Durée de conservation',
        body: 'Nous conservons les renseignements personnels uniquement aussi longtemps que nécessaire aux fins pour lesquelles ils ont été collectés, ou tel qu\'exigé par la loi. Les renseignements sur les clients sont conservés pendant un minimum de 5 ans suivant la fin de notre relation d\'affaires. Les données de prospection sont supprimées sur demande ou après 12 mois d\'inactivité.',
      },
      {
        title: '7. Vos droits',
        body: 'En vertu de la Loi 25 du Québec et de la LPRPDE, vous avez le droit de :\n\n• Accéder aux renseignements personnels que nous détenons à votre sujet\n• Demander la correction de renseignements inexacts\n• Demander la suppression de vos renseignements (sous réserve des obligations légales de conservation)\n• Retirer votre consentement à recevoir des communications\n• Déposer une plainte auprès de la Commission d\'accès à l\'information du Québec (CAI)\n\nPour exercer l\'un de ces droits, contactez-nous à liem@nestlineautomation.ca.',
      },
      {
        title: '8. Témoins (cookies)',
        body: 'Notre site Web peut utiliser des témoins pour améliorer votre expérience de navigation. Vous pouvez contrôler vos préférences via la bannière affichée lors de votre première visite ou via les paramètres de votre navigateur. Nous utilisons des témoins pour l\'analyse et pour mémoriser votre préférence de langue. Nous n\'utilisons pas de témoins à des fins de suivi publicitaire.',
      },
      {
        title: '9. Sécurité',
        body: 'Nous prenons des mesures raisonnables pour protéger vos renseignements personnels contre la perte, le vol, l\'accès non autorisé, la divulgation ou la modification. Notre infrastructure est hébergée sur Railway, une plateforme infonuagique conforme à la norme SOC 2.',
      },
      {
        title: '10. Modifications de cette politique',
        body: 'Nous pouvons mettre à jour cette politique de temps à autre. La date en haut de cette page reflète la mise à jour la plus récente. Nous vous encourageons à consulter cette politique périodiquement.',
      },
      {
        title: '11. Nous joindre',
        body: 'Pour toute question ou demande relative à la confidentialité :\n\nLiem Blouin, Responsable de la protection des renseignements personnels\nNestLine Automation\nliem@nestlineautomation.ca\n+1 (514) 386-6281',
      },
    ],
  },
};

export default function PrivacyPolicyClient() {
  const { lang, href } = useLanguage();
  const tx = content[lang];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#00e887]/70 mb-4">
          {lang === 'en' ? 'Legal' : 'Légal'}
        </p>
        <h1 className="text-4xl font-bold text-white mb-3">{tx.title}</h1>
        <p className="text-sm text-white/30 mb-12">{tx.updated}</p>

        <p className="text-white/60 leading-relaxed mb-12 text-sm">{tx.intro}</p>

        <div className="flex flex-col gap-10">
          {tx.sections.map((section) => (
            <div key={section.title} className="border-t border-white/[0.06] pt-8">
              <h2 className="text-base font-semibold text-white mb-4">{section.title}</h2>
              <div className="text-sm text-white/50 leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-8">
          <a href={href("/")} className="text-sm text-[#00e887]/70 hover:text-[#00e887] transition-colors">
            {lang === 'en' ? '← Back to home' : '← Retour à l\'accueil'}
          </a>
        </div>
      </div>
    </div>
  );
}
