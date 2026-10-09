# Clip & Play

Clip & Play is a music player and song cutter that runs in your browser. Add audio or video files from your phone or computer, cut the parts you want into their own tracks, and play them from a library that stays on your device.

**Open it:** https://casimbahadar.github.io/clip-and-play/

Clip & Play doesn't download, stream or provide any music. It only works with files you add yourself, so use it with files you have the right to use.

## What it does

- Plays MP3, M4A, WAV and other audio your browser supports, plus the sound from MP4 and WebM video files
- Cuts songs out of a longer file: set a start and end for each song, preview it, and save each one as its own track
- Groups tracks into collections, with search, shuffle and repeat
- Lets you arrange your own play order: drag the handle on a track, or focus it and use the up and down arrow keys
- Has a sleep timer that stops playback at the end of the current song, after 15, 30 or 60 minutes, or after a custom time in minutes and seconds
- Shows the current track on the lock screen and responds to headphone controls where the browser supports it
- Backs up your whole library to a file and restores it later
- Works offline after your first visit
- On a computer: drag files onto the window to add them, and use Space to play or pause, the left and right arrows to skip 5 seconds, and N and P for next and previous

## Add it to your Home Screen

- **iPhone or iPad:** open the link in Safari, tap Share, then Add to Home Screen.
- **Android:** open the link in Chrome, open the menu, then tap Add to Home screen or Install app.

The Home Screen app and the regular browser keep separate libraries, so pick one and add your music there.

## Cutting songs

1. Tap **Add music** and choose one file.
2. Tap **Cut songs out of this file**.
3. Find each song with Play, the 5 second skip buttons or the slider. Tap **Now** to set its start and end, or type a time like `1:05`.
4. Name the song, tap **Add clip to list**, and repeat for the next one.
5. Tap **Save**.

MP3 files are cut directly, which is instant and keeps the original quality. Other files are recorded while the page plays them silently, so a 4 minute song takes 4 minutes to save. Keep the screen on and the page open while it works.

## Where your music is stored

Everything stays in your browser's storage on your device. Nothing is uploaded. The bottom of the library shows how much space you're using and roughly how much your browser allows, which is usually a large share of your device's storage.

Browser storage can be erased if you clear your browser's website data or remove the Home Screen app. The app reminds you once you've added 20 tracks since your last backup. Use **Back up library** and keep the backup file somewhere else, such as iCloud Drive or Google Drive. Large libraries are split into several backup files of up to about 500 MB each. **Restore** reads them back and skips tracks you already have.

## Privacy

The app has no accounts, analytics or tracking. The only outside request is for its two fonts, Figtree and Pixelify Sans, which load from Google Fonts. If they can't load, the app falls back to your device's fonts.

## Running your own copy

It's a static site with no build step: `index.html`, `sw.js`, `manifest.webmanifest` and the icons. Serve the folder from any web host, or fork this repository and turn on GitHub Pages. Opening `index.html` straight from your computer works too, but offline caching needs it served over HTTPS.

## License

MIT. See [LICENSE](LICENSE).
