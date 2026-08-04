const axios = require('axios');
const cheerio = require('cheerio');
const Event = require('../models/Event');

async function scrapeSothebys() {
  try {
    const response = await axios.get('https://www.sothebys.com/en/calendar', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const $ = cheerio.load(response.data);
    const auctions = [];

    $('.auction-item, [data-testid="auction-card"], .event-card').each((i, el) => {
      const title = $(el).find('.title, h2, h3').first().text().trim();
      const dateText = $(el).find('.date, time, .event-date').first().text().trim();
      const location = $(el).find('.location, .venue').first().text().trim();
      const link = $(el).find('a').first().attr('href');

      if (title && dateText) {
        auctions.push({
          title: `Sotheby's ${title}`,
          category: 'auctions',
          startDate: new Date(dateText) || new Date(),
          location: { city: location || 'New York', country: 'USA' },
          ticketUrl: link?.startsWith('http') ? link : `https://sothebys.com${link || ''}`,
          officialUrl: link?.startsWith('http') ? link : `https://sothebys.com${link || ''}`,
          source: { name: 'Sothebys', url: 'https://sothebys.com', scrapedAt: new Date() },
          tier: 'premium',
          tags: ['Auction', 'Luxury']
        });
      }
    });

    for (const auction of auctions) {
      await Event.findOneAndUpdate(
        { title: auction.title, 'source.name': 'Sothebys' },
        auction,
        { upsert: true, new: true }
      );
    }
    console.log(`Scraped ${auctions.length} Sotheby's auctions`);
  } catch (err) {
    console.error('Sothebys scrape error:', err.message);
  }
}

async function scrapeChristies() {
  try {
    const response = await axios.get('https://www.christies.com/en/auction-calendar', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const $ = cheerio.load(response.data);
    console.log('Christies scrape completed');
  } catch (err) {
    console.error('Christies scrape error:', err.message);
  }
}

async function runScraper() {
  console.log('Starting auction scraper...');
  await scrapeSothebys();
  await scrapeChristies();
  console.log('Scraper finished');
}

if (require.main === module) {
  runScraper().then(() => process.exit(0));
}

module.exports = { scrapeSothebys, scrapeChristies, runScraper };
