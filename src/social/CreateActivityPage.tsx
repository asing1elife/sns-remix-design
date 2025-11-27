import { ChevronLeft, MapPin, Search, X } from 'lucide-react'
import { useState } from 'react'
import VenueDetailPage from './VenueDetailPage'

interface CreateActivityPageProps {
  onBack: () => void;
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
  description?: string; // 商家简介
  type?: string; // 商家类型
}

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
    description: '精品咖啡体验，提供多种烘焙咖啡豆和专业咖啡师服务',
    type: '推荐',
  },
  {
    id: 'venue-2',
    name: 'MOKA BROS健康餐厅',
    location: '北京市朝阳区三里屯',
    distance: '1.2km',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    isNew: true,
    description: '主打健康轻食，提供沙拉、果汁和有机食材',
    type: '推荐',
  },
  {
    id: 'venue-3',
    name: '超级猩猩健身',
    location: '杭州市西湖区文二路',
    distance: '2.1km',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    participationCount: 5,
    isHot: true,
    description: '零售制健身房，无需办卡，单次付费即可体验',
    type: '推荐',
  },
  {
    id: 'venue-4',
    name: '世纪公园',
    location: '上海市浦东新区锦绣路',
    distance: '3.5km',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    isNew: true,
    description: '上海市中心最大的自然生态公园，适合休闲放松',
    type: '推荐',
  },
  {
    id: 'venue-5',
    name: 'CGV影城',
    location: '深圳市南山区海岸城',
    distance: '1.8km',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    participationCount: 2,
    description: '韩国CGV连锁影院，配备4DX动感座椅和杜比全景声',
    type: '推荐',
  },
  {
    id: 'venue-6',
    name: 'SPACE酒吧',
    location: '上海市静安区南京西路',
    distance: '0.8km',
    coverImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400',
    isHot: true,
    description: '时尚电音酒吧，每周五六有DJ驻场表演',
    type: '酒吧',
  },
  {
    id: 'venue-7',
    name: 'TAXX夜店',
    location: '北京市朝阳区工体北路',
    distance: '1.5km',
    coverImage: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400',
    description: '北京知名夜店，国际DJ阵容，音响设备一流',
    type: '酒吧',
  },
  {
    id: 'venue-8',
    name: '网鱼网咖',
    location: '成都市锦江区春熙路',
    distance: '2.3km',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    isHot: true,
    description: '高端网咖连锁品牌，配备电竞级配置和舒适环境',
    type: '网吧电竞',
  },
  {
    id: 'venue-9',
    name: '杰拉网咖电竞馆',
    location: '广州市天河区天河路',
    distance: '1.9km',
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
    description: '专业电竞馆，定期举办各类电竞赛事和活动',
    type: '网吧电竞',
  },
  {
    id: 'venue-10',
    name: '冠军羽毛球馆',
    location: '深圳市福田区华强北',
    distance: '1.1km',
    coverImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400',
    description: '专业羽毛球场地，提供装备租赁和教练指导服务',
    type: '羽毛球馆',
  },
  {
    id: 'venue-11',
    name: '李宁羽毛球中心',
    location: '上海市徐汇区漕宝路',
    distance: '2.8km',
    coverImage: 'https://images.unsplash.com/photo-1473662712507-19b0c4e79734?w=400',
    isHot: true,
    description: '李宁品牌运营，标准羽联场地，环境优越',
    type: '羽毛球馆',
  },
  {
    id: 'venue-12',
    name: '纯K时尚量贩KTV',
    location: '杭州市上城区延安路',
    distance: '2.5km',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
    description: '高端KTV连锁品牌，音响设备专业，包厢豪华',
    type: 'KTV',
  },
  {
    id: 'venue-13',
    name: 'K歌之王',
    location: '北京市朝阳区建外SOHO',
    distance: '1.3km',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    description: '老牌KTV，歌曲库丰富，服务周到',
    type: 'KTV',
  },
];

// 所有商户数据（用于搜索）
const allVenues: RecommendedVenue[] = recommendedVenues;

