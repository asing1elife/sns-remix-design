import { ChevronLeft, Heart, Info, Search, X } from 'lucide-react';
import { useState } from 'react';
import ParticipantDetailModal from './ParticipantDetailModal';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  status: 'available' | 'busy' | 'offline';
  tags: string[];
  fullBio?: string;
  commonActivities?: number;
  activityScore?: number;
  totalActivities?: number;
  images?: string[];
  interests?: string[];
  isFriend?: boolean;
  mutualFriends?: number;
  photos?: Array<{
    id: string;
    url: string;
    activityTitle: string;
    date: string;
    likes: number;
  }>;
}

interface FriendSelectionPageProps {
  onBack: () => void;
  allFriends: Participant[];
  initialSelected: string[];
  onConfirm: (selectedIds: string[]) => void;
}

// 状态颜色映射
const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return '#10b981'; // 绿色
    case 'busy': return '#f59e0b'; // 橙色
    case 'offline': return '#9ca3af'; // 灰色
    default: return '#9ca3af';
  }
};

// 状态文本映射
const getStatusText = (status: string) => {
  switch (status) {
    case 'available': return '在线';
    case 'busy': return '忙碌';
    case 'offline': return '离线';
    default: return '';
  }
};

function FriendSelectionPage({ onBack, allFriends, initialSelected, onConfirm }: FriendSelectionPageProps) {
  const [selectedFriends, setSelectedFriends] = useState<string[]>(initialSelected);
  const [searchQuery, setSearchQuery] = useState('');
  const [showParticipantDetail, setShowParticipantDetail] = useState<Participant | null>(null);

  // 搜索过滤
  const filteredFriends = allFriends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.tags.some(tag => tag.includes(searchQuery))
  );

  // 切换好友选择
  const toggleFriend = (id: string) => {
    setSelectedFriends(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  // 确认选择
  const handleConfirm = () => {
    onConfirm(selectedFriends);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col" style={{ width: '375px', margin: '0 auto' }}>
      {/* 顶部导航栏 */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-20">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">选择好友</h1>
          <div className="w-8"></div>
        </div>

        {/* 搜索栏 */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索好友姓名、简介或标签"
              className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#f98801] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* 已选择提示 */}
        {selectedFriends.length > 0 && (
          <div className="px-4 pb-2">
            <div className="text-xs text-gray-600">
              已选择 <span className="font-semibold" style={{ color: '#f98801' }}>{selectedFriends.length}</span> 位好友
            </div>
          </div>
        )}
      </div>

      {/* 好友列表 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {filteredFriends.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Search className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">没有找到匹配的好友</p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {filteredFriends.map((friend) => (
              <div key={friend.id} className="relative">
                {/* 好友卡片 - 点击选择/取消选择 */}
                <button
                  onClick={() => toggleFriend(friend.id)}
                  className={`w-full p-3 pr-12 rounded-xl transition-all flex items-center gap-3 ${
                    selectedFriends.includes(friend.id)
                      ? 'bg-[#F0F2FF] ring-2 ring-[#f98801]'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {/* 头像 */}
                  <div className="w-12 h-12 flex-shrink-0 relative">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* 状态指示器 */}
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: getStatusColor(friend.status) }}
                    ></div>
                  </div>

                  {/* 好友信息 */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900">{friend.name}</h4>
                      <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                      <span
                        className="text-xs font-medium"
                        style={{ color: getStatusColor(friend.status) }}
                      >
                        {getStatusText(friend.status)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-1">{friend.bio}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>共同活动 {friend.commonActivities} 次</span>
                    </div>
                  </div>

                  {/* 选中状态指示器（在卡片内） */}
                  {selectedFriends.includes(friend.id) && (
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-[#f98801] bg-[#f98801] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
                
                {/* 查看详情按钮 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowParticipantDetail(friend);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 border border-gray-200"
                  style={{ color: '#f98801' }}
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部确认按钮 */}
      <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 p-4 z-30">
        <button
          onClick={handleConfirm}
          className="w-full py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98]"
          style={{ backgroundColor: '#f98801' }}
        >
          确认选择 ({selectedFriends.length})
        </button>
      </div>

      {/* 参与者详情半屏弹窗 */}
      <ParticipantDetailModal
        participant={showParticipantDetail}
        onClose={() => setShowParticipantDetail(null)}
        onAction={() => {
          setShowParticipantDetail(null);
        }}
      />
    </div>
  );
}

export default FriendSelectionPage;
