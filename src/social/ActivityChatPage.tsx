import { Calendar, ChevronLeft, Image as ImageIcon, MapPin, Send, Smile, Users } from 'lucide-react';
import { useState } from 'react';

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

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  type: 'text' | 'image' | 'system';
  time: string;
  isMe: boolean;
}

interface ActivityChatPageProps {
  chat: ActivityChat;
  onBack: () => void;
}

function ActivityChatPage({ chat, onBack }: ActivityChatPageProps) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 's1',
      userId: 'system',
      userName: '系统消息',
      userAvatar: '',
      content: `欢迎来到「${chat.activityTitle}」活动群聊`,
      type: 'system',
      time: '2024-11-15 10:00',
      isMe: false,
    },
    {
      id: '1',
      userId: 'user1',
      userName: '张三',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
      content: '大家好！期待这次活动 🎉',
      type: 'text',
      time: '10:05',
      isMe: false,
    },
    {
      id: '2',
      userId: 'user2',
      userName: '李四',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Li',
      content: '有人可以拼车吗？我从市中心出发',
      type: 'text',
      time: '10:15',
      isMe: false,
    },
    {
      id: '3',
      userId: 'me',
      userName: '我',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
      content: '我也是市中心，可以一起！',
      type: 'text',
      time: '10:18',
      isMe: true,
    },
    {
      id: '4',
      userId: 'user3',
      userName: '王五',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang',
      content: '天气预报说可能会下雨，大家记得带伞',
      type: 'text',
      time: '11:20',
      isMe: false,
    },
    {
      id: 's2',
      userId: 'system',
      userName: '系统消息',
      userAvatar: '',
      content: '赵六 加入了群聊',
      type: 'system',
      time: '12:00',
      isMe: false,
    },
    {
      id: '5',
      userId: 'user4',
      userName: '赵六',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhao',
      content: '刚看到活动，还有名额吗？',
      type: 'text',
      time: '12:01',
      isMe: false,
    },
  ]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        userId: 'me',
        userName: '我',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
        content: inputText,
        type: 'text',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const getStatusBadge = () => {
    switch (chat.status) {
      case 'recruiting':
        return { text: '报名中', color: '#f98801', bgColor: '#FFF7F0' };
      case 'ongoing':
        return { text: '进行中', color: '#10B981', bgColor: '#ECFDF5' };
      case 'completed':
        return { text: '已完成', color: '#6B7280', bgColor: '#F3F4F6' };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-50 min-h-screen flex flex-col relative">
        {/* 状态栏 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-sm z-30">
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
        <div className="sticky top-0 bg-white z-20 pt-16 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex-1 mx-3 min-w-0">
              <h1 className="text-base font-bold text-gray-900 line-clamp-1">
                {chat.activityTitle}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">{chat.participantCount} 人</span>
                <span
                  className="px-1.5 py-0.5 rounded text-xs font-medium"
                  style={{
                    color: statusBadge.color,
                    backgroundColor: statusBadge.bgColor,
                  }}
                >
                  {statusBadge.text}
                </span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
              <Users className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* 活动信息卡片 */}
          <div className="mx-4 mb-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-3 flex items-center gap-3 border border-orange-100">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={chat.activityCover}
                alt={chat.activityTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-gray-700 mb-1">
                <Calendar className="w-3 h-3" />
                <span>{chat.activityDate}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span className="line-clamp-1">活动地点信息</span>
              </div>
            </div>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
              style={{ backgroundColor: '#f98801' }}
            >
              查看详情
            </button>
          </div>
        </div>

        {/* 聊天消息区域 */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((message) => {
            if (message.type === 'system') {
              return (
                <div key={message.id} className="flex justify-center">
                  <div className="px-3 py-1.5 bg-gray-200 rounded-full">
                    <p className="text-xs text-gray-600">{message.content}</p>
                  </div>
                </div>
              );
            }

            if (message.isMe) {
              return (
                <div key={message.id} className="flex items-end justify-end gap-2">
                  <div className="flex flex-col items-end max-w-[70%]">
                    <div
                      className="px-4 py-2.5 rounded-2xl rounded-br-sm"
                      style={{ backgroundColor: '#f98801' }}
                    >
                      <p className="text-sm text-white">{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">{message.time}</span>
                  </div>
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={message.userAvatar}
                      alt={message.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            }

            return (
              <div key={message.id} className="flex items-end gap-2">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={message.userAvatar}
                    alt={message.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col max-w-[70%]">
                  <span className="text-xs text-gray-500 mb-1 ml-1">{message.userName}</span>
                  <div className="px-4 py-2.5 bg-white rounded-2xl rounded-bl-sm">
                    <p className="text-sm text-gray-900">{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-400 mt-1 ml-1">{message.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部输入栏 */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3">
          <div className="flex items-end gap-2">
            {/* 附加功能按钮 */}
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
                <ImageIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* 输入框 */}
            <div className="flex-1 flex items-end gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="说点什么..."
                className="flex-1 max-h-24 px-4 py-2.5 bg-gray-100 rounded-2xl text-sm resize-none outline-none focus:ring-2 focus:ring-[#f98801] transition-all"
                rows={1}
                style={{ minHeight: '40px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="p-2.5 rounded-full transition-all active:scale-95 disabled:opacity-40"
                style={{ 
                  backgroundColor: inputText.trim() ? '#f98801' : '#E5E7EB',
                }}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityChatPage;
