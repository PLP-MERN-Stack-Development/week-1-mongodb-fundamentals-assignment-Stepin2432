/* 1.Find all books*/
use plp_bookstore
switched to db plp_bookstore
db["books"].find()

/* 2.Find books by a specific author:*/
use plp_bookstore
switched to db plp_bookstore
db.books.find({ author: "George Orwell" })

/* 3.Find books published after 1950:*/
use plp_bookstore
switched to db plp_bookstore
db.books.find({ published_year: { $gt: 1950 } })

/* 4.Find books in a specific genre: */
use plp_bookstore
switched to db plp_bookstore
db.books.find({ genre: "Fiction" })

/*Find in-stock books:*/
use plp_bookstore
switched to db plp_bookstore
db.books.find({ in_stock: true })

// 1. Find books that are both in stock and published after 2010
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } }
);

// 2. Use projection to return only the title, author, and price fields
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 3. Sort books by price (ascending)
db.books.find().sort({ price: 1 });

// 4. Sort books by price (descending)
db.books.find().sort({ price: -1 });

// 5. Pagination: limit and skip (5 books per page, example for page 2)
db.books.find().skip(5).limit(5);

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

// 3. Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: { $concat: [
        { $toString: { $multiply: [ { $floor: { $divide: [ "$published_year", 10 ] } }, 10 ] } },
        "s"
      ] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// 1. Create an index on the 'title' field
use plp_bookstore
switched to db plp_bookstore
db.books.createIndex({ title: 1 });
title_1

// 2. Create a compound index on 'author' and 'published_year'
use plp_bookstore
switched to db plp_bookstore
db.books.createIndex({ author: 1, published_year: 1 });
author_1_published_year_1

// 3. Use the explain() method to show performance improvement
// Before index (example query)
db.books.find({ title: "Alchemist" }).explain("executionStats");

// After index (run again to compare)
db.books.find({ title: "Pride and Prejudice" }).explain("executionStats");


c:\Users\user\Desktop\Capture collections.PNG