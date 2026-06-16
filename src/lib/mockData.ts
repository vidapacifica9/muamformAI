import { DesignerProfile, Transformation, Room, Profile } from '@/types';

export interface LearningContent {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  duration: string;
  author: string;
  imageUrl: string;
}

export const MOCK_USER: Profile = {
  id: 'user-123',
  email: 'client@muamform.ai',
  full_name: 'Alexander Sterling',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  role: 'user',
  created_at: new Date().toISOString()
};

export const MOCK_DESIGNER_USER: Profile = {
  id: 'designer-456',
  email: 'saskia.vance@muamform.ai',
  full_name: 'Saskia Vance',
  avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  role: 'designer',
  created_at: new Date().toISOString()
};

export const MOCK_DESIGNERS: DesignerProfile[] = [
  {
    id: 'designer-profile-1',
    user_id: 'designer-456',
    full_name: 'Saskia Vance',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    bio: 'Saskia is an award-winning Copenhagen-based designer specializing in Scandinavian functionalism, light optimization, and clean geometric spaces. She blends warmth with organic textures.',
    portfolio: [
      {
        title: 'Nordic Light Loft',
        image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=500',
        description: 'An open-plan loft focusing on natural light, light wood textures, and minimalist seating.'
      },
      {
        title: 'Østerbro Oasis',
        image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=500',
        description: 'A cozy apartment transformation blending historical moldings with contemporary Danish furniture.'
      }
    ],
    hourly_rate: 110,
    rating: 4.95,
    is_verified: true
  },
  {
    id: 'designer-profile-2',
    user_id: 'designer-789',
    full_name: 'Elena Rostova',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    bio: 'Elena focuses on ultra-luxury minimalism and custom marble craftsmanship. With 12 years of experience in Milan and Paris, she designs bespoke environments for high-profile clients.',
    portfolio: [
      {
        title: 'Milanese Monolith Penthouse',
        image_url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=500',
        description: 'Bespoke marble details, integrated smart lighting, and imported velvet furniture items.'
      }
    ],
    hourly_rate: 160,
    rating: 4.98,
    is_verified: true
  },
  {
    id: 'designer-profile-3',
    user_id: 'designer-101',
    full_name: 'Marcus Thorne',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Marcus specializes in industrial transformations, blending raw concrete, exposed ironwork, and rich leather finishes. He converts old warehouses into sleek, functional homes.',
    portfolio: [
      {
        title: 'Brooklyn Foundry Conversion',
        image_url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=500',
        description: 'Exposed brickwork, raw iron girders, and customized low-hanging copper lighting arrays.'
      }
    ],
    hourly_rate: 95,
    rating: 4.87,
    is_verified: true
  }
];

export const MOCK_TRANSFORMATIONS: Transformation[] = [
  {
    id: 'transform-1',
    room_id: 'room-1',
    style: 'Scandinavian',
    generated_image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200',
    budget_level: 'medium',
    budget_breakdown: {
      low: [
        { category: 'Furniture (Flatpack/Modular)', amount: 1800, notes: 'Modular fabric sofa, light oak coffee table' },
        { category: 'Lighting (Warm LED)', amount: 350, notes: 'Minimalist paper floor lamp, ceiling pendant' },
        { category: 'Decor & Rugs', amount: 450, notes: 'Wool-blend rug, neutral wall frames, cushions' },
        { category: 'Paint & Materials', amount: 200, notes: 'Eggshell white wall paint' }
      ],
      medium: [
        { category: 'Premium Furniture', amount: 3500, notes: 'Nordic design wool sofa, oak sideboard, lounge chair' },
        { category: 'Curated Designer Lighting', amount: 800, notes: 'Louise Poulsen style pendant light, brass accents' },
        { category: 'Acoustic Panels & Rug', amount: 900, notes: 'Oak slat panels, custom weave rug, ceramic styling pieces' },
        { category: 'Labor & Wall Finishes', amount: 800, notes: 'Professional painting, slat panel installation' }
      ],
      premium: [
        { category: 'Bespoke Oak Cabinetry', amount: 8200, notes: 'Custom floating wall sideboard, designer mohair sofa' },
        { category: 'Designer Lighting Plan', amount: 2400, notes: 'High-end architectural fixtures & smart-dimming setup' },
        { category: 'Fine Textiles & Accessories', amount: 2900, notes: 'Hand-knotted linen rug, original local artist canvases' },
        { category: 'Contractor Trades & Finishings', amount: 2500, notes: 'Full plastering, architectural woodwork finishes' }
      ]
    },
    shopping_list: [
      {
        id: 'shop-1',
        name: 'Svalbard Bouclé Sofa',
        category: 'Furniture',
        price: 1850,
        product_url: 'https://www.westelm.com',
        image_url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=300',
        brand: 'NordicForm'
      },
      {
        id: 'shop-2',
        name: 'Fjord Solid Oak Coffee Table',
        category: 'Furniture',
        price: 450,
        product_url: 'https://www.crateandbarrel.com',
        image_url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=300',
        brand: 'Aethel'
      },
      {
        id: 'shop-3',
        name: 'Paper Halo Floor Lamp',
        category: 'Lighting',
        price: 220,
        product_url: 'https://www.hay.dk',
        brand: 'HAY Design'
      },
      {
        id: 'shop-4',
        name: 'Danish Woven Area Rug (8x10)',
        category: 'Decor',
        price: 680,
        product_url: 'https://www.lumens.com',
        brand: 'Copenhagen Weavers'
      },
      {
        id: 'shop-5',
        name: 'Textured Oak Wall Slat Set (x4)',
        category: 'Decor',
        price: 320,
        product_url: 'https://www.rejuvenation.com',
        brand: 'AcousticSlat'
      }
    ],
    is_selected: true,
    status: 'completed',
    created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  }
];

