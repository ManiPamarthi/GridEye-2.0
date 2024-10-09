# Grid Eye Theme

A Kibana plugin to customise the Kibana UI, including:
- Loader logo and text
- Login form
- Header logo
- Spaces selector logo
- Fonts and font sizes

Note: Tested on Kibana 8.7.0.

## Known limitations

When Kibana first loads, it shows a Kibana loader for a few seconds. 
Since it is shown before any css is loaded, it is impossible to change that loader without modifying the source code of the plugin.