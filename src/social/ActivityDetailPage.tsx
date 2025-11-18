import { AlertCircle, Calendar, Check, ChevronLeft, Clock, MapPin, MessageCircle, Phone, Send, Share2, ThumbsUp, X } from 'lucide-react'
import { useState } from 'react'
import ActivityReviewPage from './ActivityReviewPage'
import ParticipantDetailModal from './ParticipantDetailModal'

type ActivityStatus = 'ongoing' | 'completed' | 'cancelled' | 'pending';
type ActivityType = 'organized' | 'participated';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  status: 'confirmed' | 'declined' | 'pending';
  isFriend?: boolean;
  bio?: string;
  fullBio?: string;
  totalActivities?: number;
  commonActivities?: number;
  activityScore?: number;
  interests?: string[];
  tags?: string[];
  photos?: Array<{
    id: string;
    url: string;
    activityTitle: string;
    date: string;
    likes: number;
  }>;
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  likes: number;
  isLiked: boolean;
}

interface ActivityDetailPageProps {
  onBack: () => void;
  activity: {
    id: string;
    title: string;
    coverImage: string;
    venueName: string;
    location: string;
    date: string;
    time: string;
    status: ActivityStatus;
    type: ActivityType;
    totalParticipants: number;
    confirmedParticipants: number;
    pricePerHour: number;
    participants: Participant[];
    organizer?: {
      name: string;
      avatar: string;
      phone?: string;
    };
  };
}

