import {
    Award,
    Bell,
    Calendar,
    ChevronRight,
    CreditCard,
    Heart,
    MapPin,
    Settings,
    Share2,
    Shield,
    TrendingUp,
    Trophy,
    Users
} from 'lucide-react';
interface ProfilePageProps {
  onNavigate: (page: 'explore' | 'activities' | 'profile') => void;
}

interface MenuItem {
  icon: JSX.Element;
  label: string;
  color: string;
  count?: number;
  badge?: string;
  desc?: string;
}

function ProfilePage({ onNavigate }: ProfilePageProps) {
  // 模拟用户数据
  const userProfile = {
    name: '张小明',
    avatar: 'https://i.pravatar.cc/150?img=1',
    level: 'LV.8 社交达人',
    bio: '热爱生活，乐于分享，期待每一次有趣的相遇 ✨',
    stats: {
      activities: 42,
      organized: 18,
      connections: 156,
      interests: 8,
    },
    badges: [
      { id: 1, name: '活跃分子', icon: '⭐', color: '#FFD700' },
      { id: 2, name: '话题王', icon: '💬', color: '#FF6B6B' },
      { id: 3, name: '破冰高手', icon: '🎯', color: '#FF8C42' },
    ],
  };

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: '社交互动',
      items: [
        { icon: <Heart className="w-5 h-5" />, label: '我的收藏', count: 23, color: '#FF6B6B' },
        { icon: <Users className="w-5 h-5" />, label: '我的人脉', count: 156, color: '#006666' },
        { icon: <MapPin className="w-5 h-5" />, label: '兴趣标签', count: 8, color: '#f98801' },
        { icon: <Trophy className="w-5 h-5" />, label: '成就徽章', badge: 'NEW', color: '#F59E0B' },
      ],
    },
    {
      title: '个人动态',
      items: [
        { icon: <TrendingUp className="w-5 h-5" />, label: '社交报告', desc: '本月互动统计', color: '#8B5CF6' },
        { icon: <Award className="w-5 h-5" />, label: '活跃排行', desc: '好友活跃度', color: '#EC4899' },
      ],
    },
    {
      title: '账户管理',
      items: [
        { icon: <CreditCard className="w-5 h-5" />, label: '钱包', desc: '余额 ¥128', color: '#006666' },
        { icon: <Bell className="w-5 h-5" />, label: '消息通知', badge: '3', color: '#F59E0B' },
        { icon: <Shield className="w-5 h-5" />, label: '隐私设置', color: '#6B7280' },
        { icon: <Settings className="w-5 h-5" />, label: '设置', color: '#6B7280' },
      ],
    },
  ];

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

        {/* 个人信息卡片 */}
        <div className="relative pt-16 pb-6 px-4">
          <div 
            className="absolute inset-0 h-64"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          />
          
          <div className="relative">
            {/* 头像和基本信息 */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{userProfile.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                      {userProfile.level}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>

            <p className="text-sm text-white/95 mb-4 font-medium">{userProfile.bio}</p>

            {/* 勋章展示 */}
            <div className="flex gap-2 mb-4">
              {userProfile.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full"
                  style={{ borderLeft: `3px solid ${badge.color}` }}
                >
                  <span className="text-sm">{badge.icon}</span>
                  <span className="text-xs text-white font-medium">{badge.name}</span>
                </div>
              ))}
            </div>

            {/* 数据统计卡片 */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#f98801' }}>
                    {userProfile.stats.activities}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">参与活动</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#006666' }}>
                    {userProfile.stats.organized}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">发起次数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#F59E0B' }}>
                    {userProfile.stats.connections}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">新认识</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#EC4899' }}>
                    {userProfile.stats.interests}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">兴趣圈</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 菜单列表 */}
        <div className="flex-1 overflow-y-auto px-4 pb-24">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                {section.title}
              </h3>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    style={{
                      borderBottom: itemIndex < section.items.length - 1 ? '1px solid #F3F4F6' : 'none',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <div style={{ color: item.color }}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                            {item.badge}
                          </span>
                        )}
                        {item.count !== undefined && (
                          <span className="text-xs text-gray-500">({item.count})</span>
                        )}
                      </div>
                      {item.desc && (
                        <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* 本月社交数据快览 */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              本月数据
            </h3>
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900">11月社交概览</span>
                <button className="text-xs font-medium" style={{ color: '#f98801' }}>
                  查看详情
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">活动参与</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">12 次</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">新认识</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">23 人</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">互动次数</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">156 次</span>
                </div>
              </div>
              
              {/* 进度条 */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">本月社交活跃度</span>
                  <span className="text-xs font-semibold" style={{ color: '#f98801' }}>85%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: '85%',
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 兴趣标签 */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              我的兴趣
            </h3>
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { name: '户外运动', icon: '🏃', color: '#006666' },
                  { name: '艺术展览', icon: '🎨', color: '#8B5CF6' },
                  { name: '咖啡品鉴', icon: '☕', color: '#F59E0B' },
                  { name: '电影', icon: '🎬', color: '#EC4899' },
                  { name: '美食探店', icon: '🍜', color: '#FF6B6B' },
                  { name: '摄影', icon: '📷', color: '#f98801' },
                ].map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full"
                    style={{ 
                      backgroundColor: `${interest.color}15`,
                      border: `1px solid ${interest.color}30`
                    }}
                  >
                    <span className="text-sm">{interest.icon}</span>
                    <span className="text-xs font-medium" style={{ color: interest.color }}>
                      {interest.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 热门活动类型 */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              最近参与
            </h3>
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="space-y-3">
                {[
                  { name: '周末户外徒步', type: '户外', count: 3 },
                  { name: '艺术展打卡', type: '文化', count: 2 },
                  { name: '咖啡馆聚会', type: '休闲', count: 4 },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                    style={{
                      borderBottom: index < 2 ? '1px solid #F3F4F6' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: '#F0F2FF' }}
                      >
                        <Calendar className="w-4 h-4" style={{ color: '#f98801' }} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{activity.name}</div>
                        <div className="text-xs text-gray-500">{activity.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold" style={{ color: '#f98801' }}>
                        {activity.count}次
                      </div>
                      <div className="text-xs text-gray-500">本月</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部导航栏 */}
        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 z-30">
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
            <button
              onClick={() => onNavigate('activities')}
              className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Calendar className="w-6 h-6 mb-1" />
              <span className="text-xs">活动</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 transition-colors" style={{ color: '#f98801' }}>
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-medium">我的</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
