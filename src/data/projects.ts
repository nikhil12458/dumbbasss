export type ProjectData = {
  layout: "wide" | "split" | "reverse";
  slug: string;
  index: string;
  title: string;
  category: string;
  context: string;
  tags: string[];
  meta: {
    category: string;
    role: string;
    timeline: string;
    outcome: string;
  };
  systemMap?: {
    title: string;
    nodes: {
      tag: string;
      title: string;
      desc: string;
      features: string[];
    }[];
  };
  narrative: {
    label: string;
    content: string[];
  }[];
  nextProject?: {
    slug: string;
    title: string;
  };
};

export const projects: ProjectData[] = [
  {
    layout: "split",
    slug: "guardiantrack",
    index: "01",
    title: "GuardianTrack",
    category: "Android · Full-stack · Product interface",
    context: "An anti-theft tracking system built across three tiers — a native Android app, a live web dashboard, and the backend tying both together in real time.",
    tags: ["Kotlin", "Jetpack Compose", "Node.js", "Socket.IO", "MongoDB"],
    meta: {
      category: "Android · Full-stack",
      role: "Design + full build",
      timeline: "6 weeks",
      outcome: "Sideloaded & live on-device"
    },
    systemMap: {
      title: "Three tiers, one honest loop.",
      nodes: [
        {
          tag: "Tier 01",
          title: "Android app",
          desc: "The device-side agent — quiet until it's needed.",
          features: ["Geofencing + Lost Mode", "Offline-first Room DB", "WorkManager background sync"]
        },
        {
          tag: "Tier 02",
          title: "Backend",
          desc: "The trust boundary between device and dashboard.",
          features: ["JWT auth + HMAC signing", "Socket.IO live updates", "TTL-indexed data pruning"]
        },
        {
          tag: "Tier 03",
          title: "Dashboard",
          desc: "Where the owner actually looks.",
          features: ["Interactive geofence editor", "Remote lock & alarm", "Crash reporting view"]
        }
      ]
    },
    narrative: [
      {
        label: "The problem",
        content: [
          "Commercial anti-theft apps are built for scale, not trust — bloated with ads, vague about what they're doing with location data, and rarely built for a specific device the way this needed to be.",
          "The brief was simple to say and hard to do: build something that behaves exactly like a piece of hardware you own, not a service you're renting."
        ]
      },
      {
        label: "What we built",
        content: [
          "A Kotlin/Jetpack Compose app that stays invisible in daily use, but snaps into Lost Mode instantly — screen pinning, remote alarm, and a geofence editor an owner can actually understand at a glance.",
          "Underneath, a Node/Express backend signs every request over HMAC, streams state over Socket.IO instead of polling, and prunes its own historical data on a TTL index so nothing lingers longer than it should."
        ]
      }
    ],
    nextProject: {
      slug: "vastraa",
      title: "Vastraa — ecommerce with AI try-on"
    }
  },
  {
    layout: "reverse",
    slug: "vastraa",
    index: "02",
    title: "Vastraa",
    category: "Ecommerce · AI · Product interface",
    context: "A premium fashion marketplace where the hardest problem wasn't the storefront — it was making a virtual try-on feel trustworthy enough to replace a fitting room.",
    tags: ["React", "Redux Toolkit", "FastAPI", "Node.js", "MongoDB"],
    meta: {
      category: "Ecommerce · AI",
      role: "Design + full build",
      timeline: "8 weeks",
      outcome: "Live marketplace"
    },
    narrative: [
      {
        label: "The problem",
        content: [
          "Building another generic ecommerce template wasn't the goal. The client needed a platform that integrated a complex AI virtual try-on system without feeling like a tech demo."
        ]
      },
      {
        label: "What we built",
        content: [
          "A React frontend backed by a Node.js commerce engine and a dedicated FastAPI microservice handling the AI image generation. The result is a seamless shopping experience where the tech disappears behind the product."
        ]
      }
    ],
    nextProject: {
      slug: "omniagent",
      title: "OmniAgent AI — WhatsApp automation platform"
    }
  },
  {
    layout: "wide",
    slug: "omniagent",
    index: "03",
    title: "OmniAgent AI",
    category: "AI & automation · Software tool",
    context: "A multi-tenant WhatsApp Business automation platform — spec'd from a blank page to a full IEEE-style requirements document, then built end to end.",
    tags: ["Node.js", "TypeScript", "Express", "WhatsApp API"],
    meta: {
      category: "AI & automation",
      role: "Systems architecture + build",
      timeline: "12 weeks",
      outcome: "Beta deployment"
    },
    narrative: [
      {
        label: "The problem",
        content: [
          "Customer service teams were drowning in repetitive WhatsApp queries, but existing automation platforms were either too rigid or too complex for non-technical staff to configure."
        ]
      },
      {
        label: "What we built",
        content: [
          "A multi-tenant Node.js architecture that allows businesses to define complex conversation trees and AI fallbacks. It connects directly to the WhatsApp Business API and provides a clean dashboard for human agents to take over when needed."
        ]
      }
    ],
    nextProject: {
      slug: "kessho",
      title: "Kessho — single-product skincare launch"
    }
  },
  {
    layout: "split",
    slug: "kessho",
    index: "04",
    title: "Kessho",
    category: "Branding · Landing page",
    context: "A single-product skincare launch that needed to feel expensive on a launch-week budget — brand, copy, and a one-page site built as one unit.",
    tags: ["Design system", "Copywriting", "HTML/CSS"],
    meta: {
      category: "Branding · Landing page",
      role: "Brand + copy + design",
      timeline: "2 weeks",
      outcome: "Live launch page"
    },
    narrative: [
      {
        label: "The problem",
        content: [
          "A great product with zero brand identity and a tight launch deadline. They needed everything from the color palette to the final HTML delivered in one cohesive package."
        ]
      },
      {
        label: "What we built",
        content: [
          "We skipped the endless moodboards and went straight to building. The result is a highly focused, performance-optimized landing page that tells the product's story without getting in the way of the 'Buy' button."
        ]
      }
    ],
    nextProject: {
      slug: "instagram-studio",
      title: "Instagram Studio — internal scraping tooling"
    }
  },
  {
    layout: "reverse",
    slug: "instagram-studio",
    index: "05",
    title: "Instagram Studio",
    category: "Software tool · Internal tooling",
    context: "A scraping and viewing pipeline built for a content research workflow that needed to move faster than manual browsing ever could.",
    tags: ["Playwright", "Node.js", "Local tooling"],
    meta: {
      category: "Internal tooling",
      role: "Full build",
      timeline: "3 weeks",
      outcome: "Active internal use"
    },
    narrative: [
      {
        label: "The problem",
        content: [
          "A research team was spending hours every week manually saving and categorizing Instagram content for trend analysis. They needed a way to automate the collection process without triggering anti-bot protections."
        ]
      },
      {
        label: "What we built",
        content: [
          "A localized Playwright orchestration layer that runs headless browser sessions to systematically collect targeted content. The data is piped into a fast local viewer that allows the team to filter and analyze the data in seconds instead of hours."
        ]
      }
    ],
    nextProject: {
      slug: "fieldnotes",
      title: "Fieldnotes — interactive physical typography"
    }
  },
  {
    layout: "wide",
    slug: "fieldnotes",
    index: "06",
    title: "Fieldnotes",
    category: "Experimental · Interactive visual",
    context: "A small interactive piece exploring physical typography — letters that behave like cloth instead of pixels. This site's own kinetic wordmark grew out of it.",
    tags: ["Canvas", "Custom physics", "Typography"],
    meta: {
      category: "Experimental",
      role: "Research + development",
      timeline: "Ongoing",
      outcome: "Interactive prototype"
    },
    narrative: [
      {
        label: "The problem",
        content: [
          "Web typography is rigid. We wanted to see what happens when you treat letters as physical objects with mass, constraints, and gravity."
        ]
      },
      {
        label: "What we built",
        content: [
          "A custom Verlet integration physics engine that samples font pixels to generate a dynamic constraint mesh. The letters hang, sway, and react to wind and mouse interaction. It started as an experiment and eventually became the hero element of the dumbbasss studio site."
        ]
      }
    ]
  }
];
