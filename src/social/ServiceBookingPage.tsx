import { Calendar, ChevronLeft, Clock, Heart, Info, UserPlus, Users } from 'lucide-react'
import { useState } from 'react'
import BookingPendingPage from './BookingPendingPage'
import ParticipantDetailModal from './ParticipantDetailModal'

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
  photos?: Array<{
    id: string;
    url: string;
    activityTitle: string;
    date: string;
    likes: number;
  }>;
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
    photos: [
      { id: 'f1p1', url: 'https://picsum.photos/400/400?random=41', activityTitle: '晨跑打卡', date: '2025-11-15', likes: 28 },
      { id: 'f1p2', url: 'https://picsum.photos/400/500?random=42', activityTitle: '健身房', date: '2025-11-12', likes: 35 },
      { id: 'f1p3', url: 'https://picsum.photos/500/400?random=43', activityTitle: '马拉松', date: '2025-11-08', likes: 52 },
      { id: 'f1p4', url: 'https://picsum.photos/400/600?random=44', activityTitle: '游泳训练', date: '2025-11-03', likes: 24 },
      { id: 'f1p5', url: 'https://picsum.photos/400/400?random=45', activityTitle: '力量训练', date: '2025-10-28', likes: 31 },
      { id: 'f1p6', url: 'https://picsum.photos/600/400?random=46', activityTitle: '登山', date: '2025-10-20', likes: 45 },
      { id: 'f1p7', url: 'https://picsum.photos/400/500?random=47', activityTitle: '骑行', date: '2025-10-15', likes: 38 },
    ]
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
    photos: [
      { id: 'f2p1', url: 'https://picsum.photos/400/500?random=48', activityTitle: '瑜伽课', date: '2025-11-14', likes: 42 },
      { id: 'f2p2', url: 'https://picsum.photos/400/400?random=49', activityTitle: '冥想静修', date: '2025-11-10', likes: 36 },
      { id: 'f2p3', url: 'https://picsum.photos/500/400?random=50', activityTitle: '茶艺体验', date: '2025-11-05', likes: 29 },
      { id: 'f2p4', url: 'https://picsum.photos/400/600?random=51', activityTitle: '户外瑜伽', date: '2025-10-30', likes: 48 },
      { id: 'f2p5', url: 'https://picsum.photos/400/400?random=52', activityTitle: '普拉提', date: '2025-10-22', likes: 33 },
    ]
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
    photos: [
      { id: 'f3p1', url: 'https://picsum.photos/400/400?random=53', activityTitle: '美食节', date: '2025-11-13', likes: 56 },
      { id: 'f3p2', url: 'https://picsum.photos/400/500?random=54', activityTitle: '烘焙课', date: '2025-11-07', likes: 41 },
      { id: 'f3p3', url: 'https://picsum.photos/500/400?random=55', activityTitle: '餐厅打卡', date: '2025-11-01', likes: 38 },
      { id: 'f3p4', url: 'https://picsum.photos/400/600?random=56', activityTitle: '私房菜', date: '2025-10-25', likes: 44 },
      { id: 'f3p5', url: 'https://picsum.photos/400/400?random=57', activityTitle: '甜品制作', date: '2025-10-18', likes: 52 },
      { id: 'f3p6', url: 'https://picsum.photos/600/400?random=58', activityTitle: '咖啡拉花', date: '2025-10-10', likes: 47 },
    ]
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
    photos: [
      { id: 'r1p1', url: 'https://picsum.photos/400/400?random=61', activityTitle: '晨跑打卡', date: '2025-11-16', likes: 38 },
      { id: 'r1p2', url: 'https://picsum.photos/400/500?random=62', activityTitle: '健身房训练', date: '2025-11-14', likes: 45 },
      { id: 'r1p3', url: 'https://picsum.photos/500/400?random=63', activityTitle: '篮球比赛', date: '2025-11-11', likes: 52 },
      { id: 'r1p4', url: 'https://picsum.photos/400/600?random=64', activityTitle: '登山徒步', date: '2025-11-08', likes: 67 },
      { id: 'r1p5', url: 'https://picsum.photos/400/400?random=65', activityTitle: '户外拓展', date: '2025-11-03', likes: 43 },
      { id: 'r1p6', url: 'https://picsum.photos/600/400?random=66', activityTitle: '马拉松', date: '2025-10-28', likes: 78 },
      { id: 'r1p7', url: 'https://picsum.photos/400/500?random=67', activityTitle: '攀岩体验', date: '2025-10-22', likes: 56 },
      { id: 'r1p8', url: 'https://picsum.photos/400/400?random=68', activityTitle: '骑行活动', date: '2025-10-15', likes: 49 },
    ]
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
    photos: [
      { id: 'r2p1', url: 'https://picsum.photos/400/500?random=69', activityTitle: '瑜伽课程', date: '2025-11-17', likes: 54 },
      { id: 'r2p2', url: 'https://picsum.photos/400/400?random=70', activityTitle: '冥想静修', date: '2025-11-13', likes: 48 },
      { id: 'r2p3', url: 'https://picsum.photos/500/400?random=71', activityTitle: '茶艺品鉴', date: '2025-11-09', likes: 42 },
      { id: 'r2p4', url: 'https://picsum.photos/400/600?random=72', activityTitle: '读书会', date: '2025-11-06', likes: 36 },
      { id: 'r2p5', url: 'https://picsum.photos/400/400?random=73', activityTitle: '户外瑜伽', date: '2025-11-02', likes: 61 },
      { id: 'r2p6', url: 'https://picsum.photos/600/400?random=74', activityTitle: '绘画工作坊', date: '2025-10-27', likes: 39 },
      { id: 'r2p7', url: 'https://picsum.photos/400/500?random=75', activityTitle: '禅修体验', date: '2025-10-20', likes: 45 },
    ]
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
    photos: [
      { id: 'r3p1', url: 'https://picsum.photos/400/400?random=76', activityTitle: '美食节打卡', date: '2025-11-15', likes: 72 },
      { id: 'r3p2', url: 'https://picsum.photos/400/500?random=77', activityTitle: '烘焙课程', date: '2025-11-12', likes: 58 },
      { id: 'r3p3', url: 'https://picsum.photos/500/400?random=78', activityTitle: '日料探店', date: '2025-11-07', likes: 64 },
      { id: 'r3p4', url: 'https://picsum.photos/400/600?random=79', activityTitle: '私房菜聚会', date: '2025-11-04', likes: 81 },
      { id: 'r3p5', url: 'https://picsum.photos/400/400?random=80', activityTitle: '咖啡拉花', date: '2025-10-29', likes: 55 },
      { id: 'r3p6', url: 'https://picsum.photos/600/400?random=81', activityTitle: '西餐制作', date: '2025-10-24', likes: 69 },
    ]
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
    photos: [
      { id: 'r4p1', url: 'https://picsum.photos/400/500?random=82', activityTitle: '普拉提训练', date: '2025-11-16', likes: 47 },
      { id: 'r4p2', url: 'https://picsum.photos/400/400?random=83', activityTitle: '体态矫正', date: '2025-11-13', likes: 52 },
      { id: 'r4p3', url: 'https://picsum.photos/500/400?random=84', activityTitle: '晨跑活动', date: '2025-11-10', likes: 41 },
      { id: 'r4p4', url: 'https://picsum.photos/400/600?random=85', activityTitle: '健康讲座', date: '2025-11-05', likes: 38 },
      { id: 'r4p5', url: 'https://picsum.photos/400/400?random=86', activityTitle: '瑜伽冥想', date: '2025-11-01', likes: 44 },
      { id: 'r4p6', url: 'https://picsum.photos/600/400?random=87', activityTitle: '轻食制作', date: '2025-10-26', likes: 50 },
      { id: 'r4p7', url: 'https://picsum.photos/400/500?random=88', activityTitle: '拉伸课程', date: '2025-10-19', likes: 46 },
    ]
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
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]); // 支持多选
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
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const formattedDate = `${monthNames[selectedDate.fullDate.getMonth()]}${selectedDate.date}日`;
    
    // 构建参与者列表数据
    const participantsData = selectedParticipants.map(id => {
      const participant = allParticipants.find(p => p.id === id);
      if (participant) {
        return {
          id: participant.id,
          name: participant.name,
          avatar: participant.avatar,
          status: 'pending' as const, // 初始状态都是待确认
          isFriend: participant.isFriend,
        };
      }
      return null;
    }).filter(p => p !== null) as Array<{
      id: string;
      name: string;
      avatar: string;
      status: 'pending' | 'confirmed' | 'declined';
      isFriend?: boolean;
    }>;
    
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
          participants: participantsData,
          date: formattedDate,
          time: selectedTime,
        }}
      />
    );
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
            <h1 className="text-lg font-semibold text-gray-900">创建活动</h1>
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

          {/* 邀请好友 */}
          <div className="bg-white p-4 mb-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4" style={{ color: '#f98801' }} />
                邀请好友
              </h3>
              <button
                onClick={() => setShowFriendInvite(!showFriendInvite)}
                className="text-xs font-medium"
                style={{ color: '#f98801' }}
              >
                {showFriendInvite ? '收起' : `查看全部 (${friends.length})`}
              </button>
            </div>
            <div className="space-y-2">
              {(showFriendInvite ? friends : friends.slice(0, 2)).map((friend) => (
                <div key={friend.id} className="relative">
                  <button
                    onClick={() => toggleParticipant(friend.id)}
                    className={`w-full p-3 rounded-xl transition-all flex items-center gap-3 ${
                      selectedParticipants.includes(friend.id)
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
                    <div className="flex-1 text-left pr-8">
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
                  </button>
                  
                  {/* 查看详情按钮 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowParticipantDetail(friend);
                    }}
                    className="absolute top-1/2 -translate-y-1/2 right-3 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
                    style={{ color: '#f98801' }}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 推荐参与者 */}
          <div className="bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: '#f98801' }} />
              推荐参与者
            </h3>
            <div className="space-y-2">
              {recommendedParticipants.map((participant) => (
                <div key={participant.id} className="relative">
                  <button
                    onClick={() => toggleParticipant(participant.id)}
                    className={`w-full p-3 rounded-xl transition-all flex items-center gap-3 ${
                      selectedParticipants.includes(participant.id)
                        ? 'bg-[#F0F2FF] ring-2 ring-[#f98801]'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {/* 头像 */}
                    <div className="w-12 h-12 flex-shrink-0 relative">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* 状态指示器 */}
                      <div
                        className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                        style={{ backgroundColor: getStatusColor(participant.status) }}
                      ></div>
                    </div>

                    {/* 参与者信息 */}
                    <div className="flex-1 text-left pr-8">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900">{participant.name}</h4>
                        <span
                          className="text-xs font-medium"
                          style={{ color: getStatusColor(participant.status) }}
                        >
                          {getStatusText(participant.status)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1 line-clamp-1">{participant.bio}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {participant.commonActivities && participant.commonActivities > 0 && (
                          <span>共同活动 {participant.commonActivities} 次</span>
                        )}
                        {participant.mutualFriends && participant.mutualFriends > 0 && (
                          <span>共同好友 {participant.mutualFriends} 人</span>
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {/* 查看详情按钮 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowParticipantDetail(participant);
                    }}
                    className="absolute top-1/2 -translate-y-1/2 right-3 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
                    style={{ color: '#f98801' }}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部创建活动按钮 */}
        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 p-4 z-30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              已选择 {selectedParticipants.length} 人
            </span>
            <span className="text-sm font-semibold" style={{ color: '#f98801' }}>
              ¥{service.pricePerHour * selectedParticipants.length}
            </span>
          </div>
          <button
            onClick={() => setBookingCompleted(true)}
            className="w-full py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#f98801' }}
            disabled={!selectedTime || selectedParticipants.length === 0}
          >
            {selectedTime && selectedParticipants.length > 0
              ? `创建活动`
              : '请选择时间和参与者'}
          </button>
        </div>

        {/* 参与者详情半屏弹窗 */}
        <ParticipantDetailModal
          participant={showParticipantDetail}
          onClose={() => setShowParticipantDetail(null)}
          onAction={(actionType) => {
            if (actionType === 'message' || actionType === 'call' || actionType === 'addFriend') {
              console.log(`${actionType} action triggered for participant:`, showParticipantDetail?.id);
            }
            // 如果在邀请流程中，可以切换参与者选择状态
            if (showParticipantDetail) {
              toggleParticipant(showParticipantDetail.id);
              setShowParticipantDetail(null);
            }
          }}
        />
      </div>
    </div>
  );
}

export default ServiceBookingPage;
