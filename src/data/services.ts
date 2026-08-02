export type ServiceData = {
  slug: string;
  index: string;
  title: string;
  shortDesc: string;
  detail: {
    heroLede: string;
    whatIsIt: string;
    whoIsItFor: string;
    included: string[];
    outcomes: {
      label: string;
      title: string;
      link: string;
    }[];
    nextService?: {
      slug: string;
      title: string;
    };
  };
  subItems: {
    title: string;
    desc: string;
  }[];
};

export const services: ServiceData[] = [
  {
    slug: "websites",
    index: "01",
    title: "Websites & Web Apps",
    shortDesc: "Custom sites, storefronts, and product experiences — designed to look distinct, built to work properly. No templates pretending to be strategy.",
    detail: {
      heroLede: "Custom sites, storefronts, and product experiences — designed to look distinct, built to work properly. No templates pretending to be strategy.",
      whatIsIt: "A full custom build for brands that need more than a pretty homepage. From marketing sites and portfolios to ecommerce, product flows, and full-stack web apps — I handle the design, the front end, and the technical side end to end.\n\nThis is for when the website is not just a page. It is the product, the sales tool, or the system behind the business.",
      whoIsItFor: "Founders, small teams, and businesses that want a site or app that feels considered, fast, and reliable — not something assembled from a theme and held together with hope.",
      included: [
        "Custom layout, typography, and UI direction",
        "Responsive development across all screen sizes",
        "Marketing sites, portfolios, and product pages",
        "Ecommerce flows, product pages, and checkout journeys",
        "Web apps, dashboards, and internal tools",
        "Payments, auth, integrations, and API-driven features",
        "Basic technical SEO and performance tuning",
        "Deployment support, handoff docs, and clean code structure"
      ],
      outcomes: [
        { label: "Branding · Landing page", title: "Kessho — a launch page built in two weeks", link: "/projects/kessho" },
        { label: "Ecommerce", title: "Vastraa — a storefront built around AI try-on", link: "/projects/vastraa" },
        { label: "Full-stack build", title: "Snitch — a custom ecommerce system with payments and admin tools", link: "/projects/snitch" }
      ],
      nextService: {
        slug: "software",
        title: "Software systems — tools your team actually opens"
      }
    },
    subItems: [
      { title: "Web design", desc: "Custom interfaces built around what your users actually do." },
      { title: "Full-stack development", desc: "React, Node, and whatever backend the project calls for." },
      { title: "Landing pages", desc: "Fast, focused, built to convert without feeling like a funnel." },
      { title: "Content migration", desc: "Moving off a legacy CMS or template without losing your SEO." }
    ]
  },
  {
    slug: "software",
    index: "02",
    title: "Software systems",
    shortDesc: "Internal tools and custom platforms for problems off-the-shelf software does not quite solve.",
    detail: {
      heroLede: "Internal tools and custom platforms for problems off-the-shelf software does not quite solve.",
      whatIsIt: "Custom web applications, native Android apps, dashboards, and internal tools built around how your team actually works. I build unified systems where a mobile app and a web dashboard share the exact same backend effortlessly.\n\nInstead of forcing your process into generic SaaS, I build the missing piece, replace messy spreadsheet workflows, or connect the systems you already use into something that feels smooth and usable.",
      whoIsItFor: "Operations teams, founders, agencies, and growing businesses that have outgrown off-the-shelf tools and need software shaped around their workflow — not the other way around.",
      included: [
        "Requirements gathering and workflow mapping",
        "Native Android app development (Kotlin)",
        "Custom web dashboards and admin panels",
        "Unified APIs serving both mobile and web",
        "Auth, roles, permissions, and access control",
        "Database design built for scale",
        "Core-flow testing before launch",
        "Deployment setup, documentation, and handoff"
      ],
      outcomes: [
        { label: "Android · Full-stack", title: "GuardianTrack — anti-theft tracking system", link: "/projects/guardiantrack" },
        { label: "Internal tooling", title: "Instagram Studio — automated content pipeline", link: "/projects/instagram-studio" },
        { label: "Operations", title: "Custom back-office systems and workflow tools", link: "/projects" }
      ],
      nextService: {
        slug: "ai",
        title: "AI & automation — practical, not performative"
      }
    },
    subItems: [
      { title: "Custom systems", desc: "Purpose-built tools instead of duct-taped spreadsheets." },
      { title: "Dashboards & admin panels", desc: "Internal views your team will actually open every day." },
      { title: "APIs & integrations", desc: "Connecting the tools you already use to each other properly." },
      { title: "Mobile & Android", desc: "Native Kotlin builds for products that need to live on-device." }
    ]
  },
  {
    slug: "ai",
    index: "03",
    title: "AI & automation",
    shortDesc: "Practical integrations that remove real busywork — the useful kind of AI, not the theatrical kind.",
    detail: {
      heroLede: "Practical integrations that remove real busywork — the useful kind of AI, not the theatrical kind.",
      whatIsIt: "Implementation of Large Language Models (LLMs) and workflow automation into your existing processes to handle repetitive tasks, generate content, or provide intelligent assistance.",
      whoIsItFor: "Companies looking to genuinely improve efficiency without buying into AI hype. Perfect for customer support teams, content operations, and data-heavy workflows.",
      included: [
        "Workflow audit to identify high-value automation targets",
        "Custom prompt engineering and model tuning",
        "Integration with existing CRM or operational tools",
        "Fallback mechanisms for human handover",
        "Usage monitoring and cost optimization"
      ],
      outcomes: [
        { label: "AI & automation", title: "OmniAgent AI — multi-tenant WhatsApp automation", link: "/projects/omniagent" }
      ],
      nextService: {
        slug: "restaurant",
        title: "Restaurant systems — making the dining room run smoothly"
      }
    },
    subItems: [
      { title: "Chatbots", desc: "Guided assistants that actually route people correctly." },
      { title: "AI integration", desc: "Wiring existing models into your product sensibly." },
      { title: "Generative AI", desc: "Image, text, or workflow generation built into your tools." },
      { title: "Workflow automation", desc: "Removing the manual steps between your tools and your team." }
    ]
  },
  {
    slug: "restaurant",
    index: "04",
    title: "Restaurant systems",
    shortDesc: "The specific, unglamorous software that makes a dining room run smoothly.",
    detail: {
      heroLede: "The specific, unglamorous software that makes a dining room run smoothly.",
      whatIsIt: "Digital menus, reservation systems, and table management tools that don't require your customers to download a bloated app or sign up for an account.",
      whoIsItFor: "Independent restaurants and hospitality groups who want to control their own digital experience rather than paying 30% commissions to third-party platforms.",
      included: [
        "Fast, accessible digital menus (QR code accessible)",
        "Custom reservation flows",
        "Staff-side management dashboard",
        "Integration with existing POS systems (where possible)",
        "Reliable hosting and uptime monitoring"
      ],
      outcomes: [],
      nextService: {
        slug: "growth",
        title: "Growth & SEO — getting found properly"
      }
    },
    subItems: [
      { title: "QR scan menus", desc: "No app download, just a scan and a clean menu." },
      { title: "Table booking", desc: "A reservation flow simple enough to replace the phone." },
      { title: "Ordering & reservations", desc: "End-to-end flow from table to kitchen to bill." },
      { title: "Admin systems", desc: "Staff-side views for managing tables, menus, and orders." }
    ]
  },
  {
    slug: "growth",
    index: "05",
    title: "Growth & SEO",
    shortDesc: "Making sure the good work you've already paid for actually gets found.",
    detail: {
      heroLede: "Making sure the good work you've already paid for actually gets found.",
      whatIsIt: "Technical SEO audits, site speed optimization, and structural improvements to ensure your site is readable by search engines and performs well in rankings.",
      whoIsItFor: "Businesses with a great product or service that aren't getting the organic traffic they deserve due to technical bottlenecks or poor site architecture.",
      included: [
        "Comprehensive technical audit",
        "Core Web Vitals optimization",
        "URL structure and metadata strategy",
        "Schema markup implementation",
        "Performance reporting and recommendations"
      ],
      outcomes: [],
      nextService: {
        slug: "websites",
        title: "Websites — custom design & build"
      }
    },
    subItems: [
      { title: "Technical SEO", desc: "Speed, structure, and metadata done properly from the start." },
      { title: "Content structure", desc: "Information architecture that search engines and humans both like." }
    ]
  }
];
