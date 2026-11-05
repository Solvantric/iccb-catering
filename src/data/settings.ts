import { SiteSettings } from "@/types";
import { SITE_INFO } from "./site";

export const INITIAL_SETTINGS: SiteSettings = {
  brandName: SITE_INFO.name,
  tagline: SITE_INFO.tagline,
  address: SITE_INFO.contact.address,
  cateringPhone: SITE_INFO.contact.cateringPhone,
  bookingPhones: SITE_INFO.contact.bookingPhones,
  cateringEmail: SITE_INFO.contact.cateringEmail,
  generalEmail: SITE_INFO.contact.generalEmail,
  whatsappNumber: SITE_INFO.contact.whatsappNumber,
  hours: SITE_INFO.contact.hours,
  announcementBar: {
    enabled: true,
    text: "Winter Wedding Season 2026-2027: Limited hall dates open. Book your tasting session today!",
    linkText: "Book Tasting",
    linkUrl: "/tasting",
  },
  offerPopup: {
    enabled: true,
    title: "Exclusive Season Privilege",
    discountText: "Complimentary Borhani Station for bookings over 500 guests",
    description: "Submit an event quote today and claim our signature clay-pot Borhani setup at zero extra charge.",
    code: "ICCBWINTER26",
  },
  socialLinks: {
    facebook: "https://facebook.com/iccbbashundhara",
    instagram: "https://instagram.com/iccbcatering",
    linkedin: "https://linkedin.com/company/iccb-dhaka",
    youtube: "https://youtube.com/@iccbbashundhara",
  },
};
