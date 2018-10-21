#!/bin/bash
if [ $FLASK_APP != Server.py ]
then
	export FLASK_APP=Server.py
fi
if [ $FLASK_ENV != production ]
then
	export FLASK_ENV=production
fi
flask run