function ActivityDetailPage({ onBack, activity }: ActivityDetailPageProps) {
  const [showReviewPage, setShowReviewPage] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: {
        name: '张三',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
      },
      content: '期待这次活动！希望能认识更多朋友 🎉',
      time: '2小时前',
      likes: 12,
      isLiked: false,
    },
    {
      id: '2',
      user: {
        name: '李四',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Li',
      },
      content: '场地不错，上次去过，环境很好',
      time: '5小时前',
      likes: 8,
      isLiked: true,
    },
    {
      id: '3',
      user: {
        name: '王五',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang',
      },
      content: '有人可以拼车吗？我从市中心出发',
      time: '1天前',
      likes: 3,
      isLiked: false,
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
        };
      }
      return comment;
    }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: {
          name: '我',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
        },
        content: newComment,
        time: '刚刚',
        likes: 0,
        isLiked: false,
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const getStatusConfig = (status: ActivityStatus, type: ActivityType) => {
    switch (status) {
      case 'ongoing':
        return {
          title: '活动进行中',
          icon: <Check className="w-8 h-8 text-white" strokeWidth={3} />,
          bgColor: '#10B981',
          description: '活动正在进行，请按时参加',
          showCountdown: true,
        };
      case 'completed':
        return {
          title: '活动已完成',
          icon: <Check className="w-8 h-8 text-white" strokeWidth={3} />,
          bgColor: '#6B7280',
          description: '活动已顺利完成，感谢参与',
          showCountdown: false,
        };
      case 'pending':
        return {
          title: type === 'participated' ? '等待您确认' : '等待确认中',
          icon: <AlertCircle className="w-8 h-8 text-white" strokeWidth={3} />,
          bgColor: '#F59E0B',
          description: type === 'participated' ? '发起人邀请您参加此活动' : '等待参与者确认，请耐心等待',
          showCountdown: false,
        };
      case 'cancelled':
        return {
          title: '活动已取消',
          icon: <X className="w-8 h-8 text-white" strokeWidth={3} />,
          bgColor: '#DC2626',
          description: '活动已取消，如有疑问请联系发起人',
          showCountdown: false,
        };
    }
  };

  const statusConfig = getStatusConfig(activity.status, activity.type);
  const isOrganizer = activity.type === 'organized';
  const isPendingParticipant = activity.status === 'pending' && activity.type === 'participated';

  // 如果显示回顾页面，渲染回顾页面组件
  if (showReviewPage) {
    return (
      <ActivityReviewPage
        onBack={() => setShowReviewPage(false)}
        activity={{
          title: activity.title,
          date: activity.date,
          location: activity.location,
          duration: '2小时30分',
          participantCount: activity.confirmedParticipants,
        }}
      />
    );
  }

  const getParticipantStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'declined':
        return { bg: 'bg-red-100', text: 'text-red-700' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  const getParticipantStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '已确认';
      case 'declined':
        return '已拒绝';
      case 'pending':
        return '待确认';
      default:
        return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-50 min-h-screen flex flex-col relative">
        {/* 状态栏 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-sm z-30">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 20h4v-4H2v4zm6 0h4v-8H8v8zm6 0h4V10h-4v10zm6-18v18h4V2h-4z"/>
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
            </svg>
          </div>
        </div>

        {/* 头部封面图 */}
        <div className="relative">
          <div className="w-full h-56 overflow-hidden">
            <img
              src={activity.coverImage}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          </div>
          
          {/* 返回和分享按钮 */}
          <div className="absolute top-16 left-0 right-0 flex items-center justify-between px-4">
            <button
              onClick={onBack}
              className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-colors active:scale-95">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto pb-24 bg-white">
          {/* 状态提示卡片 - 与内容融合 */}
          <div className="px-4 pt-6 pb-4">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: statusConfig.bgColor }}
              >
                {statusConfig.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{statusConfig.title}</h2>
                <p className="text-xs text-gray-600">
                  {statusConfig.description}
                </p>
              </div>
            </div>
            
            {/* 进行中状态显示倒计时或剩余时间 */}
            {activity.status === 'ongoing' && (
              <div className="px-4 py-2.5 bg-green-50 rounded-xl border border-green-100">
                <p className="text-xs text-green-800 text-center font-medium">
                  ⏰ 还有 1小时30分 结束
                </p>
              </div>
            )}
            
            {/* 待确认状态显示待确认人数 */}
            {activity.status === 'pending' && !isPendingParticipant && (
              <div className="px-4 py-2.5 bg-yellow-50 rounded-xl border border-yellow-100">
                <p className="text-xs text-yellow-800 text-center font-medium">
                  ⏳ {activity.totalParticipants - activity.confirmedParticipants} 人待确认
                </p>
              </div>
            )}
            
            {/* 待我确认状态 - 突出显示 */}
            {isPendingParticipant && (
              <div className="px-4 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300">
                <p className="text-sm text-yellow-900 text-center font-semibold mb-1">
                  ⚡ 请尽快确认是否参加
                </p>
                <p className="text-xs text-yellow-700 text-center">
                  确认后将为您预留场地名额
                </p>
              </div>
            )}
          </div>

          {/* 分隔线 */}
          <div className="h-2 bg-gray-50"></div>

          {/* 活动信息 */}
          <div className="px-4 py-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{activity.title}</h3>
            
            {/* 场地信息 */}
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#F0F2FF' }}
              >
                <MapPin className="w-5 h-5" style={{ color: '#f98801' }} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">活动场所</div>
                <div className="text-sm font-semibold text-gray-900">{activity.venueName}</div>
                <div className="text-xs text-gray-600 mt-1">{activity.location}</div>
              </div>
            </div>

            {/* 时间信息 */}
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#F0F2FF' }}
              >
                <Calendar className="w-5 h-5" style={{ color: '#f98801' }} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">活动时间</div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {activity.date}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {activity.time}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="h-2 bg-gray-50"></div>

          {/* 发起人信息（仅参与者看到） */}
          {!isOrganizer && activity.organizer && (
            <>
              <div className="px-4 py-5">
                <h3 className="text-base font-semibold text-gray-900 mb-3">发起人</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={activity.organizer.avatar}
                      alt={activity.organizer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{activity.organizer.name}</div>
                    <div className="text-xs text-gray-500">活动发起人</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
              <div className="h-2 bg-gray-50"></div>
            </>
          )}

          {/* 参与者列表 */}
          <div className="px-4 py-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900">参与者</h3>
              <span className="text-sm text-gray-500">
                {activity.confirmedParticipants}/{activity.totalParticipants} 人
              </span>
            </div>
            <div className="space-y-2">
              {activity.participants.map((participant) => {
                const statusColor = getParticipantStatusColor(participant.status);
                return (
                  <button
                    key={participant.id}
                    onClick={() => setSelectedParticipant(participant)}
                    className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all active:scale-[0.98] active:bg-gray-100"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{participant.name}</span>
                        {participant.isFriend && (
                          <span className="text-xs text-gray-400">好友</span>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColor.bg} ${statusColor.text}`}>
                      {getParticipantStatusText(participant.status)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 分隔线 */}
          <div className="h-2 bg-gray-50"></div>

          {/* 费用信息 */}
          <div className="px-4 py-5">
            <h3 className="text-base font-semibold text-gray-900 mb-3">费用明细</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">场地费用</span>
                <span className="font-semibold text-gray-900">¥{activity.pricePerHour}/小时</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">确认人数</span>
                <span className="font-semibold text-gray-900">{activity.confirmedParticipants} 人</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900">
                  {isOrganizer ? '总费用' : '我的费用'}
                </span>
                <span className="text-lg font-bold" style={{ color: '#f98801' }}>
                  ¥{isOrganizer 
                    ? activity.pricePerHour * activity.confirmedParticipants 
                    : Math.round(activity.pricePerHour / activity.confirmedParticipants)}
                </span>
              </div>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="h-2 bg-gray-50"></div>

          {/* 评论区 */}
          <div className="px-4 py-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">评论</h3>
              <span className="text-sm text-gray-500">{comments.length} 条</span>
            </div>

            {/* 评论列表 */}
            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900">{comment.user.name}</span>
                      <span className="text-xs text-gray-400">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#f98801] transition-colors"
                    >
                      <ThumbsUp
                        className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-[#f98801] text-[#f98801]' : ''}`}
                      />
                      <span className={comment.isLiked ? 'text-[#f98801]' : ''}>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 评论输入框 */}
            <div className="flex gap-2 items-center bg-gray-50 rounded-full px-4 py-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="说点什么..."
                className="flex-1 bg-transparent text-sm outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment();
                  }
                }}
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="p-1.5 rounded-full transition-all active:scale-95 disabled:opacity-40"
                style={{ 
                  backgroundColor: newComment.trim() ? '#f98801' : '#E5E7EB',
                }}
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="h-2 bg-gray-50"></div>

          {/* 地图 */}
          <div className="px-4 py-5">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: '#f98801' }} />
              位置导航
            </h3>
            <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center mb-3">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">地图组件占位</p>
              </div>
            </div>
            <button
              className="w-full py-2.5 rounded-lg border-2 font-medium text-sm transition-all active:scale-[0.98]"
              style={{ borderColor: '#f98801', color: '#f98801' }}
            >
              打开导航
            </button>
          </div>
        </div>

        {/* 底部操作栏 - 根据状态显示不同按钮 */}
        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 p-4 z-30">
          {activity.status === 'ongoing' && (
            <div className="flex gap-3">
              {isOrganizer ? (
                <>
                  <button
                    className="flex-1 py-3 rounded-xl border-2 font-semibold text-base transition-all active:scale-[0.98]"
                    style={{ borderColor: '#DC2626', color: '#DC2626' }}
                  >
                    结束活动
                  </button>
                  <button
                    className="flex-1 py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98]"
                    style={{ backgroundColor: '#f98801' }}
                  >
                    联系参与者
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="flex-1 py-3 rounded-xl border-2 font-semibold text-base transition-all active:scale-[0.98]"
                    style={{ borderColor: '#f98801', color: '#f98801' }}
                  >
                    联系发起人
                  </button>
                  <button
                    className="flex-1 py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98]"
                    style={{ backgroundColor: '#f98801' }}
                  >
                    签到打卡
                  </button>
                </>
              )}
            </div>
          )}

          {activity.status === 'completed' && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowReviewPage(true)}
                className="flex-1 py-3 rounded-xl border-2 font-semibold text-base transition-all active:scale-[0.98]"
                style={{ borderColor: '#f98801', color: '#f98801' }}
              >
                查看回顾
              </button>
              <button
                className="flex-1 py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98]"
                style={{ backgroundColor: '#f98801' }}
              >
                再来一次
              </button>
            </div>
          )}

          {activity.status === 'pending' && (
            <div className="flex gap-3">
              {isOrganizer ? (
                <>
                  <button
                    className="flex-1 py-3 rounded-xl border-2 font-semibold text-base transition-all active:scale-[0.98]"
                    style={{ borderColor: '#DC2626', color: '#DC2626' }}
                  >
                    取消活动
                  </button>
                  <button
                    className="flex-1 py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98]"
                    style={{ backgroundColor: '#f98801' }}
                  >
                    催促确认
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="flex-1 py-3 rounded-xl border-2 font-semibold text-base transition-all active:scale-[0.98] hover:bg-red-50"
                    style={{ borderColor: '#DC2626', color: '#DC2626' }}
                  >
                    ✕ 拒绝参与
                  </button>
                  <button
                    className="flex-1 py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98] shadow-lg"
                    style={{ backgroundColor: '#f98801' }}
                  >
                    ✓ 确认参与
                  </button>
                </>
              )}
            </div>
          )}

          {activity.status === 'cancelled' && (
            <button
              onClick={onBack}
              className="w-full py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98]"
              style={{ backgroundColor: '#6B7280' }}
            >
              返回列表
            </button>
          )}
        </div>

        {/* 参与者详情半屏弹窗 */}
        <ParticipantDetailModal
          participant={selectedParticipant}
          onClose={() => setSelectedParticipant(null)}
          onAction={(actionType) => {
            console.log(`${actionType} action triggered for participant:`, selectedParticipant?.id);
            setSelectedParticipant(null);
          }}
        />
      </div>
    </div>
  );
}

export default ActivityDetailPage;
