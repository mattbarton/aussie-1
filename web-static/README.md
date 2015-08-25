# web-app-public

This project builds the static resources for the web-app, using hugo to assemble the HTML pages (and possibly in future, node to drive the compilation etc of JS, CSS and IMG files)

The build process empties the 'public' folder, then populates it with the final artefacts ready for publishing.

# Build process

Run build.sh

# Deploy process

TBD

aws s3 sync public/ s3://projectaussie.com


