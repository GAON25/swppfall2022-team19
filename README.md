# LetMeCU

[![Build Status](https://app.travis-ci.com/swsnu/swpp2021-team11.svg?branch=master)](https://app.travis-ci.com/swsnu/swpp2021-team11)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2021-team11&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2021-team11)

[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2021-teamX/badge.svg?branch=main)](https://coveralls.io/github/swsnu/swpp2021-teamX?branch=main)


# Frontend
- $ yarn
- $ yarn add redux react-redux @reduxjs/toolkit
- $ yarn add react-select


# docker
docker run --rm -it \
--ipc=host \
--name "practice8" \
-p 0.0.0.0:3000:3000 -p 0.0.0.0:8000:8000 \
-v ${PWD}:/home \
snuspl/swpp:practice8
