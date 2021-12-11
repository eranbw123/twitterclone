import React from "react";
import { Comment } from "./comment";
export const CommentList = ({ comments, tweetId, loadTweet }) => {
  return (
    <div>
      {comments.map((comment, index) => {
        return (
          <Comment
            username={comment.user.username}
            timestamp={comment.timestamp}
            content={comment.content}
            key={comment.id}
            id={comment.id}
            tweetId={tweetId}
            loadTweet={loadTweet}
          />
        );
      })}
    </div>
  );
};
