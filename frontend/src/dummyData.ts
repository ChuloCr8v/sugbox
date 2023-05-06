export const suggestions = [
  {
    id: 1,
    title: "Improve website loading speed",
    suggestion:
      "Optimize images and minify JavaScript and CSS files to make the website load faster.",
    suggester: "John Doe",
    upvotes: 23,
    downvotes: 5,
    status: "pending",
    date: new Date(2022, 4, 15), // Example date: May 15, 2022
  },
  {
    id: 2,
    title: "Add more payment options",
    suggestion:
      "Allow customers to pay with PayPal, Apple Pay, and other popular payment methods.",
    suggester: "Jane Smith",
    upvotes: 15,
    downvotes: 8,
    status: "accepted",
    date: new Date(2022, 6, 8), // Example date: July 8, 2022
  },
  {
    id: 3,
    title: "Increase marketing efforts",
    suggestion:
      "Run more ads on social media and collaborate with influencers to increase brand awareness.",
    suggester: "Bob Johnson",
    upvotes: 17,
    downvotes: 3,
    status: "accepted",
    date: new Date(2022, 9, 1), // Example date: October 1, 2022
  },
  {
    id: 4,
    title: "Improve customer support",
    suggestion:
      "Hire more support staff and implement a chatbot to help customers with basic inquiries.",
    suggester: "Alice Lee",
    upvotes: 12,
    downvotes: 2,
    status: "rejected",
    date: new Date(2022, 11, 20), // Example date: December 20, 2022
  },
  {
    id: 5,
    title: "Add product reviews section",
    suggestion:
      "Allow customers to leave reviews on the website to increase trust and credibility.",
    suggester: "Mike Brown",
    upvotes: 8,
    downvotes: 4,
    status: "pending",
    date: new Date(2023, 0, 5), // Example date: January 5, 2023
  },
  {
    id: 6,
    title: "Improve product descriptions",
    suggestion:
      "Add more details and high-quality images to product descriptions to help customers make informed decisions.",
    suggester: "Sarah Davis",
    upvotes: 10,
    downvotes: 1,
    status: "accepted",
    date: new Date(2023, 1, 10), // Example date: February 10, 2023
  },
  {
    id: 7,
    title: "Add wishlist feature",
    suggestion:
      "Allow customers to save products they are interested in for later purchase.",
    suggester: "David Wilson",
    upvotes: 6,
    downvotes: 2,
    status: "rejected",
    date: new Date(2023, 2, 1), // Example date: March 1, 2023
  },
  {
    id: 8,
    title: "Offer free shipping",
    suggestion:
      "Provide free shipping for orders over a certain amount to encourage customers to make larger purchases.",
    suggester: "Karen Martinez",
    upvotes: 11,
    downvotes: 6,
    status: "pending",
    date: new Date(2023, 3, 14), // Example date: April 14, 2023
  },
  {
    id: 9,
    title: "Improve website design",
    suggestion:
      "Update the website design to be more modern and user-friendly.",
    suggester: "Chris Taylor",
    upvotes: 13,
    downvotes: 3,
    status: "accepted",
    date: new Date(2023, 3, 14), // Example date: April 14, 2023
  },
  {
    id: 10,
    title: "Add live chat support",
    suggestion:
      "Implement a live chat feature to provide real-time support to customers.",
    suggester: "Emily Nguyen",
    upvotes: 9,
    downvotes: 1,
    status: "pending",
    date: new Date(2023, 3, 14), // Example date: April 14, 2023
  },
];

export const comments = [
  {
    comment: "Great article!",
    date: "2022-06-12",
    likes: 10,
    dislikes: 2,
    replies: [
      {
        comment: "Thanks for reading!",
        date: "2022-06-13",
        likes: 5,
        dislikes: 1,
        replies: [],
      },
      {
        comment: "I disagree with your point about...",
        date: "2022-06-14",
        likes: 2,
        dislikes: 8,
        replies: [
          {
            comment: "Actually, I think...",
            date: "2022-06-15",
            likes: 3,
            dislikes: 0,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    comment: "This was not helpful at all.",
    date: "2022-06-18",
    likes: 0,
    dislikes: 6,
    replies: [],
  },
  {
    comment: "We keep doing.",
    date: "2023-06-25",
    likes: 10,
    dislikes: 0,
    replies: [],
  },
];
