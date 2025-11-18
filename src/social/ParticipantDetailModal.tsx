import { Heart, MessageCircle, Phone, Star, UserPlus, X } from 'lucide-react';

interface ParticipantDetailModalProps {
  participant: {
    id: string;
    name: string;
    avatar: string;
    status?: 'available' | 'busy' | 'offline' | 'confirmed' | 'declined' | 'pending';
    isFriend?: boolean;
    bio?: string;
    fullBio?: string;
    totalActivities?: number;
    commonActivities?: number;
    activityScore?: number;
    interests?: string[];
    tags?: string[];
  } | null;
  onClose: () => void;
  onAction?: (actionType: 'message' | 'call' | 'addFriend') => void;
}

function ParticipantDetailModal({ participant, onClose, onAction }: ParticipantDetailModalProps) {
  if (!participant) return null;

  const handleAction = (actionType: 'message' | 'call' | 'addFriend') => {
    if (onAction) {
      onAction(actionType);
    }
  };

  // 获取状态文本
  const getStatusText = () => {
    if (!participant.status) return null;
    
    switch (participant.status) {
      case 'confirmed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">已确认参加</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">待确认</span>;
      case 'declined':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">已拒绝</span>;
      case 'available':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">可邀请</span>;
      case 'busy':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">繁忙中</span>;
      case 'offline':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">已下线</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="w-[375px] bg-white rounded-t-3xl max-h-[70vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-2 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">参与者详情</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 参与者头部信息 */}
        <div className="p-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={participant.avatar}
                alt={participant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">{participant.name}</h3>
                {participant.isFriend && (
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {getStatusText()}
                {participant.tags && participant.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: '#f98801' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold" style={{ color: '#f98801' }}>
                {participant.totalActivities || 25}
              </div>
              <div className="text-xs text-gray-600 mt-1">参与活动</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold" style={{ color: '#f98801' }}>
                {participant.commonActivities || 8}
              </div>
              <div className="text-xs text-gray-600 mt-1">共同活动</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <div className="text-lg font-bold" style={{ color: '#f98801' }}>
                  {participant.activityScore || 4.8}
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-1">活跃度</div>
            </div>
          </div>

          {/* 详细介绍 */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">个人简介</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {participant.fullBio || participant.bio || '热爱运动和户外活动，经常参加各类团体活动。性格开朗友善，善于营造活跃气氛。希望通过活动认识更多志同道合的朋友。'}
            </p>
          </div>

          {/* 兴趣爱好 */}
          {participant.interests && participant.interests.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">兴趣爱好</h4>
              <div className="flex flex-wrap gap-2">
                {participant.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-3">
            {participant.isFriend ? (
              <>
                <button
                  onClick={() => handleAction('message')}
                  className="flex-1 py-3 rounded-xl border-2 font-semibold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  style={{ borderColor: '#f98801', color: '#f98801' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  发消息
                </button>
                <button
                  onClick={() => handleAction('call')}
                  className="flex-1 py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#f98801' }}
                >
                  <Phone className="w-5 h-5" />
                  打电话
                </button>
              </>
            ) : (
              <button
                onClick={() => handleAction('addFriend')}
                className="flex-1 py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ backgroundColor: '#f98801' }}
              >
                <UserPlus className="w-5 h-5" />
                添加好友
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantDetailModal;
