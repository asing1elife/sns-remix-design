import { Bell, Calendar, ChevronRight, MessageCircle, Search, Users } from 'lucide-react'
import { useState } from 'react'
import ActivityChatPage from './ActivityChatPage'
import NotificationDetailPage from './NotificationDetailPage'

type MessageType = 'notification' | 'chat';

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

interface ActivityChat {
  id: string;
  activityId: string;
  activityTitle: string;
  activityCover: string;
  activityDate: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  participantCount: number;
  status: 'recruiting' | 'ongoing' | 'completed';
}

interface MessagesPageProps {
  onNavigate: (page: 'explore' | 'activities' | 'messages' | 'profile') => void;
}

function MessagesPage({ onNavigate }: MessagesPageProps) {
  const [activeTab, setActiveTab] = useState<MessageType>('chat');
  const [selectedChat, setSelectedChat] = useState<ActivityChat | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<SystemNotification | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 模拟站内信通知数据
  const [notifications] = useState<SystemNotification[]>([
    {
      id: '1',
      type: 'user_applied',
      title: '新的参与申请',
      content: '张小明 申请参加你发起的"周末羽毛球约战"活动',
      time: '5分钟前',
      isRead: false,
      activityId: 'act1',
      activityTitle: '周末羽毛球约战',
      activityCover: 'https://picsum.photos/400/300?random=1',
    },
    {
      id: '2',
      type: 'merchant_approved',
      title: '商户审核通过',
      content: '你预订的"星光健身中心"已确认，活动可以正常进行',
      time: '1小时前',
      isRead: false,
      activityId: 'act2',
      activityTitle: '健身团练',
      activityCover: 'https://picsum.photos/400/300?random=2',
    },
    {
      id: '3',
      type: 'activity_confirmed',
      title: '活动确认',
      content: '发起人已确认你参加"周末徒步登山"活动',
      time: '3小时前',
      isRead: true,
      activityId: 'act3',
      activityTitle: '周末徒步登山',
      activityCover: 'https://picsum.photos/400/300?random=3',
    },
    {
      id: '4',
      type: 'merchant_rejected',
      title: '商户审核未通过',
      content: '你预订的"阳光球馆"拒绝了预订请求，原因：时间段已被预订',
      time: '昨天',
      isRead: true,
      activityId: 'act4',
      activityTitle: '篮球友谊赛',
      activityCover: 'https://picsum.photos/400/300?random=4',
    },
    {
      id: '5',
      type: 'activity_cancelled',
      title: '活动取消通知',
      content: '很抱歉，"周日游泳活动"因故取消',
      time: '2天前',
      isRead: true,
      activityId: 'act5',
      activityTitle: '周日游泳活动',
      activityCover: 'https://picsum.photos/400/300?random=5',
    },
  ]);

  // 模拟活动群聊数据
  const [activityChats] = useState<ActivityChat[]>([
    {
      id: 'chat1',
      activityId: 'act1',
      activityTitle: '周末羽毛球约战',
      activityCover: 'https://picsum.photos/400/300?random=1',
      activityDate: '11月20日 14:00',
      lastMessage: '张三: 大家记得带水哦！',
      lastMessageTime: '10分钟前',
      unreadCount: 3,
      participantCount: 8,
      status: 'recruiting',
    },
    {
      id: 'chat2',
      activityId: 'act2',
      activityTitle: '健身团练',
      activityCover: 'https://picsum.photos/400/300?random=2',
      activityDate: '11月19日 19:00',
      lastMessage: '李四: 今晚见！',
      lastMessageTime: '2小时前',
      unreadCount: 0,
      participantCount: 12,
      status: 'ongoing',
    },
    {
      id: 'chat3',
      activityId: 'act3',
      activityTitle: '周末徒步登山',
      activityCover: 'https://picsum.photos/400/300?random=3',
      activityDate: '11月21日 07:00',
      lastMessage: '王五: 天气预报说会下雨',
      lastMessageTime: '5小时前',
      unreadCount: 1,
      participantCount: 15,
      status: 'recruiting',
    },
    {
      id: 'chat4',
      activityId: 'act6',
      activityTitle: '咖啡品鉴会',
      activityCover: 'https://picsum.photos/400/300?random=6',
      activityDate: '11月15日 15:00',
      lastMessage: '赵六: 今天玩得很开心！',
      lastMessageTime: '3天前',
      unreadCount: 0,
      participantCount: 6,
      status: 'completed',
    },
  ]);

  // 如果选中了某个群聊，显示聊天页面
  if (selectedChat) {
    return (
      <ActivityChatPage
        chat={selectedChat}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  // 如果选中了某个通知，显示通知详情
  if (selectedNotification) {
    return (
      <NotificationDetailPage
        notification={selectedNotification}
        onBack={() => setSelectedNotification(null)}
      />
    );
  }

  const getNotificationIcon = (type: SystemNotification['type']) => {
    switch (type) {
      case 'merchant_approved':
        return { icon: '✅', color: '#10B981', bgColor: '#ECFDF5' };
      case 'merchant_rejected':
        return { icon: '❌', color: '#EF4444', bgColor: '#FEF2F2' };
      case 'user_applied':
        return { icon: '👤', color: '#f98801', bgColor: '#FFF7F0' };
      case 'activity_confirmed':
        return { icon: '✓', color: '#10B981', bgColor: '#ECFDF5' };
      case 'activity_cancelled':
        return { icon: '⚠️', color: '#F59E0B', bgColor: '#FFFBEB' };
    }
  };

  const getActivityStatusBadge = (status: ActivityChat['status']) => {
    switch (status) {
      case 'recruiting':
        return { text: '报名中', color: '#f98801', bgColor: '#FFF7F0' };
      case 'ongoing':
        return { text: '进行中', color: '#10B981', bgColor: '#ECFDF5' };
      case 'completed':
        return { text: '已完成', color: '#6B7280', bgColor: '#F3F4F6' };
    }
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;
  const unreadChatCount = activityChats.reduce((sum, chat) => sum + chat.unreadCount, 0);

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
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">消息</h1>
            
            {/* Tab 切换 - 图标样式 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('notification')}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95 ${
                  activeTab === 'notification'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={activeTab === 'notification' ? { backgroundColor: '#f98801' } : {}}
              >
                <div className="flex items-center gap-1.5">
                  <Bell className="w-4 h-4" />
                  <span>站内信</span>
                  {unreadNotificationCount > 0 && (
                    <span
                      className={`min-w-[18px] h-[18px] px-1 rounded-full text-xs font-semibold flex items-center justify-center ${
                        activeTab === 'notification' ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {unreadNotificationCount}
                    </span>
                  )}
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('chat')}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95 ${
                  activeTab === 'chat'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={activeTab === 'chat' ? { backgroundColor: '#f98801' } : {}}
              >
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  <span>群聊</span>
                  {unreadChatCount > 0 && (
                    <span
                      className={`min-w-[18px] h-[18px] px-1 rounded-full text-xs font-semibold flex items-center justify-center ${
                        activeTab === 'chat' ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {unreadChatCount}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'notification' ? (
            /* 站内信列表 */
            <div className="px-4 pt-3 space-y-2">
              {notifications.length === 0 ? (
                <div className="py-20 text-center">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">暂无通知消息</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  return (
                    <button
                      key={notification.id}
                      onClick={() => setSelectedNotification(notification)}
                      className="w-full bg-white rounded-xl p-4 flex flex-col gap-2 transition-all active:scale-[0.98] active:bg-gray-50 text-left"
                    >
                      {/* 标题和时间 */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-gray-900 flex-1">
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-400">
                            {notification.time}
                          </span>
                          {!notification.isRead && (
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: '#f98801' }}
                            />
                          )}
                        </div>
                      </div>

                      {/* 内容 */}
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {notification.content}
                      </p>

                      {/* 关联活动信息 */}
                      {notification.activityTitle && (
                        <div className="flex items-center gap-2 mt-1 p-2 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={notification.activityCover}
                              alt={notification.activityTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-0.5">相关活动</p>
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">
                              {notification.activityTitle}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          ) : (
            /* 活动群聊列表 */
            <div className="px-4 pt-3 space-y-2">
              {activityChats.length === 0 ? (
                <div className="py-20 text-center">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">暂无活动群聊</p>
                </div>
              ) : (
                activityChats.map((chat) => {
                  const statusBadge = getActivityStatusBadge(chat.status);
                  return (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className="w-full bg-white rounded-xl p-4 flex items-start gap-3 transition-all active:scale-[0.98] active:bg-gray-50"
                    >
                      {/* 封面图 */}
                      <div className="relative w-14 h-14 rounded-lg flex-shrink-0">
                        <div className="w-full h-full rounded-lg overflow-hidden">
                          <img
                            src={chat.activityCover}
                            alt={chat.activityTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* 未读角标 */}
                        {chat.unreadCount > 0 && (
                          <div
                            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                            style={{ backgroundColor: '#f98801' }}
                          >
                            {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                          </div>
                        )}
                      </div>

                      {/* 内容 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                            {chat.activityTitle}
                          </h3>
                          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                            {chat.lastMessageTime}
                          </span>
                        </div>

                        {/* 活动时间和状态 */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{chat.activityDate}</span>
                          </div>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              color: statusBadge.color,
                              backgroundColor: statusBadge.bgColor,
                            }}
                          >
                            {statusBadge.text}
                          </span>
                        </div>

                        {/* 最后一条消息 */}
                        <p className="text-xs text-gray-600 mb-2 line-clamp-1 text-left">
                          {chat.lastMessage}
                        </p>

                        {/* 参与人数 */}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{chat.participantCount} 人参与</span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* 底部导航栏 */}
        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 z-30">
          <div className="flex items-center justify-around px-4 py-2">
            <button 
              onClick={() => onNavigate('explore')}
              className="flex flex-col items-center py-2 px-4 transition-colors" 
              style={{ color: '#6B7280' }}
            >
              <Search className="w-6 h-6 mb-1" />
              <span className="text-xs">探索</span>
            </button>
            <button 
              onClick={() => onNavigate('activities')}
              className="flex flex-col items-center py-2 px-4 transition-colors" 
              style={{ color: '#6B7280' }}
            >
              <Calendar className="w-6 h-6 mb-1" />
              <span className="text-xs">活动</span>
            </button>
            <button 
              onClick={() => onNavigate('messages')}
              className="flex flex-col items-center py-2 px-4 transition-colors relative" 
              style={{ color: '#f98801' }}
            >
              <MessageCircle className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">消息</span>
              {(unreadNotificationCount + unreadChatCount) > 0 && (
                <div
                  className="absolute top-1 right-2 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                  style={{ backgroundColor: '#f98801' }}
                >
                  {unreadNotificationCount + unreadChatCount > 99 ? '99+' : unreadNotificationCount + unreadChatCount}
                </div>
              )}
            </button>
            <button 
              onClick={() => onNavigate('profile')}
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

export default MessagesPage;
