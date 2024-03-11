#!/bin/bash
# Open a new terminal window and navigate to the Frontend directory
gnome-terminal --working-directory=Frontend -- npm install && npm run dev &

# Use the current terminal window and navigate to the Server directory
cd Server && npm install && npm run start:dev


# created on 12/3/2024 by Lim Wei Xin