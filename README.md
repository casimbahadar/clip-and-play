# Clip & Play

Clip & Play is a music player and song cutter that runs in your browser. Add audio or video files from your phone or computer, cut the parts you want into their own tracks, and play them from a library that stays on your device.

**Open it:** https://casimbahadar.github.io/clip-and-play/

Clip & Play doesn't download, stream or provide any music. It only works with files you add yourself, so use it with files you have the right to use.

## What it does

- Plays MP3, M4A, WAV and other audio your browser supports, plus the sound from MP4 and WebM video files
- Cuts songs out of a longer file: set a start and end for each song, preview it, and save each one as its own track
- Groups tracks into collections, with search, shuffle and repeat
- Lets you arrange your own play order: drag the handle on a track, or focus it and use the up and down arrow keys
- Shows lyrics you add, karaoke style: paste them, import a .lrc file, or tap along once to time each line. Swipe up on the player, or tap the microphone, to open them
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
3. Find each song with Play, the 5 second skip buttons or the slider. Tap **Now** to set its start and end, or type the time as plain numbers, like `105` for 1:05 (no colon needed).
4. Name the song, tap **Add clip to list**, and repeat for the next one.
5. Tap **Save**.

MP3 files are cut directly, which is instant and keeps the original quality. Other files are recorded while the page plays them silently, so a 4 minute song takes 4 minutes to save. Keep the screen on and the page open while it works.

## Lyrics

Clip & Play doesn't download or provide lyrics. You add them yourself, and they're saved with the song:

- **Paste lyrics** as plain text, one line per line. Any language or alphabet works, including right-to-left scripts.
- **Import a .lrc file**, the common timed-lyrics format. Timing is kept, including word-by-word timing if the file has it.
- **Auto-sync from the audio (beta)** times lyrics you've added for you. A speech AI listens to the song on your device and matches what it hears to your lyrics, line by line and often word by word. Lines it couldn't match, such as romanized lyrics it hears in another script, are estimated and marked so you can check them.
- **Sync lyrics** times them by hand: the song restarts and you tap the button the moment each line starts.
- **Fix a line's timing** corrects just one line: tap it, the song plays from just before it, and you tap when it starts. You can also nudge all lines earlier or later from the lyrics menu.
- **Styles** give each song's lyrics its own look, from 24 choices: Clean, Cute, Elegant, Bold, Retro, Dreamy, Handwritten, Neon, Romantic, Comic, Typewriter, Anime, Gothic, Graffiti, Horror, Sci-fi, Western, Stencil, Storybook, Kawaii, Terminal, Disco, Ink brush and Pop. Each pairs its own lettering with effects like glows, outlines, highlight boxes and tilted lines, and most include fonts made for Korean and Japanese.

Lyrics that are timed can be saved as a .lrc file from the lyrics menu, for example to auto-sync a song on a computer and import the result on a phone.

The current line lights up as it's sung, with a sweep across the words. Tap any line to jump to it. Lyrics are included in backups.

## Where your music is stored

Everything stays in your browser's storage on your device. Nothing is uploaded. The bottom of the library shows how much space you're using and roughly how much your browser allows, which is usually a large share of your device's storage.

Browser storage can be erased if you clear your browser's website data or remove the Home Screen app. The app reminds you once you've added 20 tracks since your last backup. Use **Back up library** and keep the backup file somewhere else, such as iCloud Drive or Google Drive. Large libraries are split into several backup files of up to about 500 MB each. **Restore** reads them back and skips tracks you already have.

## Privacy

The app has no accounts, analytics or tracking, and your music never leaves your device. It makes these outside requests:

- **Fonts** load from Google Fonts: the app's own two, plus a lyric style's fonts when you use that style. If they can't load, your device's fonts are used instead.
- **Auto-sync**, only if you use it, downloads the transformers.js library from jsDelivr and the Whisper speech model (about 80 MB) from Hugging Face. This happens once; the browser keeps them for later songs. On phones, a speech AI can need more memory than the phone allows, in which case the app restarts and tells you. The AI runs on your device; your audio isn't sent anywhere.

## Running your own copy

It's a static site with no build step: `index.html`, `sw.js`, `autosync-worker.js`, `manifest.webmanifest` and the icons. Serve the folder from any web host, or fork this repository and turn on GitHub Pages. Opening `index.html` straight from your computer works too, but offline caching needs it served over HTTPS.

## License

MIT. See [LICENSE](LICENSE).
