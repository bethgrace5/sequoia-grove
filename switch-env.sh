#!/bin/bash
environment=$1
run=$2

if [ "$environment" = "" ]; then
  echo "You must specify an environment, e.g.:"
  echo
  echo "  ./switch-env.sh [dev|staging|prod]"
  echo
  exit 1
fi

cd src/main/webapp/WEB-INF/
rm -f jdbc.properties;
rm -f mvc-dispatcher-servlet.xml;

# dev / development
if [ "$environment" = "dev" ] || [ "$environment" = "development" ]; then
  ln -s dev-jdbc.properties jdbc.properties;
  ln -s dev-mvc-dispatcher-servlet.xml mvc-dispatcher-servlet.xml;
fi

# staging
if [ "$environment" = "staging" ]; then
  ln -s staging-jdbc.properties jdbc.properties;
  ln -s staging-mvc-dispatcher-servlet.xml mvc-dispatcher-servlet.xml;
fi


# prod / production
#if [ "$environment" = "prod" ] || [ "$environment" = "production" ]; then
#fi

cd ../../../../

if [ "$run" = "-r" ]; then
  mvn jetty:run;
fi

