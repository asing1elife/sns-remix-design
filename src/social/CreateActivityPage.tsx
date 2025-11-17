import { ChevronLeft, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import VenueDetailPage from './VenueDetailPage';

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

function CreateActivityPage({ onBack }: CreateActivityPageProps) {
  const [selectedVenue, setSelectedVenue] = useState<RecommendedVenue | null>(null);

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
        <div className="sticky top-0 bg-white z-20 pt-16 pb-3 px-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">新活动</h1>
            <div className="w-10"></div> {/* 占位元素保持标题居中 */}
          </div>
        </div>

        {/* 页面内容区域 */}
        <div className="flex-1 overflow-y-auto pb-4">
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

          {/* 推荐的附近场所 */}
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

                  {/* 活动信息 */}
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
                      ) : (
                        <span className="text-xs text-gray-500">
                          参与 {venue.participationCount} 次
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateActivityPage;
