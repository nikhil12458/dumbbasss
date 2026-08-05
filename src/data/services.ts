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
    extraSection?: {
      title: string;
      desc: string;
      items: string[];
      footer: string;
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
    title: "Websites & Commerce",
    shortDesc: "Custom marketing sites, portfolios, product pages, and ecommerce experiences — built to look distinct and work properly.",
    detail: {
      heroLede: "Custom websites, storefronts, and product experiences — designed to look sharp, built to turn attention into action.",
      whatIsIt: "A fully custom website for brands that need more than a template with their logo on it.\nFrom landing pages and portfolios to ecommerce and product pages, I handle the design, the front end, and the build so the final result feels polished, fast, and intentional.",
      whoIsItFor: "Founders, creators, and businesses that want a site that feels premium, loads well, and actually supports the business instead of just sitting there.",
      included: [
        "Custom layout, typography, and visual direction",
        "Responsive development across all screen sizes",
        "Landing pages, portfolios, product pages, and ecommerce fronts",
        "Copy structure and content layout guidance",
        "Basic technical SEO and performance setup",
        "Staging, refinement, and launch support"
      ],
      outcomes: [
        { label: "Branding · Landing page", title: "Kessho — a launch page built in two weeks", link: "/projects/kessho" },
        { label: "Ecommerce", title: "Vastraa — a storefront built around AI try-on", link: "/projects/vastraa" }
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
    title: "Custom Software",
    shortDesc: "Custom internal tools, dashboards, and web apps for workflows that generic software does not handle well.",
    detail: {
      heroLede: "Custom tools and internal platforms built around how your business actually works.",
      whatIsIt: "When spreadsheets, off-the-shelf SaaS, and patchwork tools stop being enough, I build the missing system.\nThat could be an internal dashboard, an admin panel, a workflow tool, a client portal, or a full web app that replaces messy manual processes.",
      whoIsItFor: "Teams, agencies, and businesses that have outgrown generic software and need something built around their process instead of forced into someone else’s product.",
      included: [
        "Workflow mapping and system planning",
        "Custom dashboards and admin panels",
        "API development and third-party integrations",
        "Authentication, roles, and permissions",
        "Database design built for scale",
        "Testing of core flows before launch",
        "Documentation and handoff support"
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
    title: "AI & Automation",
    shortDesc: "AI agents, workflow automations, and smart integrations that remove repetitive work and save time.",
    detail: {
      heroLede: "Practical automation and AI systems that make your business run with less manual effort.",
      whatIsIt: "Not every business needs AI for the sake of it.\nSometimes the real win is automating the repetitive stuff: answering common questions, moving data between tools, qualifying leads, generating content, summarizing information, or handling support workflows more efficiently.\n\nThe goal is not to add “AI” everywhere.\nThe goal is to remove busywork where it actually helps.",
      whoIsItFor: "Businesses that waste time on repetitive tasks, manual handoffs, or disconnected tools and want a smarter system that does the boring work for them.",
      included: [
        "Workflow audit to find good automation opportunities",
        "AI agent and assistant design",
        "Prompt engineering and LLM integration",
        "Automation across existing tools and platforms",
        "Knowledge base and document workflows",
        "Human handoff and fallback logic",
        "Monitoring and refinement after launch"
      ],
      outcomes: [
        { label: "AI & automation", title: "OmniAgent AI — multi-tenant WhatsApp automation", link: "/projects/omniagent" },
        { label: "Vision AI", title: "Vastraa — AI virtual try-on experience", link: "/projects/vastraa" },
        { label: "Automation", title: "Instagram engagement and workflow automation", link: "/projects/instagram-studio" }
      ],
      nextService: {
        slug: "business-systems",
        title: "Business systems — making your operations run smoothly"
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
    slug: "business-systems",
    index: "04",
    title: "Business Systems",
    shortDesc: "Custom operational software for businesses that have outgrown spreadsheets, paper, and disconnected tools.",
    detail: {
      heroLede: "Custom operational software that helps businesses run smoother—from the front desk to the warehouse floor.",
      whatIsIt: "Every growing business eventually reaches the point where WhatsApp messages, Excel sheets, notebooks, and disconnected software stop working together.\n\nThat's usually when mistakes increase, information gets lost, and everyone starts asking the same question:\n\n\"Who updated this?\"\n\nI build custom business systems that replace those messy workflows with software designed around how your business actually operates—not how generic software expects you to work.\n\nWhether it's one location or twenty, the goal is simple:\n\nMake daily operations easier.",
      whoIsItFor: "Businesses that are spending too much time managing operations manually.\n\nWhether you run a restaurant, warehouse, retail store, clinic, hospital, manufacturing unit, service company, franchise, or multi-branch business, the software should fit your workflow—not force you to change it.",
      included: [
        "Inventory & stock management",
        "Order and billing systems",
        "Customer & supplier management",
        "Staff dashboards and permissions",
        "Appointment and booking systems",
        "Multi-branch management",
        "Reporting and business analytics",
        "Custom workflows built around your operations",
        "Payment gateway and third-party integrations",
        "Deployment, documentation, and support"
      ],
      extraSection: {
        title: "— problems we solve —",
        desc: "Instead of listing industries, list situations.",
        items: [
          "Running multiple branches from different spreadsheets",
          "Losing inventory because stock isn't updated",
          "Manual billing and order tracking",
          "Staff juggling WhatsApp, Excel, and paper records",
          "Disconnected systems that never share information",
          "Too much repetitive admin work",
          "No visibility into daily business performance"
        ],
        footer: "If your business has a process that feels harder than it should, we can probably build something better."
      },
      outcomes: [
        { label: "Retail", title: "Inventory & billing systems", link: "/projects" },
        { label: "Healthcare", title: "Appointment and patient management", link: "/projects" },
        { label: "Warehousing", title: "Stock tracking and operational dashboards", link: "/projects" },
        { label: "Hospitality", title: "Order and staff management", link: "/projects" },
        { label: "Manufacturing", title: "Production workflow systems", link: "/projects" }
      ],
      nextService: {
        slug: "growth",
        title: "Growth & SEO — helping the right people find your business."
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
    title: "Growth & Visibility",
    shortDesc: "Search-friendly sites, landing pages, and content structure that help the right people actually find you.",
    detail: {
      heroLede: "Making the good work show up in the right places.",
      whatIsIt: "A good website is useless if no one finds it.\nI help structure websites, pages, and content so they have a better chance of showing up in search, reading clearly, and converting once people land there.\n\nThis is not spammy SEO.\nIt is about building a site that is understandable to both humans and search engines.",
      whoIsItFor: "Businesses that already have a website, or are about to launch one, and want stronger visibility, cleaner structure, and better performance over time.",
      included: [
        "Page structure and content hierarchy",
        "Technical SEO basics",
        "Metadata and on-page optimization",
        "Keyword-aware page planning",
        "Content layout for clarity and conversion",
        "Performance and UX improvements",
        "Support for launch-ready discoverability"
      ],
      outcomes: [
        { label: "SEO", title: "Content structure and landing page optimization", link: "/projects" },
        { label: "Growth", title: "Visibility improvements for service pages", link: "/projects" },
        { label: "Content", title: "Search-friendly site architecture", link: "/projects" }
      ],
      nextService: {
        slug: "websites",
        title: "Websites — custom sites that look sharp and convert"
      }
    },
    subItems: [
      { title: "Technical SEO", desc: "Speed, structure, and metadata done properly from the start." },
      { title: "Content structure", desc: "Information architecture that search engines and humans both like." }
    ]
  }
];
