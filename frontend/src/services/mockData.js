// Mock Data for House of Dessert E-Commerce

export const categories = [
  { id: 'cakes', name: 'كيك', count: 12, path: '/category/cakes' },
  { id: 'eastern', name: 'حلويات شرقية', count: 23, path: '/category/eastern' },
  { id: 'chocolate', name: 'شوكولاتة', count: 8, path: '/category/chocolate' },
];

export const products = [
  // Cakes
  {
    id: 'cake-1',
    name: 'كيكة الشوكولاتة الفاخرة',
    price: 85,
    category: 'cakes',
    description: 'كيكة شوكولاتة غنية بالغاناش الداكن مزينة برقائق الشوكولاتة والـتوت الطازج. مصنوعة من أجود أنواع الكاكاو البلجيكي.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    rating: 5,
  },
  {
    id: 'cake-2',
    name: 'ريد فيلفت',
    price: 75,
    category: 'cakes',
    description: 'كيكة ريد فيلفت الكلاسيكية بكريمة الجبن الحريرية. طبقات ناعمة بلون أحمر مخملي مميز.',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
  },
  {
    id: 'cake-3',
    name: 'تيراميسو',
    price: 90,
    category: 'cakes',
    description: 'كيكة تيراميسو إيطالية أصلية بطبقات البسكويت المنقوع بالقهوة وكريمة الماسكاربوني الفاخرة.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
  },
  {
    id: 'cake-4',
    name: 'تشيز كيك فراولة',
    price: 80,
    category: 'cakes',
    description: 'تشيز كيك كريمية بصوص الفراولة الطازجة وقاعدة البسكويت المقرمشة.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
  },

  // Eastern Sweets
  {
    id: 'eastern-1',
    name: 'كنافة نابلسية',
    price: 60,
    category: 'eastern',
    description: 'كنافة نابلسية أصلية بالجبنة المطاطية والقطر، مزينة بالفستق الحلبي، محضرة على الطريقة التقليدية.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80', // replacement illustration
    rating: 5,
  },
  {
    id: 'eastern-2',
    name: 'بقلاوة بالفستق',
    price: 55,
    category: 'eastern',
    description: 'بقلاوة مقرمشة بطبقات العجين الرقيق المحشوة بالفستق الحلبي ومغمورة بالقطر العربي.',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
  },
  {
    id: 'eastern-3',
    name: 'بسبوسة بالقشطة',
    price: 45,
    category: 'eastern',
    description: 'بسبوسة ذهبية بالسميد والقشطة الطازجة مزينة باللوز المحمص ومنقوعة بالقطر.',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
  },
  {
    id: 'eastern-4',
    name: 'معمول بالتمر',
    price: 40,
    category: 'eastern',
    description: 'معمول تقليدي محشو بعجينة التمر الفاخرة، مرشوش بالسكر البودرة، طعم الأصالة.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    rating: 4.5,
  },

  // Chocolate
  {
    id: 'choco-1',
    name: 'ترافل شوكولاتة داكنة',
    price: 50,
    category: 'chocolate',
    description: 'ترافل شوكولاتة داكنة فاخرة بحشوة الغاناش الكريمية، مغطاة بودرة الكاكاو الهولندي.',
    image: 'https://images.unsplash.com/photo-1548907040-4d42b52125e0?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
  },
  {
    id: 'choco-2',
    name: 'تشكيلة شوكولاتة فاخرة',
    price: 120,
    category: 'chocolate',
    description: 'علبة تشكيلة فاخرة من الشوكولاتة البلجيكية المصنوعة يدوياً بنكهات متنوعة هدية مثالية.',
    image: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80',
    rating: 5,
  },
  {
    id: 'choco-3',
    name: 'ألواح شوكولاتة يدوية',
    price: 35,
    category: 'chocolate',
    description: 'ألواح شوكولاتة مصنوعة يدوياً من أجود أنواع الكاكاو، متوفرة بنكهات الحليب والداكنة والبيضاء.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    rating: 4.4,
  },
];

export const reviews = [
  { id: '1', name: 'سارة', rating: 5, comment: 'حلويات رائعة! الكيك كان طازج وطعمه خيالي. بالتأكيد سأطلب مرة ثانية.' },
  { id: '2', name: 'أحمد', rating: 5, comment: 'أفضل بقلاوة تذوقتها. المكونات طبيعية والطعم أصلي جداً.' },
  { id: '3', name: 'نورة', rating: 5, comment: 'الكنافة النابلسية لا تقاوم! توصيل سريع وتغليف أنيق.' },
  { id: '4', name: 'خالد', rating: 5, comment: 'شوكولاتة فاخرة بمعنى الكلمة. هدية مثالية لأي مناسبة.' },
];
