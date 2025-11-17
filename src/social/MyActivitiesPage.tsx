import { Calendar, ChevronRight, Clock, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import ActivityDetailPage from './ActivityDetailPage';

interface MyActivitiesPageProps {
  onNavigate: (page: 'explore' | 'activities' | 'profile') => void;
}

type ActivityStatus = 'ongoing' | 'completed' | 'cancelled' | 'pending';
type ActivityType = 'organized' | 'participated';

interface MyActivity {
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
}

// 模拟用户活动数据
const myActivities: MyActivity[] = [
  {
    id: '1',
    title: '周末篮球友谊赛',
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
    venueName: '朝阳体育中心',
    location: '朝阳区建国路88号',
    date: '11月20日',
    time: '14:00-16:00',
    status: 'ongoing',
    type: 'organized',
    totalParticipants: 5,
    confirmedParticipants: 3,
    pricePerHour: 200,
  },
  {
    id: '2',
    title: '瑜伽晨练',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    venueName: 'ZEN瑜伽馆',
    location: '海淀区中关村大街1号',
    date: '11月18日',
    time: '07:00-08:00',
    status: 'completed',
    type: 'participated',
    totalParticipants: 3,
    confirmedParticipants: 3,
    pricePerHour: 150,
  },
  {
    id: '3',
    title: '健身房力量训练',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    venueName: '威尔仕健身',
    location: '朝阳区三里屯太古里',
    date: '11月22日',
    time: '18:00-19:00',
    status: 'pending',
    type: 'organized',
    totalParticipants: 4,
    confirmedParticipants: 2,
    pricePerHour: 180,
  },
  {
    id: '4',
    title: '普拉提体态课',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    venueName: 'Pure Yoga',
    location: '东城区王府井大街138号',
    date: '11月15日',
    time: '19:00-20:00',
    status: 'completed',
    type: 'participated',
    totalParticipants: 2,
    confirmedParticipants: 2,
    pricePerHour: 220,
  },
  {
    id: '5',
    title: '羽毛球双打',
    coverImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400',
    venueName: '奥体中心',
    location: '朝阳区北辰西路',
    date: '11月10日',
    time: '15:00-17:00',
    status: 'cancelled',
    type: 'organized',
    totalParticipants: 4,
    confirmedParticipants: 1,
    pricePerHour: 160,
  },
  {
    id: '6',
    title: '周日游泳健身',
    coverImage: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400',
    venueName: '水立方游泳馆',
    location: '朝阳区奥林匹克公园',
    date: '11月24日',
    time: '10:00-11:30',
    status: 'pending',
    type: 'participated',
    totalParticipants: 3,
    confirmedParticipants: 1,
    pricePerHour: 200,
  },
];

function MyActivitiesPage({ onNavigate }: MyActivitiesPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'organized' | 'participated'>('all');
  const [selectedActivity, setSelectedActivity] = useState<MyActivity | null>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);

  const getStatusText = (status: ActivityStatus) => {
    switch (status) {
      case 'ongoing':
        return '进行中';
      case 'completed':
        return '已完成';
      case 'cancelled':
        return '已取消';
      case 'pending':
        return '待确认';
    }
  };

  const getStatusColor = (status: ActivityStatus) => {
    switch (status) {
      case 'ongoing':
        return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'completed':
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
      case 'cancelled':
        return { bg: 'bg-red-100', text: 'text-red-700' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
    }
  };

  const filteredActivities = myActivities.filter(activity => {
    if (activeTab === 'all') return true;
    return activity.type === activeTab;
  });

  const handleActivityClick = (activity: MyActivity) => {
    setSelectedActivity(activity);
    setShowDetailPage(true);
  };

  const handleBackFromDetail = () => {
    setShowDetailPage(false);
    setSelectedActivity(null);
  };

  // Mock participant data for activity detail
  const getMockParticipants = (activity: MyActivity) => [
    {
      id: '1',
      name: '张小明',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'confirmed' as const,
      isFriend: true,
    },
    {
      id: '2',
      name: '李华',
      avatar: 'https://i.pravatar.cc/150?img=2',
      status: activity.status === 'pending' ? 'pending' as const : 'confirmed' as const,
      isFriend: true,
    },
    {
      id: '3',
      name: '王芳',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'confirmed' as const,
      isFriend: false,
    },
    {
      id: '4',
      name: '刘强',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: activity.status === 'cancelled' ? 'declined' as const : 'confirmed' as const,
      isFriend: false,
    },
  ].slice(0, activity.totalParticipants);

  // Show activity detail page
  if (showDetailPage && selectedActivity) {
    return (
      <ActivityDetailPage
        onBack={handleBackFromDetail}
        activity={{
          ...selectedActivity,
          participants: getMockParticipants(selectedActivity),
          organizer: selectedActivity.type === 'participated' ? {
            name: '张小明',
            avatar: 'https://i.pravatar.cc/150?img=1',
            phone: '138****8888',
          } : undefined,
        }}
      />
    );
  }

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

        {/* 顶部标题栏 */}
        <div className="sticky top-0 bg-white z-20 pt-16 pb-3 px-4 shadow-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-4">我的活动</h1>
          
          {/* 标签切换 */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'all'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={activeTab === 'all' ? { backgroundColor: '#f98801' } : {}}
            >
              全部
            </button>
            <button
              onClick={() => setActiveTab('organized')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'organized'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={activeTab === 'organized' ? { backgroundColor: '#f98801' } : {}}
            >
              我发起的
            </button>
            <button
              onClick={() => setActiveTab('participated')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'participated'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={activeTab === 'participated' ? { backgroundColor: '#f98801' } : {}}
            >
              我参与的
            </button>
          </div>
        </div>

        {/* 活动列表 */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-24">
          {filteredActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">暂无活动记录</p>
            </div>
          ) : (
            filteredActivities.map((activity) => {
              const statusColor = getStatusColor(activity.status);
              return (
                <div
                  key={activity.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  onClick={() => handleActivityClick(activity)}
                >
                  <div className="flex gap-3 p-3">
                    {/* 封面图 */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={activity.coverImage}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 活动信息 */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 flex-1 pr-2">
                            {activity.title}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor.bg} ${statusColor.text} whitespace-nowrap`}>
                            {getStatusText(activity.status)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 mb-1">
                          <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span className="text-xs text-gray-600 line-clamp-1">{activity.venueName}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{activity.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{activity.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-600">
                            {activity.confirmedParticipants}/{activity.totalParticipants}人
                            {activity.status === 'pending' && (
                              <span className="text-yellow-600 ml-1">待确认</span>
                            )}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* 角色标识 */}
                  {activity.type === 'organized' && (
                    <div className="px-3 pb-3">
                      <div className="flex items-center justify-between px-3 py-2 bg-blue-50 rounded-lg">
                        <span className="text-xs text-blue-700 font-medium">我是发起人</span>
                        <span className="text-xs text-blue-600">
                          费用: ¥{activity.pricePerHour * activity.confirmedParticipants}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* 待确认提醒 - 仅对参与者且待确认状态显示 */}
                  {activity.type === 'participated' && activity.status === 'pending' && (
                    <div className="px-3 pb-3">
                      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                        <span className="text-xs text-yellow-800 font-semibold">⚡ 待您确认参与</span>
                        <span className="text-xs text-yellow-700 font-medium">
                          点击查看详情
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 底部导航栏 */}
        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200">
          <div className="flex items-center justify-around px-4 py-2">
            <button 
              onClick={() => onNavigate('explore')}
              className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs">探索</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 transition-colors" style={{ color: '#f98801' }}>
              <Calendar className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">活动</span>
            </button>
            <button 
              onClick={() => onNavigate('profile')}
              className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">我的</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyActivitiesPage;
