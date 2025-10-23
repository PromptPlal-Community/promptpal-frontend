// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { PageContainer } from '../../../../components/layout/PageContainer';
// import { Section } from '../../../../components/layout/Section';
// import { Grid, Card, CardContent } from '../../../../components/layout/Grid';
// import { 
//   ArrowLeft,
//   Heart,
//   MessageCircle,
//   Share2,
//   Bookmark,
//   Eye,
//   Award,
//   Calendar,
//   TrendingUp,
//   MoreHorizontal,
//   Flag
// } from 'lucide-react';
// import { useTrends } from '../../../../hooks/useTrends';
// import CommentSection from '../../../../components/dashboard/community/trends/CommentSection';
// import RewardSection from '../../../../components/dashboard/community/trends/RewardSection';

// const TrendDetailsPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { 
//     currentTrend, 
//     loading, 
//     error, 
//     getTrendById, 
//     upvoteTrend, 
//     downvoteTrend,
//     addComment 
//   } = useTrends();

//   const [activeTab, setActiveTab] = useState<'comments' | 'rewards'>('comments');
//   const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     if (id) {
//       getTrendById(id);
//     }
//   }, [id, getTrendById]);

//   const handleUpvote = async () => {
//     if (id) {
//       await upvoteTrend(id);
//     }
//   };

//   const handleAddComment = async () => {
//     if (id && newComment.trim()) {
//       await addComment(id, newComment);
//       setNewComment('');
//     }
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: currentTrend?.title,
//           text: currentTrend?.content,
//           url: window.location.href,
//         });
//       } catch (err) {
//         console.log('Error sharing:', err);
//       }
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(window.location.href);
//       // You might want to show a toast notification here
//     }
//   };

//   const formatNumber = (num: number): string => {
//     if (num >= 1000000) {
//       return (num / 1000000).toFixed(1) + 'M';
//     }
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'K';
//     }
//     return num.toString();
//   };

//   const formatTimeAgo = (date: string): string => {
//     const now = new Date();
//     const past = new Date(date);
//     const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
//     if (diffInSeconds < 60) return 'just now';
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
//     if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
//     return past.toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <PageContainer>
//         <Section>
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
//             <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
//             <div className="h-32 bg-gray-200 rounded mb-8"></div>
//           </div>
//         </Section>
//       </PageContainer>
//     );
//   }

//   if (error || !currentTrend) {
//     return (
//       <PageContainer>
//         <Section>
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">⚠️</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               {error || 'Trend not found'}
//             </h3>
//             <button 
//               onClick={() => navigate('/trends')}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Back to Trends
//             </button>
//           </div>
//         </Section>
//       </PageContainer>
//     );
//   }

//   return (
//     <PageContainer>
//       <Section>
//         {/* Back Button and Navigation */}
//         <div className="flex items-center justify-between mb-6">
//           <button 
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back
//           </button>
          
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={handleShare}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
//             >
//               <Share2 className="w-5 h-5" />
//               Share
//             </button>
//             <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
//               <Bookmark className="w-5 h-5" />
//               Save
//             </button>
//           </div>
//         </div>

//         {/* Main Trend Content */}
//         <Grid cols={1}>
//           <Card>
//             <CardContent className="p-6">
//               {/* Header */}
//               <div className="flex items-start justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//                     {currentTrend.community?.name?.charAt(0) || 'C'}
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <span className="font-semibold text-gray-800">
//                         r/{currentTrend.community?.name}
//                       </span>
//                       <span className="text-gray-400">•</span>
//                       <span className="text-sm text-gray-500">
//                         Posted by {currentTrend.author?.username}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <Calendar className="w-4 h-4" />
//                       <span>{formatTimeAgo(currentTrend.createdAt)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <MoreHorizontal className="w-5 h-5 text-gray-500" />
//                   </button>
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <Flag className="w-5 h-5 text-gray-500" />
//                   </button>
//                 </div>
//               </div>

