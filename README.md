# Catch's code challenge
Reach app for Catch's code challenge

## Setup
To run this project, install it locally using npm

```
$ cd ../catch-react
$ npm install
$ npm start
```

To test

```
$ npm test
```

## Decisions
- The sort was stored in the state object as an array. The requirements only needed two sorting options but this will allow addtional sorting options to be easily added.

- As both the sale price and retail price in the response data were in cents, they both used a component to format the number to dollars to display.

- To display the product cards, I chose to use grid css. This made it easy to keep each card the same size and control how many cards were on a row depending on the window size.