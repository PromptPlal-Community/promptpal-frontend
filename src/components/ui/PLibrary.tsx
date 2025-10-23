import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { PromptCard } from "../dashboard/library";
import { mockPrompts } from "../../types/mockPrompts";
import { usePrompts } from "../../hooks/usePrompts";
import { useState } from "react";


interface LibraryProps {
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onDownload?: (id: string) => void;
  onCopy?: (id: string) => void;
  onView?: (id: string) => void;
  onShare?: (id: string) => void;

}

const  PLibrary: React.FC<LibraryProps> = ({
  onFavorite,
  onDownload,
  onCopy,
  onView,
  onShare,
}) => {

  const { 
    prompts, 
    upvotePrompt,
    downvotePrompt,
    favoritePrompt,
    incrementPromptViews 
  } = usePrompts();

    const [localInteractions, setLocalInteractions] = useState<{
      [key: string]: {
        liked: boolean;
        favorited: boolean;
      }
    }>({});

  const handleLike = async (id: string) => {
  try {
    await upvotePrompt(id);
    setLocalInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        liked: true,
        disliked: false
      }
    }));
  } catch (error) {
    console.error('Failed to like prompt:', error);
    setLocalInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        liked: false
      }
    }));
  }
};

const handleDislike = async (id: string) => {
  try {
    await downvotePrompt(id);
    // Update local interactions state for optimistic UI
    setLocalInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        liked: false,
        disliked: true
      }
    }));
  } catch (error) {
    console.error('Failed to dislike prompt:', error);
    setLocalInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        disliked: false
      }
    }));
  }
};

  // Handle favorite with optimistic update
  const handleFavorite = async (id: string) => {
    const currentFavorited = localInteractions[id]?.favorited;
    
    // Optimistic update
    setLocalInteractions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        favorited: !currentFavorited
      }
    }));

    try {
      await favoritePrompt(id);
      // Call external handler if provided
      if (onFavorite) {
        onFavorite(id);
      }
    } catch (error) {
      // Revert optimistic update on error
      setLocalInteractions(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          favorited: currentFavorited
        }
      }));
      console.error('Failed to favorite prompt:', error);
    }
  };

  // Handle download
  const handleDownload = async (id: string) => {
    try {
      const prompt = prompts.find(p => p._id === id);
      if (!prompt) return;

      // Create a downloadable text file
      const content = `Prompt: ${prompt.title}\n\n${prompt.promptText}\n\nCategory: ${prompt.category}\nTags: ${prompt.tags?.join(', ')}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${prompt.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Call external handler if provided
      if (onDownload) {
        onDownload(id);
      }
    } catch (error) {
      console.error('Failed to download prompt:', error);
    }
  };

  // Handle copy to clipboard
  const handleCopy = async (id: string) => {
    try {
      const prompt = prompts.find(p => p._id === id);
      if (!prompt) return;

      await navigator.clipboard.writeText(prompt.promptText);
      
      // Call external handler if provided
      if (onCopy) {
        onCopy(id);
      }

      // You could show a toast notification here
      console.log('Prompt copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  // Handle view
  const handleView = async (id: string) => {
    try {
      await incrementPromptViews(id);
      
      // Call external handler if provided
      if (onView) {
        onView(id);
      }
    } catch (error) {
      console.error('Failed to increment views:', error);
    }
  };

  // Handle share
  const handleShare = async (id: string) => {
    try {
      const prompt = prompts.find(p => p._id === id);
      if (!prompt) return;

      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share({
          title: prompt.title,
          text: prompt.description,
          url: `${window.location.origin}/prompts/${id}`,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${window.location.origin}/prompts/${id}`);
        console.log('Prompt link copied to clipboard!');
      }

      // Call external handler if provided
      if (onShare) {
        onShare(id);
      }
    } catch (error) {
      console.error('Failed to share prompt:', error);
    }
  };


  return (
    <section className=" pLibrary py-16 bg-white text-gray-800">
      <div className="container mx-auto px-6 flex flex-col ">
        <div className=" flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-[#270450] mb-4">
            Our Prompt Library
          </h2>
          <p className="text mb-12 text-lg text-gray-600 items-center justify-center">
            A curated collection of ready-to-use prompts to save time and spark
            creativity. Get proven, structured prompts for writing, design,
            brainstorming, and more.
          </p>
          <form className="mt-6">
            <div className="flex items-center justify-center border border-gray-300 rounded-4xl px-4 py-3 mb-8 max-w-2xl w-90">
              <FaSearch className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Find Prompts"
                className="outline-none w-full"
              />
            </div>
          </form>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Use the new PromptCard component with the first 3 mock prompts */}
          {mockPrompts.slice(0, 3).map((prompt) => (
            <div key={prompt._id} className="prompt-card-wrapper">
                <PromptCard
                  key={prompt._id}
                  prompt={prompt}
                  onLike={() => handleLike(prompt._id)}
                  onDislike={() => handleDislike(prompt._id)}
                  onFavorite={() => handleFavorite(prompt._id)}
                  onDownload={() => handleDownload(prompt._id)}
                  onCopy={() => handleCopy(prompt._id)}
                  onView={() => handleView(prompt._id)}
                  onShare={() => handleShare(prompt._id)}
                  interactions={localInteractions[prompt._id]}
                />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Link
            to="/register"
            className="inline-block px-6 py-3 bg-[#270450] text-white rounded-lg font-semibold shadow hover:bg-[#270450]/80"
          >
            Browse all prompts
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PLibrary;
