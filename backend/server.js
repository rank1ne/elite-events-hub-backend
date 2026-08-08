require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Event = require('./models/Event');

// ===== AUTH & PAYMENT ROUTES =====
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ==================== STATIC FRONTEND ====================
// Pehle static files serve karo taaki frontend load ho sake
app.use(express.static(path.join(__dirname, 'public')));

// ==================== AUTO-SEED DATA ====================
const seedEvents = [
  {
    title: "RM Sotheby's Monterey",
    description: "Monterey Car Week auction featuring Ferrari and classic cars",
    category: "auctions",
    subcategory: "Cars",
    startDate: new Date("2026-08-14"),
    location: { city: "Monterey", country: "USA", venue: "Monterey Conference Center" },
    pricing: { currency: "USD", displayPrice: "Est. $5M+" },
    ticketUrl: "https://rmsothebys.com",
    officialUrl: "https://rmsothebys.com",
    tier: "premium",
    tags: ["Cars", "Ferrari", "Classic"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Bonhams Quail Lodge Auction",
    description: "Classic car auction at Quail Lodge",
    category: "auctions",
    subcategory: "Cars",
    startDate: new Date("2026-08-15"),
    location: { city: "Carmel Valley", country: "USA", venue: "Quail Lodge" },
    pricing: { currency: "USD", displayPrice: "Est. $12M+" },
    ticketUrl: "https://bonhams.com/quail-lodge",
    officialUrl: "https://bonhams.com/quail-lodge",
    tier: "premium",
    tags: ["Cars", "Bonhams", "Classic"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Concours d'Elegance Pebble Beach",
    description: "Premier classic car show and competition",
    category: "experiences",
    subcategory: "Cars",
    startDate: new Date("2026-08-16"),
    location: { city: "Pebble Beach", country: "USA", venue: "Pebble Beach Golf Links" },
    pricing: { currency: "USD", displayPrice: "$750+" },
    ticketUrl: "https://pebblebeachconcours.net",
    officialUrl: "https://pebblebeachconcours.net",
    tier: "premium",
    tags: ["Cars", "Classic", "Concours"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Christie's Important Watches",
    description: "Important Watches auction featuring rare Patek Philippe timepieces",
    category: "auctions",
    subcategory: "Watches",
    startDate: new Date("2026-08-20"),
    location: { city: "New York", country: "USA", venue: "Rockefeller Center" },
    pricing: { currency: "USD", displayPrice: "Est. $800K-$1.6M" },
    ticketUrl: "https://christies.com/en/auction/important-watches-26076",
    officialUrl: "https://christies.com/en/auction/important-watches-26076",
    tier: "premium",
    tags: ["Watches", "Patek Philippe", "Luxury"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Phillips New York Watch Auction XI",
    description: "Important watches auction in New York",
    category: "auctions",
    subcategory: "Watches",
    startDate: new Date("2026-08-22"),
    location: { city: "New York", country: "USA", venue: "Phillips New York" },
    pricing: { currency: "USD", displayPrice: "Est. $3M+" },
    ticketUrl: "https://phillips.com",
    officialUrl: "https://phillips.com",
    tier: "premium",
    tags: ["Watches", "Phillips", "Luxury"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Heritage Luxury Accessories",
    description: "Luxury handbags and accessories auction",
    category: "auctions",
    subcategory: "Accessories",
    startDate: new Date("2026-08-25"),
    location: { city: "Dallas", country: "USA", venue: "Heritage Auctions" },
    pricing: { currency: "USD", displayPrice: "Est. $1.5M+" },
    ticketUrl: "https://heritageauctions.com",
    officialUrl: "https://heritageauctions.com",
    tier: "premium",
    tags: ["Bags", "Hermès", "Luxury"],
    isActive: true,
    isFeatured: false
  },
  {
    title: "US Open Tennis Championships",
    description: "US Open Grand Slam tennis tournament",
    category: "sports",
    subcategory: "Tennis",
    startDate: new Date("2026-08-31"),
    endDate: new Date("2026-09-13"),
    location: { city: "New York", country: "USA", venue: "USTA Billie Jean King Center" },
    pricing: { currency: "USD", displayPrice: "$600+" },
    ticketUrl: "https://usopen.org",
    officialUrl: "https://usopen.org",
    tier: "premium",
    tags: ["Tennis", "Grand Slam", "New York"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Cannes Yachting Festival",
    description: "Europe's leading in-water boat show",
    category: "yachts",
    subcategory: "Superyachts",
    startDate: new Date("2026-09-08"),
    endDate: new Date("2026-09-13"),
    location: { city: "Cannes", country: "France", venue: "Vieux Port & Port Canto" },
    pricing: { currency: "EUR", displayPrice: "EUR 75+" },
    ticketUrl: "https://cannesyachtingfestival.com",
    officialUrl: "https://cannesyachtingfestival.com",
    tier: "premium",
    tags: ["Superyachts", "Mediterranean", "France"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Sotheby's High Jewelry",
    description: "High Jewelry auction featuring Cartier and rare diamonds",
    category: "auctions",
    subcategory: "Jewelry",
    startDate: new Date("2026-09-17"),
    location: { city: "Hong Kong", country: "China", venue: "Sotheby's Hong Kong" },
    pricing: { currency: "USD", displayPrice: "Est. $2M+" },
    ticketUrl: "https://sothebys.com/en/auctions/high-jewelry",
    officialUrl: "https://sothebys.com/en/auctions/high-jewelry",
    tier: "premium",
    tags: ["Jewelry", "Cartier", "Diamonds"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Canelo vs Bivol II",
    description: "World championship boxing rematch",
    category: "sports",
    subcategory: "Boxing",
    startDate: new Date("2026-09-19"),
    location: { city: "Las Vegas", country: "USA", venue: "T-Mobile Arena" },
    pricing: { currency: "USD", displayPrice: "$1,200+" },
    ticketUrl: "#",
    officialUrl: "https://t-mobilearena.com",
    tier: "premium",
    tags: ["Boxing", "Title Fight", "Las Vegas"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Monaco Yacht Show 2026",
    description: "The world's leading superyacht show at Port Hercule",
    category: "yachts",
    subcategory: "Superyachts",
    startDate: new Date("2026-09-23"),
    endDate: new Date("2026-09-26"),
    location: { city: "Monte Carlo", country: "Monaco", venue: "Port Hercule" },
    pricing: { currency: "EUR", displayPrice: "EUR 400-EUR 2,070" },
    ticketUrl: "https://monacoyachtshow.com",
    officialUrl: "https://monacoyachtshow.com",
    tier: "premium",
    tags: ["Superyachts", "VIP", "Maritime"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Sotheby's Contemporary Evening HK",
    description: "Contemporary Art Evening Auction in Hong Kong",
    category: "auctions",
    subcategory: "Art",
    startDate: new Date("2026-09-29"),
    location: { city: "Hong Kong", country: "China", venue: "Sotheby's Hong Kong" },
    pricing: { currency: "USD", displayPrice: "Est. $10M+" },
    ticketUrl: "https://sothebys.com",
    officialUrl: "https://sothebys.com",
    tier: "premium",
    tags: ["Art", "Contemporary", "Auction"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Antiquorum Geneva Watch Auction",
    description: "Important vintage and modern watches auction",
    category: "auctions",
    subcategory: "Watches",
    startDate: new Date("2026-09-26"),
    location: { city: "Geneva", country: "Switzerland", venue: "Hotel Mandarin Oriental" },
    pricing: { currency: "CHF", displayPrice: "Est. CHF 2M+" },
    ticketUrl: "https://antiquorum.swiss",
    officialUrl: "https://antiquorum.swiss",
    tier: "premium",
    tags: ["Watches", "Vintage", "Geneva"],
    isActive: true,
    isFeatured: false
  },
  {
    title: "F1 Singapore Grand Prix",
    description: "Formula 1 night race in Singapore",
    category: "sports",
    subcategory: "F1",
    startDate: new Date("2026-10-04"),
    location: { city: "Singapore", country: "Singapore", venue: "Marina Bay Street Circuit" },
    pricing: { currency: "SGD", displayPrice: "S$1,500+" },
    ticketUrl: "https://singaporegp.sg",
    officialUrl: "https://singaporegp.sg",
    tier: "premium",
    tags: ["F1", "Night Race", "Singapore"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Frieze London",
    description: "International contemporary art fair in Regent's Park",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2026-10-08"),
    endDate: new Date("2026-10-11"),
    location: { city: "London", country: "UK", venue: "Regent's Park" },
    pricing: { currency: "GBP", displayPrice: "£40+" },
    ticketUrl: "https://frieze.com",
    officialUrl: "https://frieze.com",
    tier: "free",
    tags: ["Art", "Contemporary", "London"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Art Basel Paris",
    description: "International art fair in Paris",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2026-10-16"),
    endDate: new Date("2026-10-19"),
    location: { city: "Paris", country: "France", venue: "Grand Palais" },
    pricing: { currency: "USD", displayPrice: "$75-$500" },
    ticketUrl: "https://artbasel.com/paris",
    officialUrl: "https://artbasel.com/paris",
    tier: "free",
    tags: ["Art", "Contemporary", "Paris"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Fort Lauderdale Boat Show",
    description: "America's largest in-water boat show",
    category: "yachts",
    subcategory: "Superyachts",
    startDate: new Date("2026-10-28"),
    endDate: new Date("2026-11-01"),
    location: { city: "Fort Lauderdale", country: "USA", venue: "Bahia Mar Yachting Center" },
    pricing: { currency: "USD", displayPrice: "$150+" },
    ticketUrl: "https://flibs.com",
    officialUrl: "https://flibs.com",
    tier: "premium",
    tags: ["Superyachts", "Americas", "Florida"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Christie's Hong Kong Autumn Auctions",
    description: "Asian contemporary and classical art evening sales",
    category: "auctions",
    subcategory: "Art",
    startDate: new Date("2026-10-24"),
    location: { city: "Hong Kong", country: "China", venue: "Christie's Hong Kong" },
    pricing: { currency: "USD", displayPrice: "Est. $15M+" },
    ticketUrl: "https://christies.com",
    officialUrl: "https://christies.com",
    tier: "premium",
    tags: ["Art", "Asia", "Evening Sale"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Paris Fashion Week SS27",
    description: "Spring/Summer 2027 haute couture and ready-to-wear shows",
    category: "experiences",
    subcategory: "Fashion",
    startDate: new Date("2026-10-01"),
    endDate: new Date("2026-10-09"),
    location: { city: "Paris", country: "France", venue: "Multiple Venues" },
    pricing: { currency: "EUR", displayPrice: "EUR 500+" },
    ticketUrl: "#",
    officialUrl: "https://fhcm.paris",
    tier: "premium",
    tags: ["Fashion", "Haute Couture", "Paris"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Phillips Geneva Watch Auction XVIII",
    description: "Important watches auction in Geneva",
    category: "auctions",
    subcategory: "Watches",
    startDate: new Date("2026-11-08"),
    location: { city: "Geneva", country: "Switzerland", venue: "Phillips Geneva" },
    pricing: { currency: "CHF", displayPrice: "Est. CHF 8M+" },
    ticketUrl: "https://phillips.com",
    officialUrl: "https://phillips.com",
    tier: "premium",
    tags: ["Watches", "Phillips", "Geneva"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Sotheby's Contemporary Evening NY",
    description: "Contemporary art evening auction in New York",
    category: "auctions",
    subcategory: "Art",
    startDate: new Date("2026-11-18"),
    location: { city: "New York", country: "USA", venue: "Sotheby's York Avenue" },
    pricing: { currency: "USD", displayPrice: "Est. $20M+" },
    ticketUrl: "https://sothebys.com",
    officialUrl: "https://sothebys.com",
    tier: "premium",
    tags: ["Art", "Contemporary", "New York"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Abu Dhabi Grand Prix",
    description: "Formula 1 season finale at Yas Marina",
    category: "sports",
    subcategory: "F1",
    startDate: new Date("2026-11-29"),
    location: { city: "Yas Marina", country: "UAE", venue: "Yas Marina Circuit" },
    pricing: { currency: "AED", displayPrice: "AED 2,500+" },
    ticketUrl: "https://yasmarinacircuit.com",
    officialUrl: "https://yasmarinacircuit.com",
    tier: "premium",
    tags: ["F1", "Season Finale", "Abu Dhabi"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Milan Fashion Week SS27",
    description: "Spring/Summer 2027 Milan Fashion Week",
    category: "experiences",
    subcategory: "Fashion",
    startDate: new Date("2026-11-18"),
    endDate: new Date("2026-11-24"),
    location: { city: "Milan", country: "Italy", venue: "Multiple Venues" },
    pricing: { currency: "EUR", displayPrice: "EUR 400+" },
    ticketUrl: "#",
    officialUrl: "https://cameramoda.it",
    tier: "premium",
    tags: ["Fashion", "Luxury", "Milan"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Wine Spectator Auction",
    description: "Rare wine and spirits auction featuring Bordeaux and Burgundy",
    category: "auctions",
    subcategory: "Wine",
    startDate: new Date("2026-11-12"),
    location: { city: "New York", country: "USA", venue: "Zachys Auction House" },
    pricing: { currency: "USD", displayPrice: "Est. $500K+" },
    ticketUrl: "https://zachys.com",
    officialUrl: "https://zachys.com",
    tier: "premium",
    tags: ["Wine", "Bordeaux", "Auction"],
    isActive: true,
    isFeatured: false
  },
  {
    title: "Art Basel Miami Beach",
    description: "Premier international art fair in Miami",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2026-12-03"),
    endDate: new Date("2026-12-06"),
    location: { city: "Miami", country: "USA", venue: "Miami Beach Convention Center" },
    pricing: { currency: "USD", displayPrice: "$75-$500" },
    ticketUrl: "https://artbasel.com",
    officialUrl: "https://artbasel.com",
    tier: "free",
    tags: ["Art", "Contemporary", "Fair"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Christie's Magnificent Jewels",
    description: "Magnificent jewels auction in New York",
    category: "auctions",
    subcategory: "Jewelry",
    startDate: new Date("2026-12-08"),
    location: { city: "New York", country: "USA", venue: "Christie's Rockefeller" },
    pricing: { currency: "USD", displayPrice: "Est. $8M+" },
    ticketUrl: "https://christies.com",
    officialUrl: "https://christies.com",
    tier: "premium",
    tags: ["Jewelry", "Diamonds", "Luxury"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Nobu Miami New Year's Eve",
    description: "Exclusive New Year's Eve gala at Nobu Hotel Miami",
    category: "experiences",
    subcategory: "Dining",
    startDate: new Date("2026-12-31"),
    location: { city: "Miami", country: "USA", venue: "Nobu Hotel Miami Beach" },
    pricing: { currency: "USD", displayPrice: "$2,500+" },
    ticketUrl: "#",
    officialUrl: "https://noburestaurants.com",
    tier: "premium",
    tags: ["Dining", "NYE", "VIP"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Frieze Los Angeles",
    description: "International contemporary art fair in Los Angeles",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2026-12-10"),
    endDate: new Date("2026-12-13"),
    location: { city: "Los Angeles", country: "USA", venue: "Santa Monica Airport" },
    pricing: { currency: "USD", displayPrice: "$50+" },
    ticketUrl: "https://frieze.com",
    officialUrl: "https://frieze.com",
    tier: "free",
    tags: ["Art", "Contemporary", "Los Angeles"],
    isActive: true,
    isFeatured: false
  },
  {
    title: "Australian Open",
    description: "Australian Open Grand Slam tennis tournament",
    category: "sports",
    subcategory: "Tennis",
    startDate: new Date("2027-01-18"),
    endDate: new Date("2027-01-31"),
    location: { city: "Melbourne", country: "Australia", venue: "Melbourne Park" },
    pricing: { currency: "AUD", displayPrice: "AUD 500+" },
    ticketUrl: "https://ausopen.com",
    officialUrl: "https://ausopen.com",
    tier: "premium",
    tags: ["Tennis", "Grand Slam", "Australia"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Polo Gold Cup",
    description: "Snow Polo World Cup St. Moritz",
    category: "sports",
    subcategory: "Polo",
    startDate: new Date("2027-01-22"),
    endDate: new Date("2027-01-28"),
    location: { city: "St. Moritz", country: "Switzerland", venue: "Frozen Lake" },
    pricing: { currency: "CHF", displayPrice: "CHF 2,500+" },
    ticketUrl: "#",
    officialUrl: "https://snowpolo-stmoritz.com",
    tier: "premium",
    tags: ["Polo", "Snow", "Luxury"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Superyacht Miami",
    description: "Premier superyacht showcase in Miami",
    category: "yachts",
    subcategory: "Superyachts",
    startDate: new Date("2027-01-15"),
    endDate: new Date("2027-01-18"),
    location: { city: "Miami", country: "USA", venue: "Island Gardens" },
    pricing: { currency: "USD", displayPrice: "$250+" },
    ticketUrl: "https://superyachtmiami.com",
    officialUrl: "https://superyachtmiami.com",
    tier: "premium",
    tags: ["Superyachts", "Americas", "Miami"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Davos World Economic Forum",
    description: "Annual meeting of global leaders and elites",
    category: "experiences",
    subcategory: "Business",
    startDate: new Date("2027-01-20"),
    endDate: new Date("2027-01-24"),
    location: { city: "Davos", country: "Switzerland", venue: "Congress Centre" },
    pricing: { currency: "CHF", displayPrice: "Invitation Only" },
    ticketUrl: "#",
    officialUrl: "https://weforum.org",
    tier: "premium",
    tags: ["Business", "Networking", "Davos"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "New York Fashion Week FW27",
    description: "Fall/Winter 2027 New York Fashion Week",
    category: "experiences",
    subcategory: "Fashion",
    startDate: new Date("2027-02-12"),
    endDate: new Date("2027-02-18"),
    location: { city: "New York", country: "USA", venue: "Multiple Venues" },
    pricing: { currency: "USD", displayPrice: "$300+" },
    ticketUrl: "#",
    officialUrl: "https://cfda.com",
    tier: "premium",
    tags: ["Fashion", "NYFW", "Runway"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Christie's Dubai Art Week",
    description: "Modern and contemporary art auctions in Dubai",
    category: "auctions",
    subcategory: "Art",
    startDate: new Date("2027-02-25"),
    location: { city: "Dubai", country: "UAE", venue: "Christie's Dubai" },
    pricing: { currency: "USD", displayPrice: "Est. $3M+" },
    ticketUrl: "https://christies.com",
    officialUrl: "https://christies.com",
    tier: "premium",
    tags: ["Art", "Middle East", "Dubai"],
    isActive: true,
    isFeatured: false
  },
  {
    title: "NBA All-Star Weekend",
    description: "NBA All-Star Game and celebrity events",
    category: "sports",
    subcategory: "Basketball",
    startDate: new Date("2027-02-14"),
    endDate: new Date("2027-02-16"),
    location: { city: "Indianapolis", country: "USA", venue: "Gainbridge Fieldhouse" },
    pricing: { currency: "USD", displayPrice: "$800+" },
    ticketUrl: "https://nba.com",
    officialUrl: "https://nba.com",
    tier: "premium",
    tags: ["Basketball", "All-Star", "Sports"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Dubai International Boat Show",
    description: "Middle East's leading maritime event",
    category: "yachts",
    subcategory: "Superyachts",
    startDate: new Date("2027-03-10"),
    endDate: new Date("2027-03-14"),
    location: { city: "Dubai", country: "UAE", venue: "Dubai Harbour" },
    pricing: { currency: "AED", displayPrice: "AED 150+" },
    ticketUrl: "https://dubaiboatshow.com",
    officialUrl: "https://dubaiboatshow.com",
    tier: "premium",
    tags: ["Superyachts", "Middle East", "Dubai"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "TEFAF Maastricht",
    description: "The world's leading art fair",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2027-03-12"),
    endDate: new Date("2027-03-21"),
    location: { city: "Maastricht", country: "Netherlands", venue: "MECC Maastricht" },
    pricing: { currency: "EUR", displayPrice: "EUR 50+" },
    ticketUrl: "https://tefaf.com",
    officialUrl: "https://tefaf.com",
    tier: "free",
    tags: ["Art", "Fine Art", "TEFAF"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Bonhams Bond Street Jewels",
    description: "Fine jewelry auction at Bonhams London",
    category: "auctions",
    subcategory: "Jewelry",
    startDate: new Date("2027-03-15"),
    location: { city: "London", country: "UK", venue: "Bonhams Bond Street" },
    pricing: { currency: "GBP", displayPrice: "Est. £800K+" },
    ticketUrl: "https://bonhams.com",
    officialUrl: "https://bonhams.com",
    tier: "premium",
    tags: ["Jewelry", "Bonhams", "Luxury"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Art Basel Hong Kong",
    description: "International art fair in Hong Kong",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2027-03-25"),
    endDate: new Date("2027-03-27"),
    location: { city: "Hong Kong", country: "China", venue: "Hong Kong Convention Centre" },
    pricing: { currency: "USD", displayPrice: "$75-$500" },
    ticketUrl: "https://artbasel.com/hong-kong",
    officialUrl: "https://artbasel.com/hong-kong",
    tier: "free",
    tags: ["Art", "Contemporary", "Asia"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Dubai World Cup",
    description: "World's richest horse race",
    category: "sports",
    subcategory: "Horse Racing",
    startDate: new Date("2027-03-28"),
    location: { city: "Dubai", country: "UAE", venue: "Meydan Racecourse" },
    pricing: { currency: "AED", displayPrice: "AED 2,500+" },
    ticketUrl: "#",
    officialUrl: "https://dubaiworldcup.com",
    tier: "premium",
    tags: ["Horse Racing", "VIP", "Dubai"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Frieze Seoul",
    description: "International contemporary art fair in Seoul",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2027-03-04"),
    endDate: new Date("2027-03-07"),
    location: { city: "Seoul", country: "South Korea", venue: "COEX" },
    pricing: { currency: "USD", displayPrice: "$40+" },
    ticketUrl: "https://frieze.com",
    officialUrl: "https://frieze.com",
    tier: "free",
    tags: ["Art", "Contemporary", "Asia"],
    isActive: true,
    isFeatured: false
  },
  {
    title: "The Masters Tournament",
    description: "Golf's most prestigious major championship",
    category: "sports",
    subcategory: "Golf",
    startDate: new Date("2027-04-05"),
    endDate: new Date("2027-04-11"),
    location: { city: "Augusta", country: "USA", venue: "Augusta National Golf Club" },
    pricing: { currency: "USD", displayPrice: "$3,000+" },
    ticketUrl: "https://masters.com",
    officialUrl: "https://masters.com",
    tier: "premium",
    tags: ["Golf", "Major", "Augusta"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Singapore Yacht Show",
    description: "Asia's premier yacht show",
    category: "yachts",
    subcategory: "Superyachts",
    startDate: new Date("2027-04-23"),
    endDate: new Date("2027-04-26"),
    location: { city: "Singapore", country: "Singapore", venue: "Sentosa Cove" },
    pricing: { currency: "SGD", displayPrice: "S$500+" },
    ticketUrl: "#",
    officialUrl: "https://singaporeyachtshow.com",
    tier: "premium",
    tags: ["Superyachts", "Asia", "Maritime"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Coachella VIP Weekend 1",
    description: "VIP desert music festival experience with luxury camping",
    category: "experiences",
    subcategory: "Music",
    startDate: new Date("2027-04-10"),
    endDate: new Date("2027-04-12"),
    location: { city: "Indio", country: "USA", venue: "Empire Polo Club" },
    pricing: { currency: "USD", displayPrice: "$3,500+" },
    ticketUrl: "https://coachella.com",
    officialUrl: "https://coachella.com",
    tier: "premium",
    tags: ["Music", "Festival", "VIP"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "London Marathon VIP",
    description: "London Marathon with VIP hospitality package",
    category: "sports",
    subcategory: "Running",
    startDate: new Date("2027-04-25"),
    location: { city: "London", country: "UK", venue: "The Mall" },
    pricing: { currency: "GBP", displayPrice: "£1,200+" },
    ticketUrl: "https://londonmarathon.co.uk",
    officialUrl: "https://londonmarathon.co.uk",
    tier: "premium",
    tags: ["Marathon", "London", "VIP"],
    isActive: true,
    isFeatured: false
  },
  {
    title: "Met Gala 2027",
    description: "Costume Institute Gala at The Met",
    category: "experiences",
    subcategory: "Fashion",
    startDate: new Date("2027-05-03"),
    location: { city: "New York", country: "USA", venue: "The Metropolitan Museum" },
    pricing: { currency: "USD", displayPrice: "$35K+" },
    ticketUrl: "#",
    officialUrl: "https://metmuseum.org/met-gala",
    tier: "premium",
    tags: ["Fashion", "Charity", "VIP"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Kentucky Derby",
    description: "The most exciting two minutes in sports",
    category: "sports",
    subcategory: "Horse Racing",
    startDate: new Date("2027-05-02"),
    location: { city: "Louisville", country: "USA", venue: "Churchill Downs" },
    pricing: { currency: "USD", displayPrice: "$2,000+" },
    ticketUrl: "https://kentuckyderby.com",
    officialUrl: "https://kentuckyderby.com",
    tier: "premium",
    tags: ["Horse Racing", "VIP", "Kentucky"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Monaco Historic Grand Prix",
    description: "Historic Formula 1 cars race at Monaco",
    category: "sports",
    subcategory: "Motorsport",
    startDate: new Date("2027-05-10"),
    location: { city: "Monaco", country: "Monaco", venue: "Circuit de Monaco" },
    pricing: { currency: "EUR", displayPrice: "EUR 500+" },
    ticketUrl: "https://acm.mc",
    officialUrl: "https://acm.mc",
    tier: "premium",
    tags: ["Motorsport", "Historic", "Monaco"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Cannes Film Festival",
    description: "Festival de Cannes - VIP access and premieres",
    category: "experiences",
    subcategory: "Film",
    startDate: new Date("2027-05-12"),
    endDate: new Date("2027-05-23"),
    location: { city: "Cannes", country: "France", venue: "Palais des Festivals" },
    pricing: { currency: "EUR", displayPrice: "EUR 3,000+" },
    ticketUrl: "#",
    officialUrl: "https://festival-cannes.com",
    tier: "premium",
    tags: ["Film", "VIP", "Cannes"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Venice Biennale 2027",
    description: "International art exhibition",
    category: "arts",
    subcategory: "Art Exhibition",
    startDate: new Date("2027-05-08"),
    endDate: new Date("2027-11-21"),
    location: { city: "Venice", country: "Italy", venue: "Giardini and Arsenale" },
    pricing: { currency: "EUR", displayPrice: "EUR 25+" },
    ticketUrl: "https://labiennale.org",
    officialUrl: "https://labiennale.org",
    tier: "free",
    tags: ["Art", "Contemporary", "Venice"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Champions League Final",
    description: "UEFA Champions League final with VIP hospitality",
    category: "sports",
    subcategory: "Football",
    startDate: new Date("2027-05-29"),
    location: { city: "Munich", country: "Germany", venue: "Allianz Arena" },
    pricing: { currency: "EUR", displayPrice: "EUR 2,000+" },
    ticketUrl: "#",
    officialUrl: "https://uefa.com",
    tier: "premium",
    tags: ["Football", "Champions League", "Final"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Royal Ascot",
    description: "Britain's most valuable race meeting",
    category: "sports",
    subcategory: "Horse Racing",
    startDate: new Date("2027-06-16"),
    endDate: new Date("2027-06-20"),
    location: { city: "Ascot", country: "UK", venue: "Ascot Racecourse" },
    pricing: { currency: "GBP", displayPrice: "GBP 500+" },
    ticketUrl: "https://ascot.co.uk",
    officialUrl: "https://ascot.co.uk",
    tier: "premium",
    tags: ["Horse Racing", "Royal", "UK"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Monaco Grand Prix 2027",
    description: "Formula 1 Monaco Grand Prix with VIP yacht viewing experience",
    category: "sports",
    subcategory: "F1",
    startDate: new Date("2027-06-06"),
    endDate: new Date("2027-06-08"),
    location: { city: "Monte Carlo", country: "Monaco", venue: "Circuit de Monaco" },
    pricing: { currency: "EUR", displayPrice: "EUR 4,000+" },
    ticketUrl: "https://monaco-grandprix.com",
    officialUrl: "https://monaco-grandprix.com",
    tier: "premium",
    tags: ["F1", "Yacht Viewing", "Motorsport"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Wimbledon Championships",
    description: "The Championships, Wimbledon - Debenture tickets with hospitality",
    category: "sports",
    subcategory: "Tennis",
    startDate: new Date("2027-06-28"),
    endDate: new Date("2027-07-11"),
    location: { city: "London", country: "UK", venue: "All England Club" },
    pricing: { currency: "GBP", displayPrice: "GBP 3,395pp" },
    ticketUrl: "https://eventsinternational.co.uk/wimbledon",
    officialUrl: "https://wimbledon.com",
    tier: "premium",
    tags: ["Tennis", "Debenture", "Grand Slam"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Art Basel Basel",
    description: "International art fair in Basel",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2027-06-17"),
    endDate: new Date("2027-06-20"),
    location: { city: "Basel", country: "Switzerland", venue: "Messe Basel" },
    pricing: { currency: "USD", displayPrice: "$75-$500" },
    ticketUrl: "https://artbasel.com/basel",
    officialUrl: "https://artbasel.com/basel",
    tier: "free",
    tags: ["Art", "Contemporary", "Europe"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "F1 British Grand Prix",
    description: "Formula 1 at Silverstone Circuit",
    category: "sports",
    subcategory: "F1",
    startDate: new Date("2027-07-04"),
    location: { city: "Silverstone", country: "UK", venue: "Silverstone Circuit" },
    pricing: { currency: "GBP", displayPrice: "GBP 350+" },
    ticketUrl: "https://silverstone.co.uk",
    officialUrl: "https://silverstone.co.uk",
    tier: "premium",
    tags: ["F1", "Historic", "British"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "The Open Championship",
    description: "The oldest golf major championship",
    category: "sports",
    subcategory: "Golf",
    startDate: new Date("2027-07-12"),
    location: { city: "St Andrews", country: "UK", venue: "Old Course at St Andrews" },
    pricing: { currency: "GBP", displayPrice: "GBP 250+" },
    ticketUrl: "https://theopen.com",
    officialUrl: "https://theopen.com",
    tier: "premium",
    tags: ["Golf", "Major", "St Andrews"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Burning Man 2027",
    description: "The ultimate desert art and music experience",
    category: "experiences",
    subcategory: "Festival",
    startDate: new Date("2027-07-27"),
    endDate: new Date("2027-08-04"),
    location: { city: "Black Rock City", country: "USA", venue: "Black Rock Desert" },
    pricing: { currency: "USD", displayPrice: "$2,500+" },
    ticketUrl: "https://burningman.org",
    officialUrl: "https://burningman.org",
    tier: "premium",
    tags: ["Festival", "Art", "Desert"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Henley Royal Regatta",
    description: "Premier rowing event with VIP hospitality",
    category: "sports",
    subcategory: "Rowing",
    startDate: new Date("2027-07-01"),
    endDate: new Date("2027-07-05"),
    location: { city: "Henley-on-Thames", country: "UK", venue: "Henley Reach" },
    pricing: { currency: "GBP", displayPrice: "£800+" },
    ticketUrl: "https://hrr.co.uk",
    officialUrl: "https://hrr.co.uk",
    tier: "premium",
    tags: ["Rowing", "Royal", "UK"],
    isActive: true,
    isFeatured: false
  },
  {
    title: "Pebble Beach Concours 2027",
    description: "Premier classic car show and competition",
    category: "experiences",
    subcategory: "Cars",
    startDate: new Date("2027-08-15"),
    location: { city: "Pebble Beach", country: "USA", venue: "Pebble Beach Golf Links" },
    pricing: { currency: "USD", displayPrice: "$750+" },
    ticketUrl: "https://pebblebeachconcours.net",
    officialUrl: "https://pebblebeachconcours.net",
    tier: "premium",
    tags: ["Cars", "Classic", "Concours"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Monaco Yacht Show 2027",
    description: "The world's leading superyacht show at Port Hercule",
    category: "yachts",
    subcategory: "Superyachts",
    startDate: new Date("2027-08-25"),
    endDate: new Date("2027-08-28"),
    location: { city: "Monte Carlo", country: "Monaco", venue: "Port Hercule" },
    pricing: { currency: "EUR", displayPrice: "EUR 400-EUR 2,070" },
    ticketUrl: "https://monacoyachtshow.com",
    officialUrl: "https://monacoyachtshow.com",
    tier: "premium",
    tags: ["Superyachts", "VIP", "Maritime"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "US Open Tennis 2027",
    description: "US Open Grand Slam tennis tournament",
    category: "sports",
    subcategory: "Tennis",
    startDate: new Date("2027-08-30"),
    endDate: new Date("2027-09-12"),
    location: { city: "New York", country: "USA", venue: "USTA Billie Jean King Center" },
    pricing: { currency: "USD", displayPrice: "$600+" },
    ticketUrl: "https://usopen.org",
    officialUrl: "https://usopen.org",
    tier: "premium",
    tags: ["Tennis", "Grand Slam", "New York"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Venice Film Festival",
    description: "Mostra Internazionale d'Arte Cinematografica with VIP access",
    category: "experiences",
    subcategory: "Film",
    startDate: new Date("2027-09-01"),
    endDate: new Date("2027-09-11"),
    location: { city: "Venice", country: "Italy", venue: "Lido di Venezia" },
    pricing: { currency: "EUR", displayPrice: "EUR 1,500+" },
    ticketUrl: "#",
    officialUrl: "https://labiennale.org/cinema",
    tier: "premium",
    tags: ["Film", "Venice", "VIP"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Singapore F1 Night Race 2027",
    description: "Formula 1 night race in Singapore",
    category: "sports",
    subcategory: "F1",
    startDate: new Date("2027-09-19"),
    location: { city: "Singapore", country: "Singapore", venue: "Marina Bay Street Circuit" },
    pricing: { currency: "SGD", displayPrice: "S$1,500+" },
    ticketUrl: "https://singaporegp.sg",
    officialUrl: "https://singaporegp.sg",
    tier: "premium",
    tags: ["F1", "Night Race", "Singapore"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Rugby World Cup Final",
    description: "Rugby World Cup final with VIP hospitality",
    category: "sports",
    subcategory: "Rugby",
    startDate: new Date("2027-09-25"),
    location: { city: "Sydney", country: "Australia", venue: "Stadium Australia" },
    pricing: { currency: "AUD", displayPrice: "AUD 1,500+" },
    ticketUrl: "#",
    officialUrl: "https://rugbyworldcup.com",
    tier: "premium",
    tags: ["Rugby", "World Cup", "Final"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Frieze London 2027",
    description: "International contemporary art fair in Regent's Park",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2027-10-07"),
    endDate: new Date("2027-10-10"),
    location: { city: "London", country: "UK", venue: "Regent's Park" },
    pricing: { currency: "GBP", displayPrice: "£40+" },
    ticketUrl: "https://frieze.com",
    officialUrl: "https://frieze.com",
    tier: "free",
    tags: ["Art", "Contemporary", "London"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Super Bowl LXI VIP",
    description: "Super Bowl with luxury suite and pre-game hospitality",
    category: "sports",
    subcategory: "Football",
    startDate: new Date("2027-10-10"),
    location: { city: "Los Angeles", country: "USA", venue: "SoFi Stadium" },
    pricing: { currency: "USD", displayPrice: "$15,000+" },
    ticketUrl: "#",
    officialUrl: "https://nfl.com",
    tier: "premium",
    tags: ["Football", "Super Bowl", "VIP"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Art Basel Paris 2027",
    description: "International art fair in Paris",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2027-10-15"),
    endDate: new Date("2027-10-18"),
    location: { city: "Paris", country: "France", venue: "Grand Palais" },
    pricing: { currency: "USD", displayPrice: "$75-$500" },
    ticketUrl: "https://artbasel.com/paris",
    officialUrl: "https://artbasel.com/paris",
    tier: "free",
    tags: ["Art", "Contemporary", "Paris"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Abu Dhabi GP 2027",
    description: "Formula 1 season finale at Yas Marina",
    category: "sports",
    subcategory: "F1",
    startDate: new Date("2027-11-28"),
    location: { city: "Yas Marina", country: "UAE", venue: "Yas Marina Circuit" },
    pricing: { currency: "AED", displayPrice: "AED 2,500+" },
    ticketUrl: "https://yasmarinacircuit.com",
    officialUrl: "https://yasmarinacircuit.com",
    tier: "premium",
    tags: ["F1", "Season Finale", "Abu Dhabi"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Sotheby's Geneva Magnificent Jewels",
    description: "Magnificent jewels and noble jewels auction",
    category: "auctions",
    subcategory: "Jewelry",
    startDate: new Date("2027-11-10"),
    location: { city: "Geneva", country: "Switzerland", venue: "Sotheby's Geneva" },
    pricing: { currency: "CHF", displayPrice: "Est. CHF 10M+" },
    ticketUrl: "https://sothebys.com",
    officialUrl: "https://sothebys.com",
    tier: "premium",
    tags: ["Jewelry", "Diamonds", "Geneva"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Miami Art Week",
    description: "Art Basel Miami and satellite fairs week",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2027-11-30"),
    endDate: new Date("2027-12-05"),
    location: { city: "Miami", country: "USA", venue: "Multiple Venues" },
    pricing: { currency: "USD", displayPrice: "$75-$500" },
    ticketUrl: "https://artbasel.com",
    officialUrl: "https://artbasel.com",
    tier: "free",
    tags: ["Art", "Contemporary", "Miami"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Art Basel Miami Beach 2027",
    description: "Premier international art fair in Miami",
    category: "arts",
    subcategory: "Art Fair",
    startDate: new Date("2027-12-02"),
    endDate: new Date("2027-12-05"),
    location: { city: "Miami", country: "USA", venue: "Miami Beach Convention Center" },
    pricing: { currency: "USD", displayPrice: "$75-$500" },
    ticketUrl: "https://artbasel.com",
    officialUrl: "https://artbasel.com",
    tier: "free",
    tags: ["Art", "Contemporary", "Fair"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Nobu Tokyo New Year's Eve",
    description: "Exclusive New Year's Eve gala at Nobu Tokyo",
    category: "experiences",
    subcategory: "Dining",
    startDate: new Date("2027-12-31"),
    location: { city: "Tokyo", country: "Japan", venue: "Nobu Tokyo" },
    pricing: { currency: "USD", displayPrice: "$3,000+" },
    ticketUrl: "#",
    officialUrl: "https://noburestaurants.com",
    tier: "premium",
    tags: ["Dining", "NYE", "Tokyo"],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Christie's Winter Auctions",
    description: "Important winter auctions in London",
    category: "auctions",
    subcategory: "Art",
    startDate: new Date("2027-12-08"),
    location: { city: "London", country: "UK", venue: "Christie's King Street" },
    pricing: { currency: "GBP", displayPrice: "Est. £5M+" },
    ticketUrl: "https://christies.com",
    officialUrl: "https://christies.com",
    tier: "premium",
    tags: ["Art", "Winter", "London"],
    isActive: true,
    isFeatured: false
  }
];

async function autoSeedEvents() {
  try {
    const count = await Event.countDocuments();
    console.log(`Current events in DB: ${count}`);

    if (count < 50) {
      console.log('Events count low. Auto-seeding database...');
      await Event.deleteMany({});
      await Event.insertMany(seedEvents);
      console.log(`Auto-seeded ${seedEvents.length} events successfully!`);
    } else {
      console.log('Database already has sufficient events. Skipping seed.');
    }
  } catch (err) {
    console.error('Auto-seed error:', err.message);
  }
}

// ==================== API ROUTES ====================

// Mount auth & payment routes FIRST
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// Health check for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all events (NO LIMIT - sab aayenge)
app.get('/api/events', async (req, res) => {
  try {
    const { category, tier, featured, search } = req.query;
    let query = { isActive: true };

    if (category && category !== 'all') {
      query.category = category.toLowerCase();
    }
    if (tier) {
      query.tier = tier.toLowerCase();
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const events = await Event.find(query).sort({ startDate: 1 });
    res.json({ success: true, count: events.length, events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get single event
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Event.distinct('category');
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get featured events
app.get('/api/events/featured/list', async (req, res) => {
  try {
    const events = await Event.find({ isFeatured: true, isActive: true }).sort({ startDate: 1 });
    res.json({ success: true, count: events.length, events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Manual seed endpoint (for admin use)
app.post('/api/seed', async (req, res) => {
  try {
    await Event.deleteMany({});
    await Event.insertMany(seedEvents);
    res.json({ success: true, message: `Seeded ${seedEvents.length} events` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get event stats
app.get('/api/stats', async (req, res) => {
  try {
    const total = await Event.countDocuments();
    const premium = await Event.countDocuments({ tier: 'premium' });
    const free = await Event.countDocuments({ tier: 'free' });
    const featured = await Event.countDocuments({ isFeatured: true });
    res.json({ success: true, stats: { total, premium, free, featured } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== CONNECT DB & START SERVER ====================
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('ERROR: MONGODB_URI environment variable is not set');
      process.exit(1);
    }

    // 1. PEHLE server start karo taaki Railway healthcheck pass ho sake
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

    // 2. PHIR DB connect karo (async, non-blocking)
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 3. Auto-seed on startup
    await autoSeedEvents();

  } catch (err) {
    console.error('Server startup error:', err);
  }
}

startServer();