// 类型过滤选项
const venueTypes = ['推荐', '酒吧', '网吧电竞', '羽毛球馆', 'KTV'];

function CreateActivityPage({ onBack }: CreateActivityPageProps) {
  const [selectedVenue, setSelectedVenue] = useState<RecommendedVenue | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedType, setSelectedType] = useState('推荐');

  // 搜索过滤
  const filteredVenues = searchQuery.trim()
    ? allVenues.filter(venue => 
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // 类型过滤
  const typeFilteredVenues = recommendedVenues.filter(venue => venue.type === selectedType);

  // 显示的场所列表
  const displayVenues = isSearching && searchQuery.trim() ? filteredVenues : typeFilteredVenues;

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
      <div className="w-[375px] min-h-screen flex flex-col relative" style={{ backgroundColor: '#f8f9fa' }}>
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
          <div className="px-4 pt-4">
            {/* 搜索框 */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="搜索商户名称或地点..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearching(true);
                }}
                onFocus={() => setIsSearching(true)}
                className="w-full pl-10 pr-10 py-2.5 bg-white rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f98801] shadow-sm transition-all"
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

            {/* 如果在搜索模式，显示搜索结果 */}
            {isSearching && searchQuery.trim() ? (
              <>
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
                        className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                      >
                        <div className="flex p-3 gap-3">
                          {/* 封面图 - 固定正方形 */}
                          <div className="w-20 h-20 flex-shrink-0 relative rounded-xl overflow-hidden">
                            <img
                              src={venue.coverImage}
                              alt={venue.name}
                              className="w-full h-full object-cover"
                            />
                            {/* 热门标识 */}
                            {venue.isHot && (
                              <div className="absolute top-1.5 left-1.5 px-1.5 py-1 rounded-full flex items-center" style={{ backgroundColor: '#f98801' }}>
                                <span className="text-[10px] text-white font-medium leading-none">热门</span>
                              </div>
                            )}
                          </div>

                          {/* 商户信息 */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between text-left">
                            <div className="space-y-1.5">
                              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                {venue.name}
                              </h3>
                              <div className="flex items-start gap-1">
                                <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-gray-500 line-clamp-1">
                                  {venue.location}
                                </span>
                              </div>
                              {venue.description && (
                                <p className="text-xs text-gray-400 line-clamp-1">
                                  {venue.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-400">{venue.distance}</span>
                            </div>
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
              </>
            ) : (
              <>
                {/* 类型过滤标签 */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {venueTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={
                          `px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95 flex-shrink-0 ${
                            selectedType === type
                              ? 'text-white shadow-sm'
                              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                          }`
                        }
                        style={selectedType === type ? { backgroundColor: '#f98801' } : {}}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 商户列表 */}
                <div className="space-y-3">
                  {displayVenues.map((venue) => (
                    <button
                      key={venue.id}
                      onClick={() => setSelectedVenue(venue)}
                      className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                    >
                      <div className="flex p-3 gap-3">
                        {/* 封面图 - 固定正方形 */}
                        <div className="w-20 h-20 flex-shrink-0 relative rounded-xl overflow-hidden">
                          <img
                            src={venue.coverImage}
                            alt={venue.name}
                            className="w-full h-full object-cover"
                          />
                          {/* 热门标识 */}
                          {venue.isHot && (
                            <div className="absolute top-1.5 left-1.5 px-1.5 py-1 rounded-full flex items-center" style={{ backgroundColor: '#f98801' }}>
                              <span className="text-[10px] text-white font-medium leading-none">热门</span>
                            </div>
                          )}
                        </div>

                        {/* 商户信息 */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between text-left">
                          <div className="space-y-1.5">
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                              {venue.name}
                            </h3>
                            <div className="flex items-start gap-1">
                              <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-gray-500 line-clamp-1">
                                {venue.location}
                              </span>
                            </div>
                            {venue.description && (
                              <p className="text-xs text-gray-400 line-clamp-1">
                                {venue.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">{venue.distance}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateActivityPage;
