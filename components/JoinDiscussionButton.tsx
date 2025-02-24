'use client'

export function JoinDiscussionButton() {
  return (
    <button 
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      onClick={() => console.log('ディスカッションに参加')}
    >
      ディスカッションに参加
    </button>
  );
} 