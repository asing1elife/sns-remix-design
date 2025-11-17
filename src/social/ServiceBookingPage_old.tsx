import { Calendar, ChevronLeft, Clock, Heart, Info, Star, Users, UserPlus, X } from 'lucide-react'
import { useState } from 'react'
import BookingPendingPage from './BookingPendingPage'

interface ServiceBookingPageProps {
  onBack: () => void;
  service: {
    id: string;
    name: string;
    coverImage: string;
    pricePerHour: number;
    amenities: string[];
    level: string;
  };
  venueName: string;
  venueLocation?: string;
  venueDistance?: string;
}

// 活动参与者数据类型
interface Participant {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  status: 'available' | 'busy' | 'offline';
  tags: string[];
  fullBio?: string;
  commonActivities?: number; // 共同参与活动次数
  activityScore?: number; // 活动活跃度评分
  totalActivities?: number; // 总参与活动次数
  images?: string[];
  interests?: string[]; // 兴趣爱好
  isFriend?: boolean; // 是否为好友
  mutualFriends?: number; // 共同好友数
}

// 好友列表（用于邀请）
const friends: Participant[] = [
  {
    id: 'friend-1',
    name: '小王',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: '健身达人，喜欢挑战新事物',
    status: 'available',
    tags: ['活跃'],
    isFriend: true,
    commonActivities: 8,
    totalActivities: 25,
    activityScore: 4.7,
    interests: ['健身', '跑步', '游泳'],
  },
  {
    id: 'friend-2',
    name: '小李',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    bio: '瑜伽爱好者，追求身心平衡',
    status: 'available',
    tags: ['温柔'],
    isFriend: true,
    commonActivities: 5,
    totalActivities: 18,
    activityScore: 4.5,
    interests: ['瑜伽', '冥想', '茶道'],
  },
  {
    id: 'friend-3',
    name: '张三',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    bio: '美食探索者，运动后必打卡',
    status: 'busy',
    tags: ['有趣'],
    isFriend: true,
    commonActivities: 3,
    totalActivities: 12,
    activityScore: 4.2,
    interests: ['美食', '烘焙', '摄影'],
  },
];

// 系统推荐的参与者
const recommendedParticipants: Participant[] = [
  {
    id: 'participant-1',
    name: '李明',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: '运动爱好者，喜欢健身和户外活动',
    status: 'available',
    tags: ['活跃', '靠谱'],
    fullBio: '热爱运动和户外活动，经常参加各类团体活动。性格开朗友善，善于营造活跃气氛。希望通过活动认识更多志同道合的朋友。',
    commonActivities: 3,
    activityScore: 4.8,
    totalActivities: 45,
    mutualFriends: 2,
    interests: ['健身', '篮球', '登山', '摄影'],
    isFriend: false,
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400',
    ],
  },
  {
    id: 'participant-2',
    name: '王芳',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: '瑜伽爱好者，享受宁静的时光',
    status: 'available',
    tags: ['温柔', '靠谱'],
    fullBio: '热爱瑜伽和冥想，喜欢通过运动找到内心的平静。平时也喜欢读书、喝茶、画画。希望认识更多注重生活质量的朋友。',
    commonActivities: 5,
    activityScore: 4.9,
    totalActivities: 32,
    mutualFriends: 1,
    interests: ['瑜伽', '读书', '茶道', '绘画'],
    isFriend: false,
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400',
    ],
  },
  {
    id: 'participant-3',
    name: '张明',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: '美食探店达人，喜欢尝试新鲜事物',
    status: 'busy',
    tags: ['美食', '有趣'],
    fullBio: '美食爱好者，经常组织探店活动。喜欢尝试各国料理，对美食有独特的见解。性格幽默风趣，是聚会的开心果。',
    commonActivities: 2,
    activityScore: 4.7,
    totalActivities: 28,
    mutualFriends: 3,
    interests: ['美食', '烘焙', '旅行', '摄影'],
    isFriend: false,
    images: [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400',
    ],
  },
  {
    id: 'participant-4',
    name: '刘佳佳',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: '普拉提爱好者，注重健康生活',
    status: 'available',
    tags: ['健康', '积极'],
    fullBio: '热爱普拉提和体态训练，关注身体健康。平时喜欢分享健康生活方式，希望帮助更多人改善体态。',
    commonActivities: 1,
    activityScore: 4.9,
    totalActivities: 38,
    mutualFriends: 0,
    interests: ['普拉提', '瑜伽', '跑步', '冥想'],
    isFriend: false,
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400',
      'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=400',
    ],
  },
];

