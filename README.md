# Deck of Cards

**Running the test**

```
# Clone
$ git clone https://github.com/colereid/classtest.git

# Move into the directory
$ cd classtest

# Install dependencies 
$ npm install (or yarn install)

# test
$ npm run test

#lint
$ npm run lint
```

**Notes**
1. There is a bug in the shuffle where it's not updating the position values of the cards in the array. I ran out of time to fix it.
2. There is also a bug in the constructor where excludeJokers is not working. Again, I figured this out too late to debug it.
3. With more time, I would have preferred to refactor cards into a `Card` class and have the deck use that class instead of objects.
