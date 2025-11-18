import { ChevronLeft, MapPin, Search, Star, X } from 'lucide-react'
import { useState } from 'react'
import VenueDetailPage from './VenueDetailPage'

interface CreateActivityPageProps {
  onBack: () => void;
}

// 场所模板数据类型
interface VenueTemplate {
  id: string;
  name: string;
  icon: string;
  coverImage: string;
}

// 推荐活动数据类型
interface RecommendedVenue {
  id: string;
  name: string;
  location: string;
  distance: string;
  coverImage: string;
  isNew?: boolean;
  participationCount?: number;
  isHot?: boolean;
}

// 收藏的场所模板
const favoriteTemplates: VenueTemplate[] = [
  {
    id: 'template-1',
    name: '咖啡厅',
    icon: '☕',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
  },
  {
    id: 'template-2',
    name: '健身房',
    icon: '🏋️',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
  },
  {
    id: 'template-3',
    name: '电影院',
    icon: '🎬',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
  },
  {
    id: 'template-4',
    name: '餐厅',
    icon: '🍽️',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
  },
  {
    id: 'template-5',
    name: '公园',
    icon: '🌳',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
  },
];

// 推荐的附近活动场所
const recommendedVenues: RecommendedVenue[] = [
  {
    id: 'venue-1',
    name: '星巴克甄选烘焙工坊',
    location: '上海市黄浦区南京西路',
    distance: '0.5km',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
    participationCount: 3,
    isHot: true,
  },
  {
    id: 'venue-2',
    name: 'MOKA BROS健康餐厅',
    location: '北京市朝阳区三里屯',
    distance: '1.2km',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    isNew: true,
  },
  {
    id: 'venue-3',
    name: '超级猩猩健身',
    location: '杭州市西湖区文二路',
    distance: '2.1km',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    participationCount: 5,
    isHot: true,
  },
  {
    id: 'venue-4',
    name: '世纪公园',
    location: '上海市浦东新区锦绣路',
    distance: '3.5km',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    isNew: true,
  },
  {
    id: 'venue-5',
    name: 'CGV影城',
    location: '深圳市南山区海岸城',
    distance: '1.8km',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    participationCount: 2,
  },
];

// 所有商户数据（用于搜索）
const allVenues: RecommendedVenue[] = [
  ...recommendedVenues,
  {
    id: 'venue-6',
    name: '瑞幸咖啡',
    location: '上海市静安区南京西路',
    distance: '0.8km',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    participationCount: 8,
  },
  {
    id: 'venue-7',
    name: '乐刻运动健身房',
    location: '北京市海淀区中关村',
    distance: '1.5km',
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    participationCount: 12,
  },
  {
    id: 'venue-8',
    name: '海底捞火锅',
    location: '成都市锦江区春熙路',
    distance: '2.3km',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    participationCount: 15,
    isHot: true,
  },
  {
    id: 'venue-9',
    name: '万达影城',
    location: '广州市天河区天河路',
    distance: '1.9km',
    coverImage: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
    participationCount: 7,
  },
  {
    id: 'venue-10',
    name: '奈雪的茶',
    location: '深圳市福田区华强北',
    distance: '1.1km',
    coverImage: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    participationCount: 4,
  },
  {
    id: 'venue-11',
    name: '纯K时尚量贩KTV',
    location: '上海市徐汇区漕宝路',
    distance: '2.8km',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
    participationCount: 6,
  },
  {
    id: 'venue-12',
    name: '威尔仕健身',
    location: '杭州市上城区延安路',
    distance: '2.5km',
    coverImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400',
    participationCount: 10,
  },
  {
    id: 'venue-13',
    name: '喜茶',
    location: '北京市朝阳区建外SOHO',
    distance: '1.3km',
    coverImage: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    participationCount: 9,
  },
  {
    id: 'venue-14',
    name: '胡桃里音乐酒馆',
    location: '成都市武侯区玉林路',
    distance: '3.2km',
    coverImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400',
    participationCount: 11,
  },
  {
    id: 'venue-15',
    name: '西西弗书店',
    location: '深圳市南山区海岸城',
    distance: '2.0km',
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400',
    participationCount: 3,
  },
];