// 可预约的日期（接下来7天）
const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      date: date.getDate(),
      day: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
      fullDate: date,
    });
  }
  return dates;
};

// 可预约的时间段
const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00',
];

function ServiceBookingPage({ onBack, service, venueName, venueLocation, venueDistance }: ServiceBookingPageProps) {
  const availableDates = getAvailableDates();
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]); // 改为数组支持多选
  const [showParticipantDetail, setShowParticipantDetail] = useState<Participant | null>(null);
  const [showFriendInvite, setShowFriendInvite] = useState(false);
  const [bookingCompleted, setBookingCompleted] = useState(false);

  // 所有参与者（好友+推荐）
  const allParticipants = [...friends, ...recommendedParticipants];

  // 切换参与者选择
  const toggleParticipant = (id: string) => {
    setSelectedParticipants(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  // 如果预约完成，显示待审核页面
  if (bookingCompleted && selectedTime && selectedParticipants.length > 0) {
    const firstParticipant = allParticipants.find(p => p.id === selectedParticipants[0]);
    if (firstParticipant) {
      const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      const formattedDate = `${monthNames[selectedDate.fullDate.getMonth()]}${selectedDate.date}日`;
      
      return (
        <BookingPendingPage
          onBack={onBack}
          bookingInfo={{
            venue: {
              name: venueName,
              location: venueLocation || '位置信息未提供',
              distance: venueDistance || '',
            },
            service: {
              name: service.name,
              level: service.level,
              pricePerHour: service.pricePerHour,
            },
            expert: {
              name: firstParticipant.name,
              avatar: firstParticipant.avatar,
              rating: firstParticipant.activityScore,
            },
            date: formattedDate,
            time: selectedTime,
          }}
        />
      );
    }
  }

  const getStatusText = (status: Participant['status']) => {
    switch (status) {
      case 'available':
        return '可邀请';
      case 'busy':
        return '繁忙中';
      case 'offline':
        return '已下线';
    }
  };

  const getStatusColor = (status: Participant['status']) => {
    switch (status) {
      case 'available':
        return '#10B981';
      case 'busy':
        return '#F59E0B';
      case 'offline':
        return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-50 min-h-screen flex flex-col relative">
        {/* 状态栏 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-gray-800 text-sm z-10">
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

        {/* 顶部导航栏 */}
        <div className="sticky top-0 bg-white z-20 pt-16 pb-3 px-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">预约服务</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto pb-24">
          {/* 选择的服务信息 */}
          <div className="bg-white p-4 mb-2">
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={service.coverImage}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-base font-semibold text-gray-900">{service.name}</h2>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: '#f98801' }}
                  >
                    {service.level}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{venueName}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: '#f98801' }}>
                    ¥{service.pricePerHour}
                  </span>
                  <span className="text-xs text-gray-400">/小时</span>
                </div>
              </div>
            </div>
          </div>

          {/* 日期选择 */}
          <div className="bg-white p-4 mb-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: '#f98801' }} />
              选择日期
            </h3>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 w-14 py-2 rounded-xl text-center transition-all ${
                    selectedDate.date === date.date
                      ? 'text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  style={
                    selectedDate.date === date.date
                      ? { backgroundColor: '#f98801' }
                      : {}
                  }
                >
                  <div className="text-xs mb-1">周{date.day}</div>
                  <div className="text-lg font-semibold">{date.date}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 时间选择 */}
          <div className="bg-white p-4 mb-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: '#f98801' }} />
              选择时间
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded-lg text-sm transition-all ${
                    selectedTime === time
                      ? 'text-white font-medium'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  style={
                    selectedTime === time
                      ? { backgroundColor: '#f98801' }
                      : {}
                  }
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* 推荐达人 */}
          <div className="bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">推荐达人</h3>
            <div className="space-y-3">
              {experts.map((expert) => (
                <div key={expert.id} className="relative">
                  <button
                    onClick={() => setSelectedExpert(expert.id)}
                    className={`w-full p-3 rounded-xl transition-all flex items-center gap-3 ${
                      selectedExpert === expert.id
                        ? 'bg-[#F0F2FF] ring-2 ring-[#f98801]'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {/* 头像 */}
                    <div className="w-12 h-12 flex-shrink-0 relative">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={expert.avatar}
                          alt={expert.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* 状态指示器 */}
                      <div
                        className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                        style={{ backgroundColor: getStatusColor(expert.status) }}
                      ></div>
                    </div>

                    {/* 达人信息 */}
                    <div className="flex-1 text-left pr-8">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900">{expert.name}</h4>
                        <span
                          className="text-xs font-medium"
                          style={{ color: getStatusColor(expert.status) }}
                        >
                          {getStatusText(expert.status)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-1">{expert.bio}</p>
                      <div className="flex gap-1 flex-wrap">
                        {expert.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-white rounded-full text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                  
                  {/* 查看详情按钮 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowExpertDetail(expert);
                    }}
                    className="absolute top-1/2 -translate-y-1/2 right-3 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 z-10"
                    style={{ color: '#f98801' }}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部预约按钮 */}
        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 p-4">
          <button
            onClick={() => setBookingCompleted(true)}
            className="w-full py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#f98801' }}
            disabled={!selectedTime || !selectedExpert}
          >
            {selectedTime && selectedExpert
              ? `确认预约 ¥${service.pricePerHour}`
              : '请选择时间和达人'}
          </button>
        </div>

        {/* 达人详情半屏弹窗 */}
        {showExpertDetail && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setShowExpertDetail(null)}
          >
            <div
              className="w-[375px] bg-white rounded-t-3xl max-h-[70vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 关闭按钮 */}
              <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-2 flex items-center justify-between border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">达人详情</h2>
                <button
                  onClick={() => setShowExpertDetail(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* 达人头部信息 */}
              <div className="p-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 relative">
                    <img
                      src={showExpertDetail.avatar}
                      alt={showExpertDetail.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white"
                      style={{ backgroundColor: getStatusColor(showExpertDetail.status) }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{showExpertDetail.name}</h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: getStatusColor(showExpertDetail.status) + '20',
                          color: getStatusColor(showExpertDetail.status),
                        }}
                      >
                        {getStatusText(showExpertDetail.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{showExpertDetail.rating}</span>
                        <span className="text-gray-400">({showExpertDetail.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span>{showExpertDetail.experience}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {showExpertDetail.tags.map((tag, index) => (
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
                      {showExpertDetail.completedSessions}+
                    </div>
                    <div className="text-xs text-gray-600 mt-1">完成课程</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-lg font-bold" style={{ color: '#f98801' }}>
                      {showExpertDetail.reviewCount}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">学员评价</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <ThumbsUp className="w-4 h-4" style={{ color: '#f98801' }} />
                      <span className="text-lg font-bold" style={{ color: '#f98801' }}>
                        98%
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">好评率</div>
                  </div>
                </div>

                {/* 详细介绍 */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">个人简介</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{showExpertDetail.fullBio}</p>
                </div>

                {/* 专业领域 */}
                {showExpertDetail.specialties && showExpertDetail.specialties.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">专业领域</h4>
                    <div className="flex flex-wrap gap-2">
                      {showExpertDetail.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-700"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 达人图片 */}
                {showExpertDetail.images && showExpertDetail.images.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">风采展示</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {showExpertDetail.images.map((image, index) => (
                        <div key={index} className="aspect-square rounded-xl overflow-hidden">
                          <img
                            src={image}
                            alt={`达人图片 ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 选择按钮 */}
                <button
                  onClick={() => {
                    setSelectedExpert(showExpertDetail.id);
                    setShowExpertDetail(null);
                  }}
                  className="w-full py-3 rounded-xl text-white font-semibold transition-all active:scale-[0.98]"
                  style={{ backgroundColor: '#f98801' }}
                >
                  选择该达人
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceBookingPage;
