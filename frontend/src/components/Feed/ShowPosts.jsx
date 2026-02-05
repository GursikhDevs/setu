import { useState, useEffect, useCallback, useRef } from 'react';
import PostMapper from './showPosts/PostMapper';
import axios from 'axios';

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  const observerTarget = useRef(null);

  // Fetch posts from backend
  const fetchPosts = useCallback(async (pageNumber) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API endpoint
      // ${process.env.REACT_APP_API_URL}/posts?page=${pageNumber}&limit=10
      // const response = await fetch(
      //   `http://localhost:3000/posts/feed?page=${pageNumber}&limit=10`,
      //   {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       // Add authorization header if needed
      //       // 'Authorization': `Bearer ${yourAuthToken}`
      //     },
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error('Failed to fetch posts');
      // }

      // const data = await response.json();
      const API=`http://localhost:3000/posts/feed?page=${pageNumber}&limit=10`
      const res =await axios.get(API, {
    withCredentials: true 
});
console.log(res);
const data=res.data;

      
      // Adjust based on API response structure
      const newPosts = data.posts || data.data.posts || data;
      const totalPages = data.total || data.hasNextPage
?.totalPages;
      
      setPosts(prev => [...prev, ...newPosts]);
      setHasMore(pageNumber < totalPages);
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  // Initial fetch
  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading]);

  // Fetch when page changes
  useEffect(() => {
    if (page > 1) {
      fetchPosts(page);
    }
  }, [page, fetchPosts]);

  return (
    <div className='w-full h-full relative overflow-hidden flex justify-center'>
      <div className='w-full h-full px-5 md:px-30 relative flex flex-col gap-5 overflow-x-hidden overflow-y-scroll'>
        <h4 className='text-5xl font-semibold uppercase text-center pt-2'>
          Alumni Posts
        </h4>

        {error && (
          <div className="max-w-2xl mx-auto w-full h-auto text-theme-white flex flex-col justify-center gap-3 bg-transparent border-red-400 px-4 py-2 rounded">
            <p>Please try again in a while.</p>
            <video className='h-full w-auto' src="/videos/error.mp4" muted autoPlay loop></video>
            <button 
              onClick={() => {
                setError(null);
                fetchPosts(page);
              }}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        )}

        <PostMapper posts={posts} />

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Intersection observer target */}
        <div ref={observerTarget} className="h-10" />

        {/* End of posts message */}
        {!hasMore && posts.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>You've reached the end of the posts</p>
          </div>
        )}

        {/* No posts message */}
        {!loading && posts.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            <p>No posts available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowPosts;

















// import React from 'react'
// import MediaPost from './showPosts/MediaPost'
// import TextPost from './showPosts/TextPosts'
// import PostMapper from './showPosts/PostMapper'

// const ShowPosts = () => {

//   const samplePosts = [
//     {
//       id: '1',
//       text: 'Excited to announce that our team just launched a new mentorship program connecting recent graduates with industry veterans! This initiative aims to bridge the gap between academia and professional life. Looking forward to seeing the amazing connections that will be made. 🎓',
//       author: {
//         name: 'Sarah Mitchell',
//         profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
//       },
//       createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
//       reactions: {
//         like: 24,
//         love: 8,
//         insightful: 15,
//         inspiring: 12,
//         celebrate: 18,
//       },
//     },
//     {
//       id: '2',
//       text: 'Throwback to our incredible alumni reunion last weekend! Amazing conversations, inspiring stories, and unforgettable memories.',
//       media: {
//         url: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&h=800&fit=crop',
//         type: 'image',
//       },
//       author: {
//         name: 'Michael Chen',
//         profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
//       },
//       createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
//       reactions: {
//         like: 42,
//         love: 28,
//         insightful: 5,
//         inspiring: 8,
//         celebrate: 35,
//       },
//     },
//     {
//       id: '3',
//       text: 'Just finished reading "The Lean Startup" and it completely changed my perspective on building products. The concept of validated learning is a game-changer for anyone in the startup ecosystem. Highly recommend to fellow entrepreneurs!',
//       author: {
//         name: 'Emily Rodriguez',
//         profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
//       },
//       createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
//       reactions: {
//         like: 18,
//         love: 4,
//         insightful: 22,
//         inspiring: 16,
//         celebrate: 6,
//       },
//     },
//     {
//       id: '4',
//       text: 'Behind the scenes of our latest product photoshoot! Grateful for the talented team that made this happen.',
//       media: {
//         url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
//         type: 'image',
//       },
//       author: {
//         name: 'David Park',
//         profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
//       },
//       createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//       reactions: {
//         like: 31,
//         love: 19,
//         insightful: 3,
//         inspiring: 11,
//         celebrate: 14,
//       },
//     },
//   ];
    
//   return (
//     <div className='w-full h-full relative overflow-hidden flex justify-center'>
//         <div className=' w-full h-full px-5 pb-10 md:px-30 relative flex flex-col gap-5 overflow-x-hidden overflow-y-scroll'>
//             <h4 className='text-5xl font-semibold uppercase text-center pt-2'>Alumni Posts</h4>

//             <PostMapper posts={samplePosts} />
            
//         </div>
//     </div>
//   )
// }

// export default ShowPosts