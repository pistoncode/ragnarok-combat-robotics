export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string[];
  category?: string;
  readTime?: number;
  imageUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-fenrir-design-journey',
    title: 'Building Fenrir: A Design Journey',
    date: '2024-11-15',
    excerpt: 'An in-depth look at the design and engineering process behind our championship-winning beetleweight horizontal spinner.',
    category: 'Build Log',
    readTime: 6,
    imageUrl: '/blog/fenrir-build.jpg',
    content: [
      "When we set out to design Fenrir, our goal was simple: create a beetleweight horizontal spinner that could deliver devastating hits while maintaining reliability through multiple fights. What followed was months of iteration, testing, and refinement that ultimately led to our most successful robot to date.",
      "The original concept for Fenrir emerged from analyzing successful horizontal spinners at the national level. We identified three key requirements: maximum weapon energy, a low-profile design to stay below opponent weapons, and robust construction to survive high-energy impacts.",
      "Our first prototype used an aluminum frame with a mild steel blade. While functional, testing revealed several issues. The blade would deform on hard impacts, the frame flexed too much under weapon torque, and weight distribution was suboptimal.",
      "Version 2 addressed these issues with a complete redesign. We switched to 7075 aluminum for the frame, added strategic gussets for rigidity, and upgraded to an S7 tool steel blade that could be hardened to HRC 55-58. The results were dramatic - weapon spin-up time decreased by 40% and the blade maintained its edge through multiple impacts.",
      "Choosing materials for a combat robot requires balancing multiple factors. We selected S7 tool steel for the blade due to its combination of hardness, toughness, and shock resistance. The 7075 aluminum frame offers an excellent strength-to-weight ratio while being machinable in our workshop. UHMW polyethylene is used for the wedgelets and bottom armor where we need durability and low friction.",
      "Fenrir's competition debut exceeded our expectations. The combination of weapon power, reliability, and drivability resulted in four consecutive knockout victories at the Bay Area Brawl. Since then, Fenrir has maintained an 80% win rate across five competitions.",
      "Building Fenrir taught us valuable lessons: test early and often, overbuilt is better than underbuilt, keep mechanisms simple to avoid failure points, and document everything for future improvements.",
      "Fenrir continues to evolve. We're currently testing a new blade geometry that should increase bite while maintaining kinetic energy. We're also experimenting with titanium frame components to save weight for additional armor."
    ],
  },
  {
    slug: 'competition-prep-checklist',
    title: 'The Ultimate Competition Prep Checklist',
    date: '2024-10-20',
    excerpt: 'Our comprehensive checklist for preparing robots and gear for competition day, refined through years of experience.',
    category: 'Competition',
    readTime: 5,
    imageUrl: '/blog/competition-prep.jpg',
    content: [
      "After countless competitions and a few hard-learned lessons, we've developed a comprehensive checklist that ensures we're fully prepared for competition day. Nothing ruins a tournament faster than forgetting a critical tool or component at home!",
      "One week before the competition, we test drive all robots at full speed, verify weapon systems at competition power levels, check all fasteners for tightness, and inspect electronics for loose connections. We also prepare all documentation including safety inspection forms and technical specs.",
      "Three days before, we assemble spare parts including extra motors, ESCs, receivers, fasteners, armor panels, and wheels. Our tool kit includes hex key sets, screwdrivers, pliers, soldering equipment, multimeter, CA glue, thread locker, and battery charging equipment.",
      "The night before competition, we fully charge all batteries, pack robots in protective cases, load all tools and spare parts, and prepare our pit table setup. We always include power strips, team banner, and plenty of snacks and water.",
      "At the venue, we claim our pit space and set up logically with tools and spare parts organized for quick access. Before each fight, we check the robot completely, verify battery voltage, test radio link, confirm weapon safety lock function, and review our opponent to develop strategy.",
      "After each fight, we immediately remove the battery, install the weapon safety lock, assess and photograph any damage, and plan repairs for the next fight. At the end of the day, we inventory all tools and parts, charge batteries, and review fight footage to take notes for improvement.",
      "Key lessons from experience: Never assume anything works - always test before each fight. Bring more spares than you think you need. Stay organized to avoid losing parts. Help other teams - the combat robotics community thrives on mutual support. Document everything with photos and notes.",
      "This checklist has served us well through dozens of competitions. Adapt it to your specific needs and never miss a critical item again!"
    ],
  },
  {
    slug: 'weapon-systems-explained',
    title: 'Combat Robot Weapon Systems Explained',
    date: '2024-09-08',
    excerpt: 'A comprehensive guide to the different weapon types in combat robotics and how to choose the right one for your bot.',
    category: 'Technical',
    readTime: 7,
    imageUrl: '/blog/weapons-guide.jpg',
    content: [
      "Combat robotics features an incredible diversity of weapon systems, each with unique advantages and challenges. Understanding these weapon types is crucial whether you're designing your first robot or looking to expand your competitive arsenal.",
      "Horizontal spinners like our Fenrir use a spinning bar or disc parallel to the ground. These weapons excel at delivering massive side impacts, creating spectacular knockouts, and controlling fight positioning. However, gyroscopic forces affect steering, and low ground clearance makes them vulnerable to wedges. They're best for aggressive drivers who can maintain weapon control while maneuvering.",
      "Vertical spinners (drums, discs, and bars) spin perpendicular to the ground. They offer the ability to hit high and low, less gyroscopic steering impact, and effectiveness against various opponents. The main challenges are precise weapon timing requirements and potential for self-damage on impacts. They're ideal for versatile competition robots facing diverse opponents.",
      "Wedge robots focus on getting under opponents, controlling positioning, and forcing opponents into hazards. While simple and effective, they lack active weapons which limits damage potential and makes them heavily reliant on driving skill. They're best for strategic drivers who excel at controlling fights.",
      "Flippers use pneumatic or mechanical systems to launch opponents with spectacular visual appeal. They can flip opponents out of the arena with low risk of self-damage. However, they require compressed gas systems and have limited effectiveness against invertible robots. They work best in competitions with arena hazards or out-of-bounds rules.",
      "Crushers use hydraulic or pneumatic pressure to deform opponents, targeting internal components. While they have impressive visual design, they're difficult to use effectively at smaller weight classes due to the challenge of generating sufficient force. Hammers and axes offer simple, reliable mechanisms that can puncture armor but require precise positioning.",
      "When choosing your weapon system, consider the weight class, your driving skill level, fabrication capabilities, competitive goals, and the local competition meta. At Ragnarok, we primarily focus on kinetic energy weapons because they align with our machining capabilities, driving skills, and preference for aggressive fights.",
      "If you're new to combat robotics, start simple with a basic wedge or horizontal spinner. Focus on reliability over complexity, dedicate time to learning to drive effectively, and plan for design iterations. The diversity of weapon systems makes combat robotics endlessly fascinating - choose the type that matches your style and skills!"
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}
