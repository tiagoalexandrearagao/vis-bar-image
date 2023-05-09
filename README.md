# Viz Bar Image (Looker)

![](docs/graphic.jpg)

#### Quickstart Dev Instructions

**Install Dependecies.**

Using yarn, install all dependencies

**Make changes to the source code**

**Compile your code**

You need to bundle your code, let's run:

Recommended: Webpack can detect changes and build automatically

Your compiled code can be found in this repo.

`**./bar_image.js**`: This visualization's minified distribution file.

`**LICENSE**`: Looker's Marketplace content License file.

`**manifest.lkml**`: Looker's external dependencies configuration file. The visualization object is defined here.

`**marketplace.json**`: A JSON file containing information the marketplace installer uses to set up this project.

`**/src**`: This directory will contain all of the visualization's source code.

`**/src/bar_image.js**`: The main source code for the visualization.

`**README.md**`: This! A text file containing useful reference information about this visualization.

`**yarn.lock**`: [Yarn](https://yarnpkg.com/) is a package manager alternative to npm. This file serves essentially the same purpose as `package-lock.json`, just for a different package management system.

git log -1 --format="%H"

git pull origin && git add . && git commit -m "Build" && git push origin

https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md#presenting-configuration-ui

https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md

/\*\*

- Welcome to the Looker Custom Visualization Builder! Please refer to the following resources
- to help you write your visualization:
- - API Documentation - https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md
- - Example Visualizations - https://github.com/looker/custom_visualizations_v2/tree/master/src/examples
- - How to use the CVB - https://developers.looker.com/marketplace/tutorials/about-custom-viz-builder
- - [https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md](https://github.com/looker/custom_visualizations_v2/blob/master/docs/api_reference.md)
  - https://github.com/tiagoalexandrearagao/viz-bar-img-logo-marketplace/blob/master/src/scatter_hist.js

\*\*/

```
yarn watch
```

```
yarn build
```

```
yarn install
```
