import { AlertCircle, Calendar, Check, ChevronLeft, Clock, Lock, MapPin, Users } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  status: 'pending' | 'confirmed' | 'declined';
  isFriend?: boolean;
}

interface BookingPendingPageProps {
  onBack: () => void;
  bookingInfo: {
    venue: {
      name: string;
      location: string;
      distance: string;
    };
    service: {
      name: string;
      level: string;
      pricePerHour: number;
    };
    participants: Participant[];
    date: string;
    time: string;
    isPrivate?: boolean; // 是否私密活动
    costType?: 'aa' | 'free' | 'organizer'; // 费用类型
    maxParticipants?: number; // 最大参与人数
    merchantStatus?: 'pending' | 'approved' | 'rejected'; // 商户审核状态
  };
}

function BookingPendingPage({ onBack, bookingInfo }: BookingPendingPageProps) {
  // 获取商户审核状态文本和颜色
  const getMerchantStatusInfo = (status?: string) => {
    switch (status) {
      case 'approved':
        return { text: '商户已确认', color: '#10B981', bgColor: '#ECFDF5', icon: 'check' };
      case 'rejected':
        return { text: '商户已拒绝', color: '#EF4444', bgColor: '#FEF2F2', icon: 'close' };
      case 'pending':
      default:
        return { text: '等待商户确认', color: '#F59E0B', bgColor: '#FFFBEB', icon: 'clock' };
    }
  };

  // 获取费用类型文本
  const getCostTypeText = (costType?: string) => {
    switch (costType) {
      case 'aa':
        return 'AA制';
      case 'free':
        return '免费活动';
      case 'organizer':
        return '发起人请客';
      default:
        return 'AA制';
    }
  };

  const merchantStatusInfo = getMerchantStatusInfo(bookingInfo.merchantStatus);

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
            <h1 className="text-lg font-semibold text-gray-900">活动详情</h1>
            <div className="w-10"></div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto pb-6">
          {/* 成功提示 */}
          <div className="bg-white p-6 mb-2">
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: '#10B981' }}
              >
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">活动创建成功</h2>
              <p className="text-sm text-gray-600 text-center">
                已向 {bookingInfo.participants.length} 位参与者发送邀请
              </p>
              
              {/* 商户审核状态提示 */}
              <div className="mt-4 px-4 py-2.5 rounded-lg" style={{ backgroundColor: merchantStatusInfo.bgColor }}>
                <div className="flex items-center justify-center gap-2">
                  {merchantStatusInfo.icon === 'check' && <Check className="w-4 h-4" style={{ color: merchantStatusInfo.color }} />}
                  {merchantStatusInfo.icon === 'close' && <AlertCircle className="w-4 h-4" style={{ color: merchantStatusInfo.color }} />}
                  {merchantStatusInfo.icon === 'clock' && <Clock className="w-4 h-4" style={{ color: merchantStatusInfo.color }} />}
                  <p className="text-sm font-medium" style={{ color: merchantStatusInfo.color }}>
                    {merchantStatusInfo.text}
                  </p>
                </div>
              </div>

              {bookingInfo.merchantStatus !== 'approved' && (
                <div className="mt-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 text-center">
                    {bookingInfo.merchantStatus === 'rejected' 
                      ? '请联系商户或选择其他场所' 
                      : '等待参与者确认后即可开始活动'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 活动配置信息 */}
          <div className="bg-white p-4 mb-2">
            <h3 className="text-base font-semibold text-gray-900 mb-3">活动配置</h3>
            <div className="space-y-3">
              {/* 活动类型 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {bookingInfo.isPrivate ? (
                    <>
                      <Lock className="w-4 h-4" style={{ color: '#f98801' }} />
                      <span>私密活动</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4" style={{ color: '#f98801' }} />
                      <span>公开活动</span>
                    </>
                  )}
                </div>
                <span className="text-xs px-2 py-1 rounded-full" style={{ 
                  backgroundColor: bookingInfo.isPrivate ? '#FFF7F0' : '#F0F2FF',
                  color: bookingInfo.isPrivate ? '#f98801' : '#4F46E5'
                }}>
                  {bookingInfo.isPrivate ? '仅邀请可见' : '所有人可见'}
                </span>
              </div>

              {/* 费用类型 */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">费用类型</div>
                <span className="text-sm font-semibold" style={{ color: '#f98801' }}>
                  {getCostTypeText(bookingInfo.costType)}
                </span>
              </div>

              {/* 参与人数 */}
              {bookingInfo.maxParticipants && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">参与人数</div>
                  <span className="text-sm font-semibold text-gray-900">
                    {bookingInfo.participants.length + 1} / {bookingInfo.maxParticipants} 人
                  </span>
                </div>
              )}

              {/* 费用明细 */}
              {bookingInfo.costType !== 'free' && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    {bookingInfo.costType === 'organizer' ? '总费用' : '人均费用'}
                  </div>
                  <span className="text-base font-bold" style={{ color: '#f98801' }}>
                    ¥{bookingInfo.costType === 'organizer' 
                      ? bookingInfo.service.pricePerHour * (bookingInfo.participants.length + 1)
                      : Math.round(bookingInfo.service.pricePerHour * (bookingInfo.participants.length + 1) / (bookingInfo.participants.length + 1))
                    }
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 活动信息卡片 */}
          <div className="bg-white p-4 mb-2">
            <h3 className="text-base font-semibold text-gray-900 mb-3">活动信息</h3>
            
            {/* 场所信息 */}
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#F0F2FF' }}
              >
                <MapPin className="w-5 h-5" style={{ color: '#f98801' }} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">活动场所</div>
                <div className="text-sm font-semibold text-gray-900">{bookingInfo.venue.name}</div>
                <div className="text-xs text-gray-600 mt-1">{bookingInfo.venue.location}</div>
                <div className="text-xs text-gray-400 mt-0.5">{bookingInfo.venue.distance}</div>
              </div>
            </div>

            {/* 服务信息 */}
            <div className="flex items-start gap-3 py-3 border-b border-gray-100">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#F0F2FF' }}
              >
                <svg className="w-5 h-5" style={{ color: '#f98801' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="9" y1="9" x2="15" y2="9"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">活动项目</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{bookingInfo.service.name}</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: '#f98801' }}
                  >
                    {bookingInfo.service.level}
                  </span>
                </div>
                <div className="text-sm font-semibold mt-1" style={{ color: '#f98801' }}>
                  ¥{bookingInfo.service.pricePerHour}/小时
                </div>
              </div>
            </div>

            {/* 时间信息 */}
            <div className="flex items-start gap-3 pt-3">
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
                    {bookingInfo.date}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {bookingInfo.time}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 参与者状态卡片 */}
          <div className="bg-white p-4 mb-2">
            <h3 className="text-base font-semibold text-gray-900 mb-3">参与者状态</h3>
            <div className="space-y-2">
              {bookingInfo.participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{participant.name}</span>
                      {participant.isFriend && (
                        <span className="text-xs text-gray-400">好友</span>
                      )}
                    </div>
                  </div>
                  <div>
                    {participant.status === 'pending' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                        待确认
                      </span>
                    )}
                    {participant.status === 'confirmed' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        已确认
                      </span>
                    )}
                    {participant.status === 'declined' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                        已拒绝
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 地图卡片 */}
          <div className="bg-white p-4 mb-2">
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

          {/* 温馨提示 */}
          <div className="bg-white p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">温馨提示</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-600">请提前10分钟到达场所，确保准时开始活动</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-600">所有参与者确认后，活动费用将按实际人数结算</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-600">如需取消活动，请提前24小时通知参与者</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-600">活动结束后可邀请参与者加好友继续互动</p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-3 rounded-xl border-2 font-semibold text-base transition-all active:scale-[0.98]"
              style={{ borderColor: '#DC2626', color: '#DC2626' }}
            >
              取消活动
            </button>
            <button
              className="flex-1 py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98]"
              style={{ backgroundColor: '#f98801' }}
            >
              立即开始
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPendingPage;
