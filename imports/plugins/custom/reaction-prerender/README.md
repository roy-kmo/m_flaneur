# Reaction Prerender
Simple plugin that uses prerender.io (or a local prerender server when running in development mode) to serve
prerendered static HTML pages to users before the full Reaction app loads. Allows you to define paths (via regex)
to be prerendered, as well as class names where if clicked in the static HTML, show a loading icon and retrigger
the click when app is loaded. This plugin also provides a simple 'prerender.clear' Meteor method to clear cache
on demand.
