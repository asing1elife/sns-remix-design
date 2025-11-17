import { ChevronLeft, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import ServiceBookingPage from './ServiceBookingPage';

interface VenueDetailPageProps {
  onBack: () => void;
  venue: {
    id: string;
    name: string;
    location: string;
    distance: string;
    coverImage: string;
  };
}

// 场所服务/活动类型
interface VenueService {
  id: string;
  name: string;
  coverImage: string;
  pricePerHour: number;
  amenities: string[];
  level: string;
}

// 模拟场所详细信息
const venueDetail = {
  description: '优质的咖啡体验空间，提供精品咖啡和舒适的工作环境',
  images: [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400',
  ],
};

// 场所提供的服务
const venueServices: VenueService[] = [
  {
    id: 'service-1',
    name: '标准座位',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
    pricePerHour: 20,
    amenities: ['免费WiFi', '插座'],
    level: '基础',
  },
  {
    id: 'service-2',
    name: 'VIP包间',
    coverImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    pricePerHour: 80,
    amenities: ['独立空间', '高速WiFi', '茶水服务'],
    level: '高级',
  },
  {
    id: 'service-3',
    name: '会议室',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    pricePerHour: 150,
    amenities: ['投影设备', '白板', '茶水服务'],
    level: '商务',
  },
  {
    id: 'service-4',
    name: '露台座位',
    coverImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400',
    pricePerHour: 35,
    amenities: ['户外景观', '免费WiFi'],
    level: '舒适',
  },
];

function VenueDetailPage({ onBack, venue }: VenueDetailPageProps) {
  const [selectedService, setSelectedService] = useState<VenueService | null>(null);

  // 如果选中了服务,显示预约页面
  if (selectedService) {
    return (
      <ServiceBookingPage
        onBack={() => setSelectedService(null)}
        service={selectedService}
        venueName={venue.name}
        venueLocation={venue.location}
        venueDistance={venue.distance}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-50 min-h-screen flex flex-col relative">
        {/* 状态栏 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-sm z-10">
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

        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="absolute top-16 left-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto">
          {/* 上部分：场所信息 */}
          <div className="bg-white">
            {/* 主图片 */}
            <div className="relative h-48">
              <img
                src={venue.coverImage}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 场所名称和介绍 */}
            <div className="p-4">
              <h1 className="text-xl font-bold text-gray-900 mb-2">{venue.name}</h1>
              <div className="flex items-center gap-1 text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{venue.location}</span>
                <span className="text-sm text-gray-400">· {venue.distance}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{venueDetail.description}</p>
            </div>

            {/* 场所图片展示 */}
            <div className="px-4 pb-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {venueDetail.images.map((image, index) => (
                  <div key={index} className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt={`场所图片 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 中间部分：地图组件 */}
          <div className="mt-2 bg-white p-4">
            <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: '#f98801' }} />
              位置信息
            </h2>
            <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">地图组件占位</p>
              </div>
            </div>
          </div>

          {/* 下部分：推荐服务 */}
          <div className="mt-2 bg-white p-4 pb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" style={{ color: '#f98801' }} fill="#f98801" />
              推荐服务
            </h2>
            <div className="space-y-3">
              {venueServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="w-full bg-gray-50 rounded-2xl overflow-hidden hover:bg-gray-100 transition-all active:scale-[0.98] flex h-24"
                >
                  {/* 封面图 */}
                  <div className="w-24 h-full flex-shrink-0">
                    <img
                      src={service.coverImage}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 服务信息 */}
                  <div className="flex-1 p-3 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900">{service.name}</h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: '#f98801',
                            color: 'white',
                          }}
                        >
                          {service.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-sm font-semibold" style={{ color: '#f98801' }}>
                          ¥{service.pricePerHour}
                        </span>
                        <span className="text-xs text-gray-400">/小时</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
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

export default VenueDetailPage;
