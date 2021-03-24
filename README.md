# Twitch Plays CSS

> (forked from [TwitchPlaysX](https://github.com/hzoo/TwitchPlaysX))

Allow Twitch chat to style a website by entering CSS commands as chat messages.

### Local Dev

1. Clone Repo
2. Make sure you have installed [xdotool](http://www.semicomplete.com/projects/xdotool/)
3. Edit `config.js` and change `channel` to use your own twitch channel name
4. Run:

```bash
yarn install
yarn start # Starts server to connect to twitch chat
yarn watch # Starts local web server to show webpage to style with real-time editing
```