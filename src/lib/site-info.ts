/** Single source of truth for contact details and social links. */
export const SITE = {
  name: "Vaishnavi Marble",
  blurb:
    "At Vaishnavi Marble, we take pride in being the leading destination for exquisite marble in Kolkata.",
  address:
    "Krishnapur Taruliya Main Road (near Chanchal Kumari Girls High School), Sonartari Apartment, P.S. New Town, Kolkata – 700102",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Vaishnavi+Marble+Krishnapur+Taruliya+Main+Road+New+Town+Kolkata+700102",
  phones: ["+91 93303 00408", "+91 98363 44786"],
  whatsapp: "+917003948297",
  email: "marblevaishnavi@gmail.com",
  social: {
    youtube: "https://www.youtube.com/watch?v=C18P_HBotEg",
    facebook: "https://www.facebook.com/reel/972774255777112",
    facebookPage:
      "https://m.facebook.com/story.php?story_fbid=pfbid02Ls7eWAp9YbgGyjJtiiCuAKQcajSD8Rz2e9s6Ni6RRYLksdAuvtfoT5Z1CRtbBGEbl&id=61592157269542&sfnsn=wiwspwa&mibextid=RUbZ1f",
  },
} as const;

export const telHref = (p: string) => `tel:${p.replace(/[^\d+]/g, "")}`;
export const whatsappHref = `https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}`;
