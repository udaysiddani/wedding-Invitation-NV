# 💍 Siva Ram weds Sri Harshita — Wedding Invitation

Exact clone of https://sivaramwedssriharshita.vercel.app

## Project Structure

```
wedding-clone/
├── index.html          ← Main page
├── styles/
│   └── main.css        ← All styling + animations
├── scripts/
│   └── main.js         ← Countdown, audio, scroll reveals, confetti
├── audio/
│   └── wedding-bgm.mp3 ← Background music (add your own)
├── server.js           ← Local dev server
├── package.json
└── vercel.json         ← Vercel deployment config
```

## Run Locally

```bash
node server.js
# Open: http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to vercel.com → New Project → Import from GitHub
3. Leave all settings default → click Deploy
4. Done — your site is live!

## Add Background Music

Place an MP3 file at: `audio/wedding-bgm.mp3`

Free Carnatic/classical wedding music sources:
- freemusicarchive.org
- pixabay.com/music (search "Indian classical")
- soundcloud.com (Creative Commons tracks)

## Customise Content

All content is in `index.html`. Use Ctrl+H in VS Code to find & replace:

| Find | Replace with |
|------|-------------|
| `Siva Ram` | Groom's name |
| `Sri Harshita` | Bride's name |
| `April 10, 2026` | Wedding date |
| `08:40 PM` | Muhurtham time |
| `2026-04-10T20:40:00+05:30` | Date in JS (ISO format, IST) |
| `Toshniwal Bhawan Function Hall` | Venue name |
| `Near NCS Theatre, Vizianagaram` | Venue address |
| `Nageswara Sarma` | Groom's father |
| `Jogulamba` | Groom's mother |
| `Chandrasekhar` | Bride's father |
| `Durga Devi` | Bride's mother |

## Features

- ✅ Falling petal animation
- ✅ Floating Vinayaka image with glow
- ✅ Scroll-triggered reveal animations
- ✅ Live countdown timer with flip animation
- ✅ Background audio with wave visualizer
- ✅ "We Are Married!" confetti on wedding day
- ✅ Cursor sparkle effect (desktop)
- ✅ Hero parallax scrolling
- ✅ Vinayaka 3D tilt on hover
- ✅ Animated families section
- ✅ Venue with Google Maps link
- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Custom gold scrollbar
- ✅ Loading screen
