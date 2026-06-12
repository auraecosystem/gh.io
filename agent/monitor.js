// npm install firecrawl
import { Firecrawl } from "firecrawl";

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

const monitor = await app.createMonitor({
  "name": "Competitor Monitor",
  "schedule": {
    "text": "every 30 minutes",
    "timezone": "UTC"
  },
  "targets": [
    {
      "type": "scrape",
      "urls": [
        "https://example.com/blog"
      ],
      "scrapeOptions": {
        "formats": [
          "markdown"
        ],
        "maxAge": 0
      }
    }
  ],
  "goal": "Notify me about meaningful new posts or product announcements (ignore layout or ad changes).",
  "judgeEnabled": true,
  "notification": {
    "email": {
      "enabled": true,
      "includeDiffs": true,
      "recipients": [
        "alerts@example.com"
      ]
    }
  }
});

console.log(monitor.id);
