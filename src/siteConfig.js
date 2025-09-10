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
      name: "Jean Dubois",
      company: "TEVEA RF Consulting",
      phone: "03.60.95.52.43",
      email: "jeandubois@jourrapide.com",
    },
    {
      name: "Sophie Lefèvre",
      company: "TEVEA RF Consulting",
      phone: "01.00.53.15.41",
      email: "sophielefevre@teleworm.us",
    },
  ],

  // Language-specific content (split into separate files for easier maintenance)
  fr,
  en,
  de,
};

export default siteConfig;