function CreateActivityPage({ onBack }: CreateActivityPageProps) {
  const [selectedVenue, setSelectedVenue] = useState<RecommendedVenue | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // 搜索过滤
  const filteredVenues = searchQuery.trim()
    ? allVenues.filter(venue => 
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // 显示的场所列表
  const displayVenues = isSearching && searchQuery.trim() ? filteredVenues : recommendedVenues;

  // 如果选中了场所,显示场所详情页
  if (selectedVenue) {
    return (
      <VenueDetailPage
        onBack={() => setSelectedVenue(null)}
        venue={selectedVenue}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-white min-h-screen flex flex-col relative">
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
        <div className="sticky top-0 bg-white z-20 pt-16 pb-3 px-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">新活动</h1>
            <div className="w-10"></div> {/* 占位元素保持标题居中 */}
          </div>

          {/* 搜索框 */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜索商户名称或地点..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(true);
              }}
              onFocus={() => setIsSearching(true)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f98801] focus:bg-white transition-all"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearching(false);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors active:scale-95"
              >
                <X className="w-3.5 h-3.5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* 页面内容区域 */}
        <div className="flex-1 overflow-y-auto pb-4">
          {/* 如果在搜索模式，显示搜索结果 */}
          {isSearching && searchQuery.trim() ? (
            <div className="px-4 pt-4">
              {/* 搜索结果提示 */}
              <div className="mb-3">
                <p className="text-xs text-gray-500">
                  找到 <span className="font-semibold text-gray-700">{filteredVenues.length}</span> 个结果
                </p>
              </div>

              {/* 搜索结果列表 */}
              {displayVenues.length > 0 ? (
                <div className="space-y-3">
                  {displayVenues.map((venue) => (
                    <button
                      key={venue.id}
                      onClick={() => setSelectedVenue(venue)}
                      className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex"
                    >
                      {/* 封面图 */}
                      <div className="w-24 h-24 flex-shrink-0 relative">
                        <img
                          src={venue.coverImage}
                          alt={venue.name}
                          className="w-full h-full object-cover"
                        />
                        {/* 热门标识 */}
                        {venue.isHot && (
                          <div className="absolute top-1 left-1 px-1.5 py-1 rounded-full flex items-center" style={{ backgroundColor: '#f98801' }}>
                            <span className="text-[10px] text-white font-medium leading-none">热门</span>
                          </div>
                        )}
                      </div>

                      {/* 商户信息 */}
                      <div className="flex-1 p-3 flex flex-col justify-between text-left">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                            {venue.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500 line-clamp-1">
                              {venue.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{venue.distance}</span>
                          {venue.isNew ? (
                            <span
                              className="px-2 py-0.5 rounded-full text-xs text-white font-medium"
                              style={{ backgroundColor: '#f98801' }}
                            >
                              新场所
                            </span>
                          ) : venue.participationCount ? (
                            <span className="text-xs text-gray-500">
                              参与 {venue.participationCount} 次
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm text-gray-500 mb-1">未找到相关商户</p>
                  <p className="text-xs text-gray-400">试试搜索其他关键词</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* 收藏的场所模板 */}
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-gray-900">我的收藏</h2>
                  <Star className="w-4 h-4" style={{ color: '#f98801' }} fill="#f98801" />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {favoriteTemplates.map((template) => (
                    <button
                      key={template.id}
                      className="flex-shrink-0 w-24 hover:opacity-80 transition-all active:scale-95"
                    >
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-2 shadow-sm">
                        <img
                          src={template.coverImage}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <span className="text-3xl">{template.icon}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 text-center font-medium">
                        {template.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 分隔线 */}
              <div className="h-2 bg-gray-100"></div>

              {/* 附近推荐 */}
              <div className="px-4 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-gray-900">附近推荐</h2>
                  <MapPin className="w-4 h-4" style={{ color: '#f98801' }} />
                </div>
                <div className="space-y-3">
                  {recommendedVenues.map((venue) => (
                <button
                  key={venue.id}
                  onClick={() => setSelectedVenue(venue)}
                  className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex"
                >
                  {/* 封面图 */}
                  <div className="w-24 h-24 flex-shrink-0 relative">
                    <img
                      src={venue.coverImage}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    {/* 热门标识 */}
                    {venue.isHot && (
                      <div className="absolute top-1 left-1 px-1.5 py-1 rounded-full flex items-center" style={{ backgroundColor: '#f98801' }}>
                        <span className="text-[10px] text-white font-medium leading-none">热门</span>
                      </div>
                    )}
                  </div>

                      {/* 商户信息 */}
                      <div className="flex-1 p-3 flex flex-col justify-between text-left">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                            {venue.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500 line-clamp-1">
                              {venue.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{venue.distance}</span>
                          {venue.isNew ? (
                            <span
                              className="px-2 py-0.5 rounded-full text-xs text-white font-medium"
                              style={{ backgroundColor: '#f98801' }}
                            >
                              新场所
                            </span>
                          ) : venue.participationCount ? (
                            <span className="text-xs text-gray-500">
                              参与 {venue.participationCount} 次
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateActivityPage;