export const MOCK_ROOMS: Room[] = [
  {
    id: 'room-1',
    user_id: 'user-123',
    original_image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    room_analysis: {
      roomType: 'Living Room',
      detectedFeatures: ['High ceilings', 'Large south-facing window', 'Hardwood floor (worn)', 'Recessed lighting'],
      lighting: 'Abundant natural light, needs ambient fixtures for evenings',
      suggestedColors: ['Creamy Off-White', 'Warm Sand', 'Soft Charcoal (Accents)'],
      dimensions: 'Approx. 16ft x 14ft',
      clutterLevel: 'Moderate clutter near corners'
    },
    created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  }
];

export const MOCK_TUTORIALS: LearningContent[] = [
  {
    id: 'course-1',
    slug: 'minimalist-furniture-placement',
    title: 'Mastering Minimalist Furniture Placement',
    category: 'Furniture Placement',
    summary: 'Learn how to create a high-end feel in your living spaces by organizing layouts around natural sightlines and traffic paths.',
    duration: '12 min read',
    author: 'Elena Rostova',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=300',
    content: `### The Core Philosophy of Minimalist Layouts
In modern luxury design, what you leave out of a room is just as important as what you put in. Many homeowners overcrowd their floor plans, forcing paths to weave awkwardly. Here is the step-by-step guideline to arranging your space:

#### 1. Define the Primary Focal Point
Every premium room revolves around one core anchor. In a bedroom, it is the headboard wall. In a living room, it should be the fireplace, a view window, or a beautifully framed gallery wall, *not* the television. Align your major seating directly perpendicular or opposite to this focal point.

#### 2. The 30-Inch Clearance Rule
For a space to feel luxury and breathable, maintain at least 30 inches (76 cm) of open walking space between furniture items. Tight squeeze corridors immediately cheapen the feel of a layout.

#### 3. Floating vs. Anchoring
Instead of pushing all your sofas and chairs flush against the walls, "float" them in the center of the room. This creates cozy conversation groupings and gives the illusion of larger square footage.`
  },
  {
    id: 'course-2',
    slug: 'color-matching-rules',
    title: 'The 60-30-10 Color Harmonization Guide',
    category: 'Color Matching',
    summary: 'A mathematical formula to balance colors in any interior setup like a professional architectural designer.',
    duration: '8 min read',
    author: 'Saskia Vance',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=300',
    content: `### The Golden Formula of Interior Coloring
Understanding how to distribute colors can be intimidating. The **60-30-10 rule** is a classic designer guideline that guarantees a visual balance.

#### 60% - The Dominant Theme (Walls, Large Rugs)
This color anchors the entire room. In luxury design, this is typically a neutral or muted pastel (e.g. warm sand, matte grey, soft linen white). It provides the canvas.

#### 30% - The Secondary Tone (Upholstery, Curtains, Wood Finishes)
This adds depth. It should contrast slightly with your primary. For instance, if your walls are soft cream, your secondary might be rich oak panels or charcoal grey boucle chairs.

#### 10% - The Accent (Cushions, Lamps, Small Art pieces)
This is where the jewelry of the room shines. Use metallic golds, brushed bronzes, deep rust, or forest green. This small splash makes the room pop without overwhelming the eyes.`
  }
];
