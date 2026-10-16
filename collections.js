// ─────────────────────────────────────────────────────────────
// YOUR COLLECTIONS
// Edit titles, years, groups, descriptions, and covers here.
// Photos: drop images into photos/<slug>/ and run  python3 update_photos.py
// to fill in the "photos" lists automatically (captions you add are kept).
//
// Keep this valid JSON: double quotes, no trailing commas, no comments below.
// Collections with no photos yet show picsum.photos placeholders.
// ─────────────────────────────────────────────────────────────
const COLLECTIONS = [
  {
    "slug": "iceland-2023",
    "title": "Iceland",
    "year": "2023",
    "group": "International",
    "description": "",
    "cover": "photos/iceland-2023/kirkjufell.jpg",
    "photos": [
      {
        "src": "photos/iceland-2023/kirkjufell.jpg",
        "caption": "Kirkjufell"
      },
      {
        "src": "photos/iceland-2023/puffins.jpg",
        "caption": "Atlantic puffins"
      }
    ]
  },
  {
    "slug": "lighthouses",
    "title": "Lighthouses",
    "year": "",
    "group": "Series",
    "description": "",
    "cover": "photos/lighthouses/bodie-island-lighthouse.jpg",
    "photos": [
      {
        "src": "photos/lighthouses/bodie-island-lighthouse.jpg",
        "caption": "Bodie Island Lighthouse, North Carolina"
      },
      {
        "src": "photos/lighthouses/cabo-da-roca-lighthouse.jpg",
        "caption": "Cabo da Roca Lighthouse, Portugal"
      }
    ]
  },
  {
    "slug": "wildlife",
    "title": "Wildlife",
    "year": "",
    "group": "Series",
    "description": "",
    "cover": "photos/wildlife/peacock.jpg",
    "photos": [
      {
        "src": "photos/wildlife/peacock.jpg",
        "caption": "Peacock"
      },
      {
        "src": "photos/wildlife/puffins.jpg",
        "caption": "Atlantic puffins"
      }
    ]
  },
  {
    "slug": "arches-2024",
    "title": "Arches National Park",
    "year": "2024",
    "group": "National Parks",
    "description": "",
    "cover": "photos/arches-2024/delicate-arch.jpg",
    "photos": [
      {
        "src": "photos/arches-2024/delicate-arch.jpg",
        "caption": "Delicate Arch"
      }
    ]
  },
  {
    "slug": "canyonlands-2024",
    "title": "Canyonlands National Park",
    "year": "2024",
    "group": "National Parks",
    "description": "",
    "cover": "photos/canyonlands-2024/mesa-arch.jpg",
    "photos": [
      {
        "src": "photos/canyonlands-2024/mesa-arch.jpg",
        "caption": "Mesa Arch at sunrise"
      }
    ]
  },
  {
    "slug": "zion-2025",
    "title": "Zion National Park",
    "year": "2025",
    "group": "National Parks",
    "description": "",
    "cover": "https://picsum.photos/seed/zion-2025-1/1200/800",
    "photos": [
      {
        "src": "https://picsum.photos/seed/zion-2025-1/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/zion-2025-2/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/zion-2025-3/800/1100",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/zion-2025-4/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/zion-2025-5/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/zion-2025-6/800/1100",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/zion-2025-7/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/zion-2025-8/1200/800",
        "caption": ""
      }
    ]
  },
  {
    "slug": "bryce-canyon-2025",
    "title": "Bryce Canyon National Park",
    "year": "2025",
    "group": "National Parks",
    "description": "",
    "cover": "photos/bryce-canyon-2025/thors-hammer.jpg",
    "photos": [
      {
        "src": "photos/bryce-canyon-2025/thors-hammer.jpg",
        "caption": "Thor's Hammer"
      }
    ]
  },
  {
    "slug": "capitol-reef-2025",
    "title": "Capitol Reef National Park",
    "year": "2025",
    "group": "National Parks",
    "description": "",
    "cover": "https://picsum.photos/seed/capitol-reef-2025-1/1200/800",
    "photos": [
      {
        "src": "https://picsum.photos/seed/capitol-reef-2025-1/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/capitol-reef-2025-2/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/capitol-reef-2025-3/800/1100",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/capitol-reef-2025-4/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/capitol-reef-2025-5/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/capitol-reef-2025-6/800/1100",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/capitol-reef-2025-7/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/capitol-reef-2025-8/1200/800",
        "caption": ""
      }
    ]
  },
  {
    "slug": "spain-2026",
    "title": "Spain",
    "year": "2026",
    "group": "International",
    "description": "",
    "cover": "photos/spain-2026/san-juan-de-gaztelugatxe.jpg",
    "photos": [
      {
        "src": "photos/spain-2026/ordesa-national-park.jpg",
        "caption": "Ordesa National Park, Pyrenees"
      },
      {
        "src": "photos/spain-2026/sagrada-familia.jpg",
        "caption": "Sagrada Família, Barcelona"
      },
      {
        "src": "photos/spain-2026/san-juan-de-gaztelugatxe.jpg",
        "caption": "San Juan de Gaztelugatxe"
      }
    ]
  },
  {
    "slug": "portugal-2026",
    "title": "Portugal",
    "year": "2026",
    "group": "International",
    "description": "",
    "cover": "photos/portugal-2026/pena-palace.jpg",
    "photos": [
      {
        "src": "photos/portugal-2026/pena-palace.jpg",
        "caption": "Pena Palace, Sintra"
      }
    ]
  },
  {
    "slug": "japan-2026",
    "title": "Japan",
    "year": "2026",
    "group": "International",
    "description": "",
    "cover": "photos/japan-2026/itsukushima-torii.jpg",
    "photos": [
      {
        "src": "photos/japan-2026/himeji-castle.jpg",
        "caption": "Himeji Castle"
      },
      {
        "src": "photos/japan-2026/hiroshima-castle.jpg",
        "caption": "Hiroshima Castle"
      },
      {
        "src": "photos/japan-2026/itsukushima-torii.jpg",
        "caption": "Itsukushima Shrine, Miyajima"
      },
      {
        "src": "photos/japan-2026/kinkaku-ji.jpg",
        "caption": "Kinkaku-ji, Kyoto"
      },
      {
        "src": "photos/japan-2026/senso-ji.jpg",
        "caption": "Sensō-ji, Tokyo"
      },
      {
        "src": "photos/japan-2026/shitenno-ji.jpg",
        "caption": "Shitennō-ji, Osaka"
      }
    ]
  },
  {
    "slug": "south-dakota-2026",
    "title": "South Dakota",
    "year": "2026",
    "group": "United States",
    "description": "",
    "cover": "photos/south-dakota-2026/mount-rushmore.jpg",
    "photos": [
      {
        "src": "photos/south-dakota-2026/mount-rushmore.jpg",
        "caption": "Mount Rushmore"
      }
    ]
  },
  {
    "slug": "badlands-2026",
    "title": "Badlands National Park",
    "year": "2026",
    "group": "National Parks",
    "description": "",
    "cover": "https://picsum.photos/seed/badlands-2026-1/1200/800",
    "photos": [
      {
        "src": "https://picsum.photos/seed/badlands-2026-1/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/badlands-2026-2/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/badlands-2026-3/800/1100",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/badlands-2026-4/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/badlands-2026-5/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/badlands-2026-6/800/1100",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/badlands-2026-7/1200/800",
        "caption": ""
      },
      {
        "src": "https://picsum.photos/seed/badlands-2026-8/1200/800",
        "caption": ""
      }
    ]
  }
];
