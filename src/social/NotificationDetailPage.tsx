import { Calendar, ChevronLeft, MapPin } from 'lucide-react';

interface SystemNotification {
  id: string;
  type: 'merchant_approved' | 'merchant_rejected' | 'user_applied' | 'activity_confirmed' | 'activity_cancelled';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  activityId?: string;
  activityTitle?: string;
  activityCover?: string;
}

interface NotificationDetailPageProps {
  notification: SystemNotification;
  onBack: () => void;
}

function NotificationDetailPage({ notification, onBack }: NotificationDetailPageProps) {
  const getNotificationStyle = (type: SystemNotification['type']) => {
    switch (type) {
      case 'merchant_approved':
        return {
          icon: '✅',
          color: '#10B981',
          bgColor: '#ECFDF5',
          borderColor: '#10B981',
          actionText: '查看活动详情',
          actionColor: '#10B981',
        };
      case 'merchant_rejected':
        return {
          icon: '❌',
          color: '#EF4444',
          bgColor: '#FEF2F2',
          borderColor: '#EF4444',
          actionText: '重新预订',
          actionColor: '#EF4444',
        };
      case 'user_applied':
        return {
          icon: '👤',
          color: '#f98801',
          bgColor: '#FFF7F0',
          borderColor: '#f98801',
          actionText: '审核申请',
          actionColor: '#f98801',
        };
      case 'activity_confirmed':
        return {
          icon: '✓',
          color: '#10B981',
          bgColor: '#ECFDF5',
          borderColor: '#10B981',
          actionText: '查看活动详情',
          actionColor: '#10B981',
        };
      case 'activity_cancelled':
        return {
          icon: '⚠️',
          color: '#F59E0B',
          bgColor: '#FFFBEB',
          borderColor: '#F59E0B',
          actionText: '了解详情',
          actionColor: '#F59E0B',
        };
    }
  };

  const style = getNotificationStyle(notification.type);

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

        {/* 头部导航 */}
        <div className="sticky top-0 bg-white z-20 px-4 pt-16 pb-3 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">通知详情</h1>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* 通知状态卡片 */}
          <div
            className="rounded-2xl p-6 mb-4 border-2"
            style={{
              backgroundColor: style.bgColor,
              borderColor: style.borderColor,
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-6xl mb-4">{style.icon}</div>
              <h2 className="text-xl font-bold mb-2" style={{ color: style.color }}>
                {notification.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                {notification.time}
              </p>
            </div>
          </div>

          {/* 通知内容 */}
          <div className="bg-white rounded-xl p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">通知内容</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {notification.content}
            </p>
          </div>

          {/* 关联活动信息 */}
          {notification.activityTitle && notification.activityCover && (
            <div className="bg-white rounded-xl p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">相关活动</h3>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={notification.activityCover}
                    alt={notification.activityTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                    {notification.activityTitle}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                    <Calendar className="w-3 h-3" />
                    <span>11月20日 14:00</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">示例活动地点</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 详细说明 */}
          {notification.type === 'user_applied' && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">申请人信息</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang"
                    alt="申请人"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">张小明</p>
                  <p className="text-xs text-gray-600">活动经验：15次</p>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-1">报名理由：</p>
                <p className="text-sm text-gray-800">
                  我非常喜欢羽毛球运动，已经打了3年了，希望能通过这次活动认识更多爱好者，一起切磋球技！
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all active:scale-95"
                  style={{ borderColor: '#DC2626', color: '#DC2626' }}
                >
                  拒绝
                </button>
                <button
                  className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold transition-all active:scale-95"
                  style={{ backgroundColor: '#10B981' }}
                >
                  同意
                </button>
              </div>
            </div>
          )}

          {notification.type === 'merchant_rejected' && (
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <h3 className="text-sm font-semibold text-red-900 mb-2">拒绝原因</h3>
              <p className="text-sm text-red-800 mb-3">
                该时间段已被预订，建议选择其他时间段或联系商户协商。
              </p>
              <p className="text-xs text-red-700">
                如有疑问，可联系商户：138****8888
              </p>
            </div>
          )}

          {notification.type === 'activity_cancelled' && (
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <h3 className="text-sm font-semibold text-yellow-900 mb-2">取消说明</h3>
              <p className="text-sm text-yellow-800 mb-3">
                由于天气原因，发起人决定取消本次活动。已支付的费用将原路退回，请注意查收。
              </p>
              <p className="text-xs text-yellow-700">
                如有疑问，可联系发起人进行沟通
              </p>
            </div>
          )}
        </div>

        {/* 底部操作按钮 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          {notification.type === 'user_applied' ? (
            <button
              className="w-full py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98]"
              style={{ backgroundColor: style.actionColor }}
            >
              {style.actionText}
            </button>
          ) : (
            <button
              className="w-full py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98]"
              style={{ backgroundColor: style.actionColor }}
            >
              {style.actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationDetailPage;