//               {/* Title and Category */}
//               <div className="mb-6">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
//                     <TrendingUp className="w-4 h-4" />
//                     <span className="text-sm font-semibold">
//                       {currentTrend.category}
//                     </span>
//                   </div>
//                 </div>
                
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">
//                   {currentTrend.title}
//                 </h1>
//               </div>

//               {/* Content */}
//               <div className="prose max-w-none mb-8">
//                 <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
//                   {currentTrend.content}
//                 </div>
//               </div>

//               {/* Tags */}
//               {currentTrend.tags && currentTrend.tags.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {currentTrend.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {/* Stats and Actions */}
//               <div className="flex items-center justify-between pt-6 border-t border-gray-200">
//                 <div className="flex items-center gap-6">
//                   {/* Upvotes */}
//                   <button 
//                     onClick={handleUpvote}
//                     className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
//                   >
//                     <div className="p-2 rounded group-hover:bg-blue-50 transition-colors">
//                       <Heart className="w-5 h-5 group-hover:fill-blue-600" />
//                     </div>
//                     <span className="font-semibold text-lg">
//                       {formatNumber(currentTrend.upvotes?.length || 0)}
//                     </span>
//                   </button>

//                   {/* Comments */}
//                   <button 
//                     onClick={() => setActiveTab('comments')}
//                     className={`flex items-center gap-2 transition-colors ${
//                       activeTab === 'comments' 
//                         ? 'text-green-600' 
//                         : 'text-gray-600 hover:text-green-600'
//                     }`}
//                   >
//                     <div className="p-2 rounded hover:bg-green-50 transition-colors">
//                       <MessageCircle className="w-5 h-5" />
//                     </div>
//                     <span className="font-semibold text-lg">
//                       {formatNumber(currentTrend.commentCount || 0)}
//                     </span>
//                   </button>

//                   {/* Views */}
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <div className="p-2 rounded">
//                       <Eye className="w-5 h-5" />
//                     </div>
//                     <span className="font-semibold text-lg">
//                       {formatNumber(currentTrend.views || 0)}
//                     </span>
//                   </div>

//                   {/* Rewards */}
//                   {currentTrend.totalRewards > 0 && (
//                     <button 
//                       onClick={() => setActiveTab('rewards')}
//                       className={`flex items-center gap-2 transition-colors ${
//                         activeTab === 'rewards' 
//                           ? 'text-yellow-600' 
//                           : 'text-gray-600 hover:text-yellow-600'
//                       }`}
//                     >
//                       <div className="p-2 rounded hover:bg-yellow-50 transition-colors">
//                         <Award className="w-5 h-5" />
//                       </div>
//                       <span className="font-semibold text-lg text-yellow-700">
//                         {formatNumber(currentTrend.totalRewards)}
//                       </span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Comments and Rewards Section */}
//           <Card>
//             <CardContent className="p-6">
//               {/* Tab Navigation */}
//               <div className="flex border-b border-gray-200 mb-6">
//                 <button
//                   onClick={() => setActiveTab('comments')}
//                   className={`px-4 py-2 font-medium border-b-2 transition-colors ${
//                     activeTab === 'comments'
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   Comments ({currentTrend.commentCount || 0})
//                 </button>
//                 {currentTrend.totalRewards > 0 && (
//                   <button
//                     onClick={() => setActiveTab('rewards')}
//                     className={`px-4 py-2 font-medium border-b-2 transition-colors ${
//                       activeTab === 'rewards'
//                         ? 'border-yellow-500 text-yellow-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     Rewards ({currentTrend.rewardCount || 0})
//                   </button>
//                 )}
//               </div>

//               {/* Content based on active tab */}
//               {activeTab === 'comments' ? (
//                 <CommentSection 
//                   trendId={currentTrend._id}
//                   comments={currentTrend.comments || []}
//                   onAddComment={handleAddComment}
//                   newComment={newComment}
//                   setNewComment={setNewComment}
//                 />
//               ) : (
//                 <RewardSection 
//                   rewards={currentTrend.rewards || []}
//                   totalRewards={currentTrend.totalRewards}
//                 />
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Section>
//     </PageContainer>
//   );
// };

// export default TrendDetailsPage;