import fr from "./config/site.fr.js";
import en from "./config/site.en.js";
import de from "./config/site.de.js";

const siteConfig = {
  // Shared assets
  photo: "profile.jpg",
  initials: "HF",

  // Shared links
  links: {
    facebook: "",
    linkedin: "https://www.linkedin.com/in/heike-christina-fenot-62828b1/",
  },

  // Shared references
  references: [
    {
      name: "Cyrille Konter",
      company: "Konter Avocat",
      phone: "+33 6 78 71 20 48",
      email: "ckr@cyrillekonter-avocat.fr",
    },
    {
      name: "Patrick Brenelin",
      company: "TEVEA International",
      phone: "+33 6 03 01 05 88",
      email: "patrick.brenelin@tevea.fr",
    },
  ],

  // Language-specific content (split into separate files for easier maintenance)
  fr,
  en,
  de,
};

export default siteConfig;
