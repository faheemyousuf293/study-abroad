/** Study destination cards for the homepage. Images live in seed-assets/destinations (placeholders). */
export const destinationsData = {
  title: 'Choose Your Ideal Study Destination',
  subtitle:
    'Every student’s academic background, budget, and career goals are different. We help you choose the best study destination based on your profile.',
  items: [
    { flag: 'it' as const, title: 'Study in Italy', file: 'study-italy.jpg', alt: 'The Colosseum in Rome at sunset' },
    { flag: 'gb' as const, title: 'Study in the UK', file: 'study-uk.jpg', alt: 'Big Ben and Westminster in London' },
    { flag: 'fr' as const, title: 'Study in France', file: 'study-france.jpg', alt: 'The Eiffel Tower in Paris at sunset' },
    { flag: 'de' as const, title: 'Study in Germany', file: 'study-germany.jpg', alt: 'The Brandenburg Gate in Berlin' },
  ],
}
