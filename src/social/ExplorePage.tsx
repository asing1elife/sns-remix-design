import { Calendar, MapPin, Plus, QrCode, Search } from 'lucide-react'
import { useState } from 'react'
import { Activity, allActivities, friendsActivities, hotActivities, rankingActivities, regularActivities } from './activityData'
import ActivityDetailPage from './ActivityDetailPage'
import CreateActivityPage from './CreateActivityPage'
import MyActivitiesPage from './MyActivitiesPage'
import ProfilePage from './ProfilePage'
import SearchPage from './SearchPage'

type FilterType = 'all' | 'hot' | 'ranking' | 'friends' | 'regular';
type PageType = 'explore' | 'activities' | 'profile';

function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('hot');
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [activePage, setActivePage] = useState<PageType>('explore');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showSearchPage, setShowSearchPage] = useState(false);

  const getActivitiesByFilter = (): Activity[] => {
    switch (activeFilter) {
      case 'hot':
        return hotActivities;
      case 'ranking':
        return rankingActivities;
      case 'friends':
        return friendsActivities;
      case 'regular':
        return regularActivities;
      default:
        return allActivities;
    }
  };

  const activities = getActivitiesByFilter();
  
  // 将活动分成左右两列
  const leftColumn: Activity[] = [];
  const rightColumn: Activity[] = [];
  let leftHeight = 0;
  let rightHeight = 0;

  activities.forEach((activity) => {
    if (leftHeight <= rightHeight) {
      leftColumn.push(activity);
      leftHeight += activity.imageHeight + 120; // 图片高度 + 文字内容高度
    } else {
      rightColumn.push(activity);
      rightHeight += activity.imageHeight + 120;
    };
  });

  // 如果显示创建页面，则渲染创建页面
  if (showCreatePage) {
    return <CreateActivityPage onBack={() => setShowCreatePage(false)} />;
  }

  // 如果显示搜索页面
  if (showSearchPage) {
    return <SearchPage onBack={() => setShowSearchPage(false)} />;
  }

  // 如果显示活动详情页
  if (selectedActivity) {
    return (
      <ActivityDetailPage
        activity={{
          id: selectedActivity.id,
          title: selectedActivity.title,
          coverImage: selectedActivity.coverImage,
          venueName: '示例场馆',
          location: selectedActivity.location,
          date: selectedActivity.time.split(' ')[0],
          time: selectedActivity.time,
          status: 'recruiting', // 探索页面的活动都是报名中状态
          type: 'exploring', // 标记为探索模式
          totalParticipants: selectedActivity.maxParticipants,
          confirmedParticipants: selectedActivity.currentParticipants,
          pricePerHour: 50,
          // 添加活动配置信息
          isPrivate: false, // 探索页面的活动都是公开的
          costType: 'aa',
          maxParticipants: selectedActivity.maxParticipants,
          merchantStatus: 'approved', // 探索页面的活动商户已审核通过
          serviceLevel: '精品场地',
          participants: [
            { 
              id: '1', 
              name: '张小明', 
              avatar: 'https://i.pravatar.cc/150?img=1', 
              status: 'confirmed', 
              isFriend: true,
              bio: '运动达人',
              fullBio: '热爱运动和户外活动，经常参加各类团体活动。性格开朗友善，善于营造活跃气氛。',
              totalActivities: 45,
              commonActivities: 12,
              activityScore: 4.9,
              interests: ['篮球', '跑步', '摄影', '旅行'],
              tags: ['活跃'],
              photos: [
                { id: 'p1', url: 'https://picsum.photos/400/400?random=1', activityTitle: '周末篮球赛', date: '2025-11-10', likes: 23 },
                { id: 'p2', url: 'https://picsum.photos/400/500?random=2', activityTitle: '山地徒步', date: '2025-11-05', likes: 18 },
                { id: 'p3', url: 'https://picsum.photos/400/600?random=3', activityTitle: '城市骑行', date: '2025-10-28', likes: 31 },
                { id: 'p4', url: 'https://picsum.photos/500/400?random=4', activityTitle: '羽毛球约战', date: '2025-10-20', likes: 15 },
                { id: 'p5', url: 'https://picsum.photos/400/400?random=5', activityTitle: '周末登山', date: '2025-10-15', likes: 27 },
                { id: 'p6', url: 'https://picsum.photos/600/400?random=6', activityTitle: '夜跑团', date: '2025-10-08', likes: 19 },
                { id: 'p7', url: 'https://picsum.photos/400/500?random=7', activityTitle: '足球友谊赛', date: '2025-10-01', likes: 42 },
                { id: 'p8', url: 'https://picsum.photos/400/400?random=8', activityTitle: '游泳训练', date: '2025-09-25', likes: 21 },
              ]
            },
            { 
              id: '2', 
              name: '李思思', 
              avatar: 'https://i.pravatar.cc/150?img=5', 
              status: 'confirmed', 
              isFriend: true,
              bio: '美食爱好者',
              fullBio: '喜欢探索各种美食，热衷于组织聚餐活动。喜欢交朋友，分享生活乐趣。',
              totalActivities: 28,
              commonActivities: 8,
              activityScore: 4.7,
              interests: ['美食', '烹饪', '咖啡', '电影'],
              tags: ['美食家'],
              photos: [
                { id: 'p9', url: 'https://picsum.photos/400/400?random=9', activityTitle: '美食探店', date: '2025-11-08', likes: 35 },
                { id: 'p10', url: 'https://picsum.photos/400/600?random=10', activityTitle: '烘焙课程', date: '2025-11-01', likes: 28 },
                { id: 'p11', url: 'https://picsum.photos/500/400?random=11', activityTitle: '咖啡品鉴', date: '2025-10-25', likes: 22 },
                { id: 'p12', url: 'https://picsum.photos/400/400?random=12', activityTitle: '火锅聚会', date: '2025-10-18', likes: 45 },
                { id: 'p13', url: 'https://picsum.photos/400/500?random=13', activityTitle: '私房菜', date: '2025-10-10', likes: 33 },
              ]
            },
            { 
              id: '3', 
              name: '王大锤', 
              avatar: 'https://i.pravatar.cc/150?img=3', 
              status: 'pending',
              bio: '摄影师',
              fullBio: '专业摄影师，喜欢用镜头记录生活。热爱户外和旅行，经常参加摄影活动。',
              totalActivities: 52,
              commonActivities: 5,
              activityScore: 4.8,
              interests: ['摄影', '旅行', '徒步', '露营'],
              tags: ['摄影达人'],
              photos: [
                { id: 'p14', url: 'https://picsum.photos/400/600?random=14', activityTitle: '日出摄影', date: '2025-11-12', likes: 67 },
                { id: 'p15', url: 'https://picsum.photos/600/400?random=15', activityTitle: '古镇游', date: '2025-11-03', likes: 54 },
                { id: 'p16', url: 'https://picsum.photos/400/400?random=16', activityTitle: '星空摄影', date: '2025-10-22', likes: 89 },
                { id: 'p17', url: 'https://picsum.photos/400/500?random=17', activityTitle: '风光摄影', date: '2025-10-12', likes: 72 },
              ]
            },
          ],
          organizer: {
            name: '活动组织者',
            avatar: 'https://i.pravatar.cc/150?img=10',
            phone: '138****8888',
          },
        }}
        onBack={() => setSelectedActivity(null)}
      />
    );
  }

  // 如果切换到活动页面
  if (activePage === 'activities') {
    return <MyActivitiesPage onNavigate={setActivePage} />;
  }

  // 如果切换到我的页面
  if (activePage === 'profile') {
    return <ProfilePage onNavigate={setActivePage} />;
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

        {/* 顶部导航栏 */}
        <div className="sticky top-0 bg-white z-20 px-4 pt-16 pb-3 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-3">
            {/* 搜索按钮 */}
            <button 
              onClick={() => setShowSearchPage(true)}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors active:scale-95"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* 右侧按钮组 */}
            <div className="flex items-center gap-2">
              {/* 扫码按钮 */}
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors active:scale-95">
                <QrCode className="w-5 h-5 text-gray-700" />
              </button>
              {/* 创建按钮 */}
              <button 
                onClick={() => setShowCreatePage(true)}
                className="p-2 rounded-full hover:opacity-90 transition-all active:scale-95"
                style={{ backgroundColor: '#f98801' }}
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* 筛选标签 */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveFilter('hot')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === 'hot'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={activeFilter === 'hot' ? { backgroundColor: '#f98801' } : {}}
            >
              热门活动
            </button>
            <button
              onClick={() => setActiveFilter('ranking')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === 'ranking'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={activeFilter === 'ranking' ? { backgroundColor: '#f98801' } : {}}
            >
              排行榜
            </button>
            <button
              onClick={() => setActiveFilter('friends')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === 'friends'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={activeFilter === 'friends' ? { backgroundColor: '#f98801' } : {}}
            >
              老友活动
            </button>
            <button
              onClick={() => setActiveFilter('regular')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === 'regular'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={activeFilter === 'regular' ? { backgroundColor: '#f98801' } : {}}
            >
              定期活动
            </button>
          </div>
        </div>

        {/* 瀑布流活动列表 */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-20">
          <div className="flex gap-3">
            {/* 左列 */}
            <div className="flex-1 space-y-3">
              {leftColumn.map((activity, index) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity}
                  onClick={index === 0 ? () => setSelectedActivity(activity) : undefined}
                  isClickable={index === 0}
                />
              ))}
            </div>
            {/* 右列 */}
            <div className="flex-1 space-y-3">
              {rightColumn.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* 底部导航栏 */}
        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 z-30">
          <div className="flex items-center justify-around px-4 py-2">
            <button 
              onClick={() => setActivePage('explore')}
              className="flex flex-col items-center py-2 px-4 transition-colors" 
              style={{ color: 'explore' === 'explore' ? '#f98801' : '#6B7280' }}
            >
              <Search className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">探索</span>
            </button>
            <button 
              onClick={() => setActivePage('activities')}
              className="flex flex-col items-center py-2 px-4 transition-colors" 
              style={{ color: '#6B7280' }}
            >
              <Calendar className="w-6 h-6 mb-1" />
              <span className="text-xs">活动</span>
            </button>
            <button 
              onClick={() => setActivePage('profile')}
              className="flex flex-col items-center py-2 px-4 transition-colors" 
              style={{ color: '#6B7280' }}
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

// 活动卡片组件
function ActivityCard({ activity, onClick, isClickable }: { activity: Activity; onClick?: () => void; isClickable?: boolean }) {
  return (
    <div 
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
        isClickable ? 'cursor-pointer active:scale-[0.98]' : ''
      }`}
      onClick={onClick}
    >
      {/* 封面图 */}
      <div className="relative" style={{ height: `${activity.imageHeight}px` }}>
        <img
          src={activity.coverImage}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        {/* 热门标识 */}
        {activity.isHot && (
          <div className="absolute top-2 left-2 px-2 py-1 rounded-full flex items-center" style={{ backgroundColor: '#f98801' }}>
            <span className="text-xs text-white font-medium leading-none">热门</span>
          </div>
        )}
        {/* 距离标识 */}
        {activity.distance && (
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm flex items-center">
            <span className="text-xs text-white font-medium leading-none">{activity.distance} 公里</span>
          </div>
        )}
      </div>

      {/* 活动信息 */}
      <div className="p-3">
        {/* 标题 */}
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
          {activity.title}
        </h3>

        {/* 时间 */}
        <div className="flex items-center gap-1 mb-1.5">
          <Calendar className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-600">{activity.time}</span>
        </div>

        {/* 地点 */}
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-600">{activity.location}</span>
        </div>

        {/* 参与人数 */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {activity.currentParticipants}/{activity.maxParticipants}人
          </span>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border-2 border-white bg-gray-300"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
