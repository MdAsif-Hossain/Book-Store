
import { Book } from "../types";

export const books: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    price: 16.99,
    coverImage: "https://m.media-amazon.com/images/I/81tCtHFtOgL._AC_UF1000,1000_QL80_.jpg",
    categories: ["Fiction", "Fantasy", "Contemporary"],
    featured: true,
    inStock: 15,
    pages: 304,
    publishYear: 2020,
    isbn: "978-0525559474",
    language: "English"
  },
  {
    id: "2",
    title: "Educated",
    author: "Tara Westover",
    description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    price: 15.95,
    coverImage: "https://m.media-amazon.com/images/I/41GE5-l2ptL._SY445_SX342_.jpg",
    categories: ["Memoir", "Biography", "Nonfiction"],
    featured: true,
    inStock: 12,
    pages: 334,
    publishYear: 2018,
    isbn: "978-0399590504",
    language: "English"
  },
  {
    id: "3",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description: "A woman shoots her husband five times and then never speaks another word. The story follows the criminal psychotherapist who is determined to get her to talk.",
    price: 14.99,
    coverImage: "https://m.media-amazon.com/images/I/91lslnZ-btL._AC_UF1000,1000_QL80_.jpg",
    categories: ["Thriller", "Mystery", "Psychological"],
    featured: true,
    inStock: 20,
    pages: 336,
    publishYear: 2019,
    isbn: "978-1250301697",
    language: "English"
  },
  {
    id: "4",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy and proven way to build good habits and break bad ones. A practical guide to making small changes that lead to big results.",
    price: 18.99,
    coverImage: "https://m.media-amazon.com/images/I/81bGKUa1e0L._AC_UF1000,1000_QL80_.jpg",
    categories: ["Self-Help", "Psychology", "Nonfiction"],
    featured: false,
    inStock: 25,
    pages: 320,
    publishYear: 2018,
    isbn: "978-0735211292",
    language: "English"
  },
  {
    id: "5",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    description: "A novel about a young woman who grows up isolated in the marshes of North Carolina and becomes entangled in a local murder mystery.",
    price: 15.99,
    coverImage: "https://m.media-amazon.com/images/I/81O1oy0y9eL._AC_UF1000,1000_QL80_.jpg",
    categories: ["Fiction", "Mystery", "Literary"],
    featured: false,
    inStock: 18,
    pages: 384,
    publishYear: 2018,
    isbn: "978-0735219090",
    language: "English"
  },
  {
    id: "6",
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "A lone astronaut must save the earth from disaster in this gripping tale of survival and interstellar adventure.",
    price: 17.99,
    coverImage: "https://m.media-amazon.com/images/I/51-1T3EnODL._SY445_SX342_.jpg",
    categories: ["Science Fiction", "Adventure", "Space"],
    featured: true,
    inStock: 14,
    pages: 496,
    publishYear: 2021,
    isbn: "978-0593135204",
    language: "English"
  },
  {
    id: "7",
    title: "The Four Winds",
    author: "Kristin Hannah",
    description: "An epic novel of love, heroism, and hope, set against the backdrop of the Great Depression and Dust Bowl era in America.",
    price: 19.99,
    coverImage: "https://m.media-amazon.com/images/I/514hnJtIdIS._SY445_SX342_.jpg",
    categories: ["Historical Fiction", "Drama"],
    featured: false,
    inStock: 11,
    pages: 464,
    publishYear: 2021,
    isbn: "978-1250178602",
    language: "English"
  },
  {
    id: "8",
    title: "The Vanishing Half",
    author: "Brit Bennett",
    description: "A stunning novel about twin sisters who choose to live in two very different worlds, one black and one white.",
    price: 16.49,
    coverImage: "https://m.media-amazon.com/images/I/41Ijt1ORg0L._SY445_SX342_.jpg",
    categories: ["Literary Fiction", "Historical"],
    featured: true,
    inStock: 13,
    pages: 352,
    publishYear: 2020,
    isbn: "978-0525536291",
    language: "English"
  },
  // Adding new books
  {
    id: "9",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    description: "From the Nobel Prize-winning author, a story of an Artificial Friend with outstanding observational qualities.",
    price: 17.49,
    coverImage: "https://m.media-amazon.com/images/I/31uIN-rvDrL._SY445_SX342_.jpg",
    categories: ["Science Fiction", "Literary Fiction"],
    featured: true,
    inStock: 10,
    pages: 320,
    publishYear: 2021,
    isbn: "978-0571364879",
    language: "English"
  },
  {
    id: "10",
    title: "The Lincoln Highway",
    author: "Amor Towles",
    description: "A captivating novel set in 1950s America, filled with glorious mythology, the story of brotherhood, and the bittersweet joys of youth.",
    price: 18.99,
    coverImage: "https://m.media-amazon.com/images/I/415q4XvZ2OL._SY445_SX342_.jpg",
    categories: ["Historical Fiction", "Adventure"],
    featured: false,
    inStock: 8,
    pages: 592,
    publishYear: 2021,
    isbn: "978-0735222359",
    language: "English"
  },
  // Bangla Books
  {
    id: "11",
    title: "ফেলুদা সমগ্র",
    author: "সত্যজিৎ রায়",
    description: "সত্যজিৎ রায়ের অমর সৃষ্টি - ফেলুদা উপন্যাস সংকলন।",
    price: 22.99,
    coverImage: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/9d3b3bdcc_42889.jpg",
    categories: ["Bangla", "Mystery", "Adventure"],
    featured: true,
    inStock: 20,
    pages: 850,
    publishYear: 2010,
    isbn: "978-8177564587",
    language: "Bangla"
  },
  {
    id: "12",
    title: "পথের পাঁচালী",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    description: "বাংলা সাহিত্যের অমর কীর্তি - অপুর জীবনকাহিনী।",
    price: 14.99,
    coverImage: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/6886ec7d4_6486.jpg",
    categories: ["Bangla", "Classic", "Literary Fiction"],
    featured: false,
    inStock: 15,
    pages: 330,
    publishYear: 1929,
    isbn: "978-9351564355",
    language: "Bangla"
  },
  {
    id: "13",
    title: "শেষের কবিতা",
    author: "রবীন্দ্রনাথ ঠাকুর",
    description: "রবীন্দ্রনাথ ঠাকুরের এই উপন্যাসে প্রেম, স্বাধীনতা ও আধুনিকতার সংঘাত দেখা যায়।",
    price: 12.99,
    coverImage: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Sheser_kobita-Rabindranath_Tagore-8692f-2.jpg",
    categories: ["Bangla", "Classic", "Poetry", "Romance"],
    featured: true,
    inStock: 10,
    pages: 240,
    publishYear: 1929,
    isbn: "978-8171676934",
    language: "Bangla"
  },
  {
    id: "14",
    title: "চোখের বালি",
    author: "রবীন্দ্রনাথ ঠাকুর",
    description: "বাংলা সাহিত্যের এই অমর উপন্যাসে প্রেম, বিবাহ এবং সামাজিক রীতিনীতির জটিল সম্পর্ক তুলে ধরা হয়েছে।",
    price: 13.49,
    coverImage: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/039f4c8df_5.jpg",
    categories: ["Bangla", "Classic", "Romance"],
    featured: false,
    inStock: 12,
    pages: 280,
    publishYear: 1903,
    isbn: "978-8171676941",
    language: "Bangla"
  },
  {
    id: "15",
    title: "হিমু সমগ্র",
    author: "হুমায়ূন আহমেদ",
    description: "হুমায়ূন আহমেদের জনপ্রিয় চরিত্র হিমুর গল্প সংকলন।",
    price: 24.99,
    coverImage: "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/f7b4fe493_201.jpg",
    categories: ["Bangla", "Contemporary", "Fiction"],
    featured: true,
    inStock: 18,
    pages: 920,
    publishYear: 2015,
    isbn: "978-9849135791",
    language: "Bangla"
  }
];
