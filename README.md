# Venkatesh Kashyap Assessment Project

This project contains API routes for discussions, comments, friends, and replies.

[Postman Collection](https://www.postman.com/science-participant-84749/workspace/assesmentv2/request/36295893-de6966ac-39b5-44a1-9030-4d04d10fae33?action=share&source=copy-link&creator=36295893&ctx=documentation).

# Venkatesh Kashyap Assessment Project

This project contains API routes for discussions, comments, friends, and replies.

## Discussion Routes

### Create Discussion

- **Path:** `api/discussion/createDiscussion`
- **Method:** POST
- **Body:** `text`, `imageUrl`, `hashtag`, `userId`, `username`

### Delete Discussion

- **Path:** `api/discussion/deleteDiscussion`
- **Method:** PUT
- **Body:** `userId`, `postId`

### Get Discussion

- **Path:** `api/discussion/getDiscussion`
- **Method:** GET
- **Search Params:** `keywords`

### Update Discussion

- **Path:** `api/discussion/updateDiscussion`
- **Method:** PUT
- **Body:** `userId`, `postId`, `newText`

### Update Discussion Likes

- **Path:** `api/discussion/updateDiscussionLikes`
- **Method:** PUT
- **Body:** `postId`

## Comments Routes

### Add Comment

- **Path:** `api/comments/addComments`
- **Method:** POST
- **Body:** `userId`, `username`, `postId`, `commentText`

### Delete Comment

- **Path:** `api/comments/deleteComment`
- **Method:** PUT
- **Body:** `userId`, `postId`, `commentId`

### Get Comments

- **Path:** `api/comments/getComments`
- **Method:** GET
- **Search Params:** `postId`

### Update Comment

- **Path:** `api/comments/updateComment`
- **Method:** PUT
- **Body:** `userId`, `postId`, `commentId`, `newText`

### Update Comment Likes

- **Path:** `api/comments/updateLikes`
- **Method:** PUT
- **Body:** `postId`, `commentId`

## Friends Routes

### Add Friend

- **Path:** `api/friends/addFriend`
- **Method:** PUT
- **Body:** `userId`, `username`, `currentUserId`

### Search Friend

- **Path:** `api/friends/searchFriend`
- **Method:** GET
- **Search Params:** `username`

## Replies Routes

### Add Reply

- **Path:** `api/replies/addReply`
- **Method:** POST
- **Body:** `postId`, `commentId`, `replyText`, `userId`, `username`

### Get Replies

- **Path:** `api/replies/getReplies`
- **Method:** GET
- **Search Params:** `postId`
