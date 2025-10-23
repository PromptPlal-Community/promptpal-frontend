import React, { useMemo, useState } from 'react';
import { 
  Send, 
  Share2, 
  Award, 
  MessageCircle,
  MoreHorizontal,
  Flag,
  Reply,
  ArrowBigUp,
  ArrowBigDown
} from 'lucide-react';
import type { Comment as TrendComment } from '../../../../types/trend';

interface CommentSectionProps {
  trendId: string;
  comments: TrendComment[];
  onAddComment: (trendId: string, comment: { content: string; parentComment?: string }) => Promise<void>;
  onUpvoteComment: (commentId: string) => Promise<void>;
  onDownvoteComment: (commentId: string) => Promise<void>;
  onRewardComment: (commentId: string) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
  isSubmitting?: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  trendId,
  comments,
  onAddComment,
  onUpvoteComment,
  onDownvoteComment,
  onRewardComment,
  newComment,
  setNewComment,
  isSubmitting = false
}) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  // Memoized comment processing - flatten comments and replies
  const { validComments, invalidCommentCount } = useMemo(() => {
    const filtered = comments.filter(comment => 
      comment?._id &&
      comment?.author && 
      typeof comment.author === 'object' && 
      comment.author.username &&
      comment.content
    );
    
    return {
      validComments: filtered,
      invalidCommentCount: comments.length - filtered.length
    };
  }, [comments]);

  const getAuthorInitial = (comment: TrendComment): string => {
    return comment.author?.username?.charAt(0).toUpperCase() || '?';
  };

  const getAuthorName = (comment: TrendComment): string => {
    return comment.author?.username || 'Unknown User';
  };

  const getCommentDate = (comment: TrendComment): string => {
    if (!comment.createdAt) return 'Unknown date';
    return new Date(comment.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && !isSubmitting) {
      await onAddComment(trendId, { content: newComment.trim() });
      setNewComment('');
    }
  };

  const handleReplySubmit = async (parentCommentId: string) => {
    if (replyContent.trim() && !isSubmitting) {
      await onAddComment(trendId, { 
        content: replyContent.trim(),
        parentComment: parentCommentId
      });
      setReplyContent('');
      setReplyingTo(null);
      // Expand replies when adding a new reply
      setExpandedReplies(prev => new Set(prev).add(parentCommentId));
    }
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleShareComment = async (comment: TrendComment) => {
    const commentUrl = `${window.location.href}#comment-${comment._id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Comment by ${getAuthorName(comment)}`,
          text: comment.content,
          url: commentUrl,
        });
      } catch (err) {
        console.log('Error sharing comment:', err);
      }
    } else {
      navigator.clipboard.writeText(commentUrl);
    }
  };

  const CommentItem: React.FC<{ 
    comment: TrendComment; 
    depth?: number;
    isReply?: boolean;
  }> = ({ comment, depth = 0, isReply = false }) => {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const showReplies = expandedReplies.has(comment._id);
    const maxDepth = 4;

    return (
      <div 
        id={`comment-${comment._id}`}
        className={`bg-white border border-gray-200 rounded-lg p-4 ${
          isReply ? 'ml-8 border-l-2 border-l-gray-300' : ''
        }`}
        style={{ marginLeft: isReply ? `${depth * 8}px` : '0' }}
      >
        <div className="flex items-start gap-3">
          {/* Comment content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                {getAuthorInitial(comment)}
              </div>
              <span className="font-semibold text-gray-800 truncate text-sm">
                {getAuthorName(comment)}
              </span>
              <span className="text-gray-500 text-xs flex-shrink-0">
                {getCommentDate(comment)}
              </span>
              {comment.isEdited && (
                <span className="text-gray-400 text-xs">(edited)</span>
              )}
            </div>
            
            <p className="text-gray-700 break-words text-sm mb-3">
              {comment.content}
            </p>

            {/* Comment actions */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
          {/* Vote buttons */}
          <div className="flex items-center">
            <button
              onClick={() => onUpvoteComment(comment._id)}
              className="p-1 hover:bg-green-50 rounded transition-colors group"
              title="Upvote"
            >
              <ArrowBigUp className="w-4 h-4 text-gray-500 group-hover:text-purple-600" />
            </button>
            <span className="text-sm font-semibold text-gray-700">
              {formatNumber(comment.voteScore)}
            </span>
            <button
              onClick={() => onDownvoteComment(comment._id)}
              className="p-1 hover:bg-red-50 rounded transition-colors group"
              title="Downvote"
            >
              <ArrowBigDown className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
            </button>
          </div>
              <button
                onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                className="flex items-center gap-1 hover:text-purple-600 transition-colors"
              >
                <Reply className="w-3 h-3" />
                Reply
              </button>
              
              <button
                onClick={() => onRewardComment(comment._id)}
                className="flex items-center gap-1 hover:text-yellow-600 transition-colors"
              >
                <Award className="w-3 h-3" />
                Reward
              </button>
              
              <button
                onClick={() => handleShareComment(comment)}
                className="flex items-center gap-1 hover:text-purple-600 transition-colors"
              >
                <Share2 className="w-3 h-3" />
                Share
              </button>

              <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                <Flag className="w-3 h-3" />
                Report
              </button>

              <button className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                <MoreHorizontal className="w-3 h-3" />
              </button>
            </div>

            {/* Reply form */}
            {replyingTo === comment._id && depth < maxDepth && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={2}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReplySubmit(comment._id)}
                    disabled={!replyContent.trim() || isSubmitting}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Posting...' : 'Reply'}
                  </button>
                </div>
              </div>
            )}

            {/* Replies */}
            {hasReplies && (
              <div className="mt-3">
                <button
                  onClick={() => toggleReplies(comment._id)}
                  className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 transition-colors mb-2"
                >
                  <MessageCircle className="w-3 h-3" />
                  {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                </button>

                {showReplies && (
                  <div className="space-y-3">
                    {comment.replies.map((reply) => (
                      <CommentItem 
                        key={reply._id} 
                        comment={reply} 
                        depth={depth + 1}
                        isReply={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows={3}
          disabled={isSubmitting}
        />
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Posting...' : 'Comment'}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {validComments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
        
        {validComments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        )}

        {/* Show count of invalid comments for debugging */}
        {invalidCommentCount > 0 && (
          <div className="text-center text-sm text-gray-400">
            ({invalidCommentCount} comments with incomplete data)
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